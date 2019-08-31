import { defaultValue } from '../config.js';

const version = 2;
const DATABASE_NAME = 'input_data';
const STORE_NAME = 'input_store';
const DEFAULT_VALUE = defaultValue;

/**
 * @type {Object} columnName
 * @property {string} KEY
 * @property {string} INPUT
 */
const columnName = {
  KEY: 'ID',
  INPUT: 'INPUT'
}

/**
 * Primary key
 * @type {number}
 */
const ID = 1;

/**
 * Open IndexedDB
 * @param {Function} success 
 * @param {Function} error 
 */
function open(success, error) {
  const request = indexedDB.open(DATABASE_NAME, version);
  request.onupgradeneeded = event => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: columnName.KEY });
    }
    put(event.target.transaction, new TextEncoder().encode(DEFAULT_VALUE));
  }

  request.onsuccess = success;
  request.onerror = error;
  return request;
}

/**
 * Update/Insert value
 * @param {IDBTransaction} trans 
 * @param {String} value 
 */
function put(trans, value) {
  const store = trans.objectStore(STORE_NAME);
  const data = {};
  data[columnName.KEY] = ID;
  data[columnName.INPUT] = value
  store.put(data);

  trans.onerror = function () {
    console.error('put error');
  }
}

export async function fetchInputValue() {
  return new Promise((resolve, reject) => {
    open(event => {
      const db = event.target.result;
      const trans = db.transaction(STORE_NAME, 'readonly');
      const req = trans.objectStore(STORE_NAME).get(ID);
      req.onsuccess = event => {
        resolve(
          new TextDecoder().decode(
            event.target.result[columnName.INPUT]
          )
        );
      }
      req.onerror = e => {
        resolve(DEFAULT_VALUE);
        console.log(e)
      }
    },
      reject
    )
  });
}

export async function putInputValue(value) {
  return new Promise((resolve, reject) => {
    open(event => {
      put(event.target.result.transaction(STORE_NAME, 'readwrite'), value);
      resolve();
    },
      reject
    )
  })
}
