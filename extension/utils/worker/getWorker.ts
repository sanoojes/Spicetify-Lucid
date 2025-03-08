let colorWorker: Worker | null = null;
let workerPromise: Promise<Worker | null> | null = null;
let retryCount = 0;
const MAX_RETRIES = 3;

async function createWorker(url: string): Promise<Worker | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch worker script: ${response.statusText}`);
    }
    const scriptText = await response.text();
    const blob = new Blob([scriptText], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    colorWorker = new Worker(workerUrl, { credentials: 'omit' });

    colorWorker.onerror = (event) => {
      console.error('Worker encountered an error:', event.message || event);
    };

    colorWorker.onmessage = (event) => {
      console.debug('Worker initialized:', event.data);
    };

    return colorWorker;
  } catch (error) {
    console.error('Error loading worker:', error);
    return null;
  }
}

export async function getWorker(url: string): Promise<Worker | null> {
  if (colorWorker) {
    return colorWorker;
  }

  if (!workerPromise && retryCount < MAX_RETRIES) {
    retryCount++;
    workerPromise = createWorker(url);
    if (!(await workerPromise)) {
      workerPromise = null;
    }
  }

  return workerPromise || null;
}
