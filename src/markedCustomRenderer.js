/**
 * Get confluence wiki markup renderer
 * @param any marked marked.js object
 */
export function cwmRenderer(marked) {
  // Override default method
  const customRenderer = new marked.Renderer();
  customRenderer.heading = (text, level, raw) => `h${level}. ${text}\n\n`;
  customRenderer.paragraph = text => text + '\n\n',
  customRenderer.html = html => html,
  customRenderer.heading = (text, level, raw) => `h${level}. ${text}\n\n`,
  customRenderer.strong = text => `*${text}*`,
  customRenderer.em = text => `_${text}_`,
  customRenderer.del = text => `-${text}-`,
  customRenderer.codespan = text => `{{${text}}}`,
  customRenderer.blockquote = quote => `{quote}${quote}{quote}`,
  customRenderer.br = () => '\n',
  customRenderer.hr = () => '----',
  customRenderer.link = (href, title, text) => {
    const list = [href]
    text !== '' && list.unshift(text);
    return `[${list.join('|')}]`;
  }
  customRenderer.list = (body, ordered, start) => {
    const list = body.trim().split('\n').filter(l => l !== '');
    const type = ordered ? '#' : '*';
    const result = list.map(l => `${type} ${l}`)
      .filter(l => l !== '')
      .map(l => {
        const reg = /^([(\*|#)\s]+)/;
        const result = l.match(reg);
        return `${result[1].replace(/\s/g, '')} ${l.replace(reg, '')}`
      })
      .join('\n')
    return result + '\n\n';
  } 
  customRenderer.listitem = body => `${body}\n`,
  customRenderer.image = href => `!${href}!`,
  customRenderer.table = (header, body) => {
    header = `${header.replace(/\n$/, '')}||`;
    body = `${body.split('\n').filter(value => value !== '').join('|\n')}|`;
    return `${header}\n${body}\n\n`;
  }
  customRenderer.tablerow = content => `${content}\n`,
  customRenderer.tablecell = (content, flags) => `${(flags.header ? '||' : '|')}${content}`,
  customRenderer.code = (code, lang) => {
    lang = lang || 'none';
    // {code:language=java|borderStyle=solid|theme=RDark|linenumbers=true|collapse=true}
    const param = {
      language: lang.toLowerCase(),
      borderStyle: 'solid',
      theme: 'RDark',
      linenumbers: true,
      collapse: true
    }
    const p = Object.keys(param).map(key => `${key}=${param[key]}`).join('|');
    return `{code:${p}}\n${code}\n{code}\n\n`;
  }
  return customRenderer;
}

