import { putInputValue } from '../indexedDB/dbAccess.js';

const decoder = new TextDecoder;

self.addEventListener('message', message => {
  putInputValue(decoder.decode(message.data));
});
