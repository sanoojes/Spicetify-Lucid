export function createWorker(scriptText: string): Worker | null {
  try {
    const blob = new Blob([scriptText], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl, { credentials: 'omit' });

    worker.onerror = (event) => {
      console.error('Worker encountered an error:', event.message || event);
    };

    worker.onmessage = (event) => {
      console.debug('Worker initialized:', event.data);
    };

    return worker;
  } catch (error) {
    console.error('Error loading worker:', error);
    return null;
  }
}
