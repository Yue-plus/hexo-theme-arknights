/* global hexo */

'use strict';

hexo.extend.tag.register('editor', (args, data) => {
  // args: [language, theme, readOnly, height, ...extras(key:value)]
  const rawArgs = Array.isArray(args) ? args.slice() : [];
  const extrasItems = [];
  const positional = [];

  rawArgs.forEach((item) => {
    if (typeof item === 'string') {
      const idx = item.indexOf(':');
      const key = idx !== -1 ? item.slice(0, idx).trim() : '';
      // treat as extra only when there's a ':' and a non-empty key
      if (idx !== -1 && key) {
        extrasItems.push(item);
        return;
      }
    }
    positional.push(item);
  });

  const lang = (positional && positional[0]) ? positional[0] : 'plaintext';
  const theme = (positional && positional[1]) ? positional[1] : 'vs-dark';
  const readOnly = (positional && positional[2]) ? positional[2] : 'true';
  let height = (positional && positional[3]) ? positional[3] : '300px';
  if (/^\d+$/.test(String(height))) height = `${height}px`;
  const id = 'hexo-monaco-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const escapeHtml = (str = '') => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const contentEscaped = escapeHtml(data || '');

  const parseExtras = (arr) => {
    const opts = {};
    if (!Array.isArray(arr)) return opts;
    arr.forEach((item) => {
      if (typeof item !== 'string') return;
      const idx = item.indexOf(':');
      if (idx === -1) return;
      const key = item.slice(0, idx).trim();
      const valueRaw = item.slice(idx + 1).trim();
      if (!key) return;

      let value;
      if (/^true$/i.test(valueRaw) || /^on$/i.test(valueRaw)) value = true;
      else if (/^false$/i.test(valueRaw) || /^off$/i.test(valueRaw)) value = false;
      else if (/^[+-]?\d+(\.\d+)?$/.test(valueRaw)) value = Number(valueRaw);
      else if (valueRaw === 'null') value = null;
      else if (valueRaw.length >= 2 && valueRaw[0] === '`' && valueRaw[valueRaw.length - 1] === '`') {
        const inner = valueRaw.slice(1, -1);
        try {
          value = JSON.parse(`"${inner.replace(/"/g, '\\"')}"`);
        } catch {
          throw new Error(`Invalid value for key "${key}": ${valueRaw}. Failed to parse as single-quoted string.`);
        }
      } else {
        throw new Error(`Invalid option value for key "${key}": ${valueRaw}. Allowed types: boolean, number, null, or quoted string.`);
      }

      opts[key] = value;
    });
    return opts;
  };

  const extras = parseExtras(extrasItems);
  // encode options so they survive HTML attribute encoding reliably; frontend will decode
  const extrasJsonEncoded = encodeURIComponent(JSON.stringify(extras));

  return `<div id="${id}" class="monaco-editor-code"
               data-lang="${lang}"
               data-theme="${theme}"
               data-readonly="${readOnly}"
               data-height="${height}"
               data-options="${extrasJsonEncoded}"
               style="height:${height};"><pre id="${id}-source" style="display:none">${contentEscaped}</pre></div>`;
}, { ends: true });
