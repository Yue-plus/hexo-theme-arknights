/* global hexo */

'use strict';

function render(data) {
    return hexo.render.renderSync({ text: data, engine: 'markdown' });
}

hexo.extend.tag.register('hide', (args) => {
    let content = ''
    args.forEach((item) => {
        content += ' ' + item
    });
    return `<span class="hide"><object>${render(content.slice(1)).trim()}</object></span>`;
})
