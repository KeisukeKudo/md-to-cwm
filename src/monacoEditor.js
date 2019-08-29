import * as monaco from 'monaco-editor';

/**
 * Create monaco editor (Markedown editor)
 * @param {HTMLElement} dom 
 * @param {String} value 
 */
export function creater(dom, value) {
  return monaco.editor.create(dom, {
    value: value,
    fontSize: '14px',
    language: 'markdown',
    lineNumbers: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
    automaticLayout: true,
    wordWrap: 'on',
    minimap: {
      enabled: false
    }
  });
}
