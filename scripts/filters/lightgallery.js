/* global hexo */

'use strict';

function findImg(content) {
  return content.replaceAll(/<[^>]*?>\s*?<img .*?>/g, (match) => {
    const tag = match.match(/<[^>]*?(?=>\s*<img)/)[0],
      img = match.match(/<img .*?>/)[0],
      src = img.match(/((?<=src="|').*?(?="|'))|((?<=src=)[^'" ]*?(?= |>))/)[0]
    return `${tag} class='item-img' data-src='${src}'>${img}`
  })
}

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = findImg(data.content)
  data.more = findImg(data.more)
  return data
});
