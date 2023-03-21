/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = data.content.replaceAll(/(?<=<h[1-6] id=".*">).*(?=<\/h[1-6]>)/g, (match) => {
    let link = match.replace(' ', '-')
    if (!match.match(/<a href="#.*?" class="headerlink" title=".*?"><\/a>/g)) {
      return `<a href="#${link}" class="headerlink" title="${link}"></a>` + match
    }
    return match
  })
  return data
});
