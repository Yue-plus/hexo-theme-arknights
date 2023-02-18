/* global hexo */

'use strict';

if (hexo.config.pandoc) {
  hexo.extend.filter.register('after_post_render', (data) => {
    data.content = data.content.replaceAll(/(?<=<h[1-6] id=".*">).*(?=<\/h[1-6]>)/g, (match) => {
      let link = match.replace(' ', '-')
      return `<a href="#${link}" class="headerlink" title="${link}"></a>` + match
    })
    return data
  });
}
