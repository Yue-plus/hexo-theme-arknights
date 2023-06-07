/* global hexo */

'use strict';

function getStyle(arg) {
  if (!arg) {
    return '';
  }
  let result = 'style="';
  for (let key in arg[0]) {
    result += key + ':' + arg[0][key] + ';';
  }
  return result + '" ';
}

function render(data) {
  return hexo.render.renderSync({ text: data, engine: 'yaml' });
}

function quote(str) {
  if (str[0] !== '"' || str[0] !== "'") {
    return "'" + str + "'";
  }
  return str;
}

hexo.extend.tag.register('linkcard', (_args, data) => {  
  let result = '', res = render(data);
  for (let i in res) {
    let item = res[i],
      name = `<div class="link-title">${i}</div>`,
      href = item.src,
      avatar = item.avatar ? `<div class="link-ico"><img src=${item.avatar}></div>` : '',
      descr = item.descr ? `<div class="link-descr">${item.descr}</div>` : '',
      img = item.img ? `<img class="link-background" src=${item.img}>` : '',
      content = `<div class="link-data" ${avatar ? '' : 'link-full'}">${name}${descr}</div>`;
    if (!href.match('//')) {
      href = '//' + href;
    }
    result += `<a class="link-card"
      ${getStyle(item.style)}
      href=${quote(href)}
      title=${quote(item.descr)}
      target="_blank">
        ${img}
        <div class="link-main">${avatar}${content}</div></a>`;
  }
  return result;
}, { ends: true })
