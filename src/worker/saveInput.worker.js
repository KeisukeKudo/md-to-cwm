import { putInputValue } from '../indexedDB/dbAccess.js';

self.addEventListener('message', message => {
  putInputValue(message.data);
});
