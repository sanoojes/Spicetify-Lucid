interface ImageRecord {
  id: number;
  data: string;
}

let db: IDBDatabase | null = null;

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      console.debug('Lucid: Database already initialized.');
      resolve();
      return;
    }

    const request: IDBOpenDBRequest = window.indexedDB.open('LucidImageDB', 1);

    request.onerror = (event: Event): void => {
      console.error('Database error:', event);
      reject(event);
    };

    request.onsuccess = (): void => {
      db = request.result;
      console.debug('Lucid: Database initialized.');
      resolve();
    };

    request.onupgradeneeded = (): void => {
      db = request.result;
      console.debug('Lucid: Upgrading database...');
      if (!db.objectStoreNames.contains('imageStore')) {
        const store = db.createObjectStore('imageStore', { keyPath: 'id' });
        store.createIndex('data', 'data', { unique: false });
      }
    };
  });
};

export const addImage = (imageDataUrl: string, cb?: () => void): Promise<void> => {
  return new Promise((resolve, reject) => {
    const operation = () => {
      if (!db) return;
      const transaction = db.transaction(['imageStore'], 'readwrite');
      const store = transaction.objectStore('imageStore');

      const imageRecord: ImageRecord = {
        id: 1,
        data: imageDataUrl,
      };

      const request = store.put(imageRecord);
      request.onsuccess = (): void => {
        console.debug('Image added/updated successfully.');
        cb?.();
        resolve();
      };

      request.onerror = (event: Event): void => {
        console.error('Error adding/updating image', event);
        reject(event);
      };
    };

    if (!db) {
      initDB().then(operation).catch(reject);
    } else {
      operation();
    }
  });
};

export const getImageData = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const operation = () => {
      if (!db) return;
      const transaction = db.transaction(['imageStore'], 'readonly');
      const store = transaction.objectStore('imageStore');
      const request = store.get(1);

      request.onsuccess = (): void => {
        const result: ImageRecord = request.result;
        resolve(result ? result.data : null);
      };

      request.onerror = (event: Event): void => {
        console.error('Error retrieving image', event);
        reject(event);
      };
    };

    if (!db) {
      initDB().then(operation).catch(reject);
    } else {
      operation();
    }
  });
};
initializeImage();
