/* global hexo */

'use strict';

function render(data) {
  return hexo.render.renderSync({ text: data, engine: 'markdown' });
}

hexo.extend.tag.register('tabs', (args, data) => {
  let tabs = data.split(/({% tab .*?%})/);
  let result = `<div class='tabs'>`,
    head = `<ol class='selector'>`,
    body = `<div class='tabs-content'>`;
  if (args.length) {
    result += `<p class='tabs-title'>${args[0]}</p>`;
  }
  if (tabs[0].match(/\S/)) {
    result += `<div class='tabs-first'>${render(tabs[0])}</div>`;
  }
  for (let i = 1; i < tabs.length; i += 2) {
    let title = tabs[i].match(/(?<=tab ).*(?= )/);
    if (!title) title = ''
    head += `<li class='tab-title'>${title}</li>`
    body += `<div class='tab-item'>${render(tabs[i + 1])}</div>`
  }
  return result + head + `</ol>` + body + `</div></div>`;
}, { ends: true })

hexo.extend.tag.register('tab', (args) => {
  let data = '';
  args.forEach((item) => { data += item + ' '; });
  return `{% tab ${data}%}`;
})
