/* global hexo */

'use strict';

function doAsMermaid(item) {
  return item.match(/<code[\S\s]*?mermaid[\S\s]*?\/code>/)[0]
    .replace(/<br>/g, '&#10;')
    .replace(/hljs/g, '')
    .replace('<code', '<div')
    .replace('/code>', '/div>');
}
function resetName(str) {
  if (str == 'plaintext') {
    return 'TEXT';
  }
  if (str == 'cs') {
    return 'C#';
  }
  if (str == 'cpp') {
    return 'C++';
  }
  return str.toUpperCase();
}
function doAsCode(item) {
  let codeType = item.match(/(?<=highlight )[\S\s]*?(?=")/)[0],
    lineCount = item.match(/line/g).length,
    inner = item.match(/<table[\S\s]*?\/table>/)[0];
  item = item.replace('highlight', lineCount < 21 ? 'highlight open' : 'highlight fold');
  return item.replace(inner,
    `<span class="code-header">\
    <span class="code-title">\
      <div class="code-icon"></div>${resetName(codeType)} 共 ${lineCount} 行</span>\
      <span class="code-header-tail">\
        <button class="code-copy"></button>\
        <span class="code-space">展开</span></span></span></span>\
    <div class="code-box">${inner}</div>`);
}

hexo.extend.filter.register('after_post_render', data => {
  const mermaid = hexo.theme.config.mermaid.enable
  let codeBlocks = data.content.match(
    mermaid?
      /<figure[\S\s]*?highlight[\S\s]*?\/figure>/g:
      /<figure[\S\s]*?highlight(?! mermaid)[\S\s]*?\/figure>/g);
  if (codeBlocks !== null) {
    let processed = Array.from(codeBlocks, item => {
      if (item.match('.mermaid') !== null) {
        return doAsMermaid(item);
      } else {
        return doAsCode(item);
      }
    })
    for (let i in processed) {
      data.content = data.content.replace(codeBlocks[i], processed[i])
    }
    return data;
  }
}, 9);
