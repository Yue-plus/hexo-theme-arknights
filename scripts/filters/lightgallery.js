/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = data.content.replaceAll(/<[^>]*?>\s*?<img .*?>/g, (match) => {
    const tag = match.match(/<[^>]*?(?=>\s*<img)/)[0],
      img = match.match(/<img .*?>/)[0],
      src = img.match(/((?<=src="|').*?(?="|'))|((?<=src=)[^'" ]*?(?= |>))/)[0]
    return `${tag} class='item-img' data-src='${src}'>${img}`
  })
  return data
});
