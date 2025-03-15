import { getElement, addElement, editElement, removeElement, type DbKeys } from '@utils/db/db.ts';
import { DB_NAME } from '@app/constant.ts';

const DB_VERSION = 1;
const IMAGE_STORE_NAME = 'images';

const DB_KEYS: DbKeys = {
  [IMAGE_STORE_NAME]: [{ name: 'uuid', unique: true }],
} as const;

const DEFAULT_UUID = 'image1';
const DEFAULT_PAYLOAD = { uuid: DEFAULT_UUID, name: 'Local Image 1', data: '' };

type ImageData = {
  uuid: string;
  name: string;
  data: string;
};
type Payload = { uuid: string; name: string; data: string };
const dispatchImageChangeEvent = (
  operation: 'add' | 'edit' | 'remove' | 'initialize',
  payload: Payload
) => {
  const event = new CustomEvent('lucid-local-image-change', {
    detail: { operation, payload },
  });
  window.dispatchEvent(event);
};

export const getImage = async () =>
  await getElement<ImageData>(DB_NAME, IMAGE_STORE_NAME, 'all', DB_KEYS, DB_VERSION);
export const editImage = async (payload: Payload) => {
  await editElement<ImageData>(
    DB_NAME,
    IMAGE_STORE_NAME,
    DEFAULT_UUID,
    payload,
    DB_KEYS,
    DB_VERSION
  );
  dispatchImageChangeEvent('edit', payload);
};

export const initializeImage = async () => {
  try {
    const existing = await getImage();

    if (!existing) {
      await addElement<ImageData>(DB_NAME, IMAGE_STORE_NAME, DEFAULT_PAYLOAD, DB_KEYS, DB_VERSION);
      console.debug('Image added successfully.');
      dispatchImageChangeEvent('initialize', DEFAULT_PAYLOAD);
    } else {
      console.debug('Image already Exists.');
    }
  } catch (e) {
    console.error('Unexpected error during initialization: ', e);
  }
};
