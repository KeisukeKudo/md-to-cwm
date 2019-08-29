import marked from 'marked';
import { cwmRenderer } from './markedCustomRenderer.js';
import { customTOK } from './markedCustomParser.js';
import DOMPurify from 'dompurify';
import highlight from 'highlight.js';

marked.setOptions({
  breaks : true,
  langPrefix: '',
  highlight: (code, lang) =>  highlight.highlightAuto(code, [lang]).value
});
marked.Parser.prototype.tok = customTOK;

// md to HTML
export async function toHTML(input) {
  return new Promise(resolve => {
    resolve(DOMPurify.sanitize(marked(input)));
  });
}

// md to confluence wiki markup
const renderer = cwmRenderer(marked)
export async function toCWM(input) {
  return new Promise(resolve => {
    resolve(DOMPurify.sanitize(marked(input, {renderer: renderer})));
  });
}
