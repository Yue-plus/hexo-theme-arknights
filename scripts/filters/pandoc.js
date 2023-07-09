/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = data.content.replaceAll(/<h[1-6] id=".*?">.*?<\/h[1-6]>/g, (match) => {
    let link = match.match(/(?<=id=").*?(?=")/)[0],
      pre = match.match(/<h[1-6] id=".*?">/)[0],
      nxt = match.slice(pre.length)
    if (!match.match(/<a href="#.*?" class="headerlink" title=".*?"><\/a>/g)) {
      return `${pre}<a href="#${link}" class="headerlink" title="${link}"></a>${nxt}`
    }
    return match
  })
  return data
});
