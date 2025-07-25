// Fork from https://github.com/mintfog/hexo-theme-minimalism/

/* global hexo */
'use strict';

/**
 * Render markdown footnotes
 * @param {String} text
 * @returns {String} text
 */
function renderFootnotes(text) {
  const marked = require('marked');
  try {
    marked.parse('# 123');
  } catch (e) {
    return text;
  }

  const footnotes = [];
  const reFootnoteContent = /\[\^(\d+)]: ?([\S\s]+?)(?=\[\^(\d+)]|\n\n|$)/g;
  const reInlineFootnote = /\[\^(\d+)]\((.+?)\)/g;
  const reFootnoteIndex = /\[\^(\d+)]/g;
  let html = '';

  text = text.replace(/(<hexoPostRenderCodeBlock>[\S\s]+?<\/hexoPostRenderCodeBlock>)/g, (match, code) => {
    return code.replace(reFootnoteIndex, (match, index) => {
      return '[^<span>' + index + '</span>]';
    });
  });

  // threat all inline footnotes
  text = text.replace(reInlineFootnote, (match, index, content) => {
    footnotes.push({
      index: index,
      content: content
    });
    // remove content of inline footnote
    return '[^' + index + ']';
  });

  // threat all footnote contents
  text = text.replace(reFootnoteContent, (match, index, content) => {
    footnotes.push({
      index: index,
      content: content
    });
    // remove footnote content
    return '';
  });

  // create map for looking footnotes array
  function createLookMap(field) {
    const map = {};
    for (let i = 0; i < footnotes.length; i++) {
      const item = footnotes[i];
      const key = item[field];
      map[key] = item;
    }
    return map;
  }

  const indexMap = createLookMap('index');

  // render (HTML) footnotes reference
  text = text.replace(reFootnoteIndex,
    (match, index) => {

      if (!indexMap[index]) {
        return '';
      }
      const tooltip = replaceLink(handleHtml(marked.parse(indexMap[index].content)));

      return '<sup id="fnref:' + index + '">'
        + '<a href="#fn:' + index + '" rel="footnote">'
        + '<span class="footnote--top">[' + index + ']'
        + '<span class="footnote--pop-ups">' + tooltip + '</span>'
        + '</span></a></sup>';
    });

  // sort footnotes by their index
  footnotes.sort((a, b) => {
    return a.index - b.index;
  });

  // render footnotes (HTML)
  footnotes.forEach(footNote => {
    html += '<li id="fn:' + footNote.index + '">';
    html += '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">';
    html += footNote.index;
    html += '.</span>';
    html += '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">';
    html += handleHtml(marked.parse(footNote.content.trim()));
    html += '<a href="#fnref:' + footNote.index + '"> ↩</a></span></li>';
  });

  // add footnotes at the end of the content
  if (footnotes.length) {
    text += '<div id="footnotes">';
    text += '<hr>';
    text += '<div id="footnotelist">';
    text += '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' + html + '</ol>';
    text += '</div></div>';
  }
  return text;
}

function handleHtml(text) {
  text = text.replace(/^(\s|<p>|<\/p>)+|(\s|<p>|<\/p>)+$/g, '');
  return text;
}

function replaceLink(text) {
  return text.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '<u>$1</u>');
}

hexo.extend.filter.register('before_post_render', data => {
  const themeConfig = hexo.theme.config;
  if (themeConfig.footnote && themeConfig.footnote.enable) {
    data.content = renderFootnotes(data.content);
  }

  return data;
});