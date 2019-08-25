import * as monaco from 'monaco-editor';
import throttle from 'lodash/throttle';
import marked from 'marked';

const defaultValue = '# hello workd';
const editor = monaco.editor.create(document.getElementById('container'), {
  value: defaultValue,
  fontSize: '14px',
  language: 'markdown',
  lineNumbers: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: "vs-dark",
  minimap: {
		enabled: false
	}
});

editor.getModel().onDidChangeContent(throttle(() => {
  console.log(marked(editor.getValue()));
}, 3000));
