/* global hexo */

'use strict';

hexo.extend.tag.register('hide', (args) => {
    let content = ''
    args.forEach((item) => {
        content += ' ' + item
    });
    return `<span class="hide"><object>${hexo.render.renderSync({ text: content.slice(1), engine: 'markdown' }).trim()}</object></span>`;
})
