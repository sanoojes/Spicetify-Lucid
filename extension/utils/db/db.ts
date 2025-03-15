export type DbIdx = {
  readonly name: string;
  readonly unique: boolean;
};

export type DbKeys = {
  readonly [storeName: string]: DbIdx[];
};

const dbInstances: { [dbName: string]: Promise<IDBDatabase> } = {};

const initDb = (dbName: string, dbVersion: number, dbKeys: DbKeys): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error(`IndexedDB error (db: ${dbName}): ${request.error}`, event);
      reject(request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      for (const storeName in dbKeys) {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: dbKeys[storeName][0].name });
          for (const key of dbKeys[storeName]) {
            store.createIndex(key.name, key.name, { unique: key.unique });
          }
        }
      }
    };
  });
};

const getDb = (dbName: string, dbVersion: number, dbKeys: DbKeys): Promise<IDBDatabase> => {
  if (!dbInstances[dbName]) {
    dbInstances[dbName] = initDb(dbName, dbVersion, dbKeys);
  }
  return dbInstances[dbName];
};

export const getElement = async <T>(
  dbName: string,
  store: string,
  key: string,
  dbKeys: DbKeys,
  dbVersion = 1
): Promise<T[]> => {
  const db = await getDb(dbName, dbVersion, dbKeys);

  return new Promise<T[]>((resolve, reject) => {
    if (!db.objectStoreNames.contains(store)) {
      reject(new Error(`Object store "${store}" not found in database "${dbName}"`));
      return;
    }

    const transaction = db.transaction(store, 'readonly');
    const objectStore = transaction.objectStore(store);
    let request: IDBRequest;

    if (key === 'all') {
      request = objectStore.getAll();
    } else {
      request = objectStore.get(key);
    }

    request.onerror = () => {
      console.error(
        `Error getting element from store "${store}" with key "${key}" in db "${dbName}": ${request.error}`
      );
      reject(request.error);
    };

    request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
  });
};

export const addElement = async <T extends object>(
  dbName: string,
  store: string,
  payload: T,
  dbKeys: DbKeys,
  dbVersion = 1
): Promise<void> => {
  const db = await getDb(dbName, dbVersion, dbKeys);

  return new Promise<void>((resolve, reject) => {
    if (!db.objectStoreNames.contains(store)) {
      reject(new Error(`Object store "${store}" not found in database "${dbName}"`));
      return;
    }

    const transaction = db.transaction(store, 'readwrite');
    const objectStore = transaction.objectStore(store);

    const request = objectStore.add(payload);

    request.onerror = (event) => {
      console.error(
        `Error adding element to store "${store}" in db "${dbName}": ${request.error}`,
        event
      );
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};

export const editElement = async <T extends object>(
  dbName: string,
  store: string,
  key: string,
  payload: T,
  dbKeys: DbKeys,
  dbVersion = 1
): Promise<void> => {
  const db = await getDb(dbName, dbVersion, dbKeys);

  return new Promise<void>((resolve, reject) => {
    if (!db.objectStoreNames.contains(store)) {
      reject(new Error(`Object store "${store}" not found in database "${dbName}"`));
      return;
    }

    const transaction = db.transaction(store, 'readwrite');
    const objectStore = transaction.objectStore(store);

    const request = objectStore.put(payload);

    request.onerror = (event) => {
      console.error(
        `Error editing element in store "${store}" with key "${key}" in db "${dbName}": ${request.error}`,
        event
      );
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};

export const removeElement = async (
  dbName: string,
  store: string,
  key: string,
  dbKeys: DbKeys,
  dbVersion = 1
): Promise<void> => {
  const db = await getDb(dbName, dbVersion, dbKeys);

  return new Promise<void>((resolve, reject) => {
    if (!db.objectStoreNames.contains(store)) {
      reject(new Error(`Object store "${store}" not found in database "${dbName}"`));
      return;
    }

    const transaction = db.transaction(store, 'readwrite');
    const objectStore = transaction.objectStore(store);
    let request: IDBRequest;

    if (key === 'all') {
      request = objectStore.clear();
    } else {
      request = objectStore.delete(key);
    }

    request.onerror = (event) => {
      console.error(
        `Error removing element from store "${store}" with key "${key}" in db "${dbName}": ${request.error}`,
        event
      );
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};
