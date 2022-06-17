import { BrowserServiceKeys } from '../../shared/enums/BrowserServiceKeys';

const store = <Payload>(key: BrowserServiceKeys, payload: Payload): void => {
  localStorage.setItem(key, JSON.stringify(payload));
};

const get = <Payload>(key: BrowserServiceKeys): Payload | null => {
  const item: string | null = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item) as Payload;
};

const clear = (key: BrowserServiceKeys) => localStorage.removeItem(key);

export const browserService = {
  store,
  get,
  clear,
};
