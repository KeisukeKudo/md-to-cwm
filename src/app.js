import * as monacoEditor from './monacoEditor.js';
import { throttle } from 'lodash';
import { fetchInputValue } from './indexedDB/dbAccess.js'
import { toHTML, toCWM } from './markdownConverter.js';
import './style/app.scss';

// worker
import SaveWorker from './worker/saveInput.worker.js';

(async () => {
  // Get initial display value
  const defaultValue = await fetchInputValue();
  // Create Monaco editor
  const editor = monacoEditor.creater(document.getElementById('editor'), defaultValue);
  // Whether to display Confluence Wiki markup
  let showCWM = false;

  // Display initial values in view
  displayConversionResult();
  // Editor change event
  editor.getModel().onDidChangeContent(throttle(() => {
    displayConversionResult();
  }, 500));

  // Save input data to indexedDB
  const save = new SaveWorker;
  const encoder = new TextEncoder;
  editor.getModel().onDidChangeContent(throttle(() => {
    const data = encoder.encode(editor.getValue()).buffer;
    save.postMessage(data, [data]);
    // 3 seconds interval
  }, 3000));

  // Scroll sync (editor -> view)
  const editorContainer = document.getElementById('editor');
  const viewContainer = document.getElementById('view');
  editor.onDidScrollChange(throttle(event => {
    const percentage = event.scrollTop / (event.scrollHeight - editorContainer.clientHeight);
    viewContainer.scrollTop = (viewContainer.scrollHeight - viewContainer.clientHeight) * percentage;
  }, 40));

  // Copy button
  document.getElementById('copy').addEventListener('click', throttle(event => {
    // Display tooltip
    const active = 'active';
    event.target.classList.add(active);
    setTimeout(() => event.target.classList.remove(active), 1000);
    // Copy to clip board
    toCWM(editor.getValue())
      .then(value => navigator.clipboard && navigator.clipboard.writeText(value))
  }, 1000), false);

  // Switch view
  document.getElementById('switch').addEventListener('click', throttle(() => {
    showCWM = !showCWM;
    displayConversionResult();
  }, 1000), false);

  // Display the converted value
  const view = document.getElementById('view-result');
  function displayConversionResult() {
    const converter = showCWM ? toCWM : toHTML;
    converter(editor.getValue()).then(c => {
      view.innerHTML = showCWM ? c.replace(/\n/g, '<br>') : c;
    });
  }
})()
