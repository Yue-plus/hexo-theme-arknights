/* global hexo */

'use strict';

function genBlock(name, args, data) {
    let title = args.length > 0 ? args[0] : name[0].toUpperCase() + name.slice(1),
        status = args.length > 1 ? args[1] : 'open';
    return `<div class="admonition ad-${name} ${status}">
        <div class="ad-header"><i class='status-icon'></i>${title}</div>
        <div class="content-box"><div>${hexo.render.renderSync({ text: data, engine: 'markdown' })}</div></div>
        </div>`;
}

hexo.extend.tag.register('success', (args, data) => {
    return genBlock('success', args, data);
}, { ends: true })

hexo.extend.tag.register('warning', (args, data) => {
    return genBlock('warning', args, data);
}, { ends: true })

hexo.extend.tag.register('note', (args, data) => {
    return genBlock('note', args, data);
}, { ends: true })

hexo.extend.tag.register('failure', (args, data) => {
    return genBlock('failure', args, data);
}, { ends: true })
