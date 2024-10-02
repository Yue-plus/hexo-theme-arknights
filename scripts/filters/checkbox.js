/* global hexo */

'use strict';

function fixCheckBox(str) {
  return str.replaceAll(/<li(?=><input type="checkbox" disabled="" checked="">)/g, (match) => {
    return '<li checked'
  })
}

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = fixCheckBox(data.content)
  data.more = fixCheckBox(data.more)
  return data
});
