/* global hexo */

'use strict';

function isStatus(str) {
    return str === 'open' || str === 'fold';
}

function genBlock(name, args, data) {
    let title = args.length > 0 ? args[0] : name[0].toUpperCase() + name.slice(1);
    let color = '', status = 'fold';
    for (let i = 1; i < args.length; ++i) {
        if (!isStatus(args[i])) {
            color = args[i];
        } else {
            status = args[i];
        }
    }
    return `<div class="admonition expand-box adm-${name} ${status}"
        ${color ? `style="--ex-color:${color}"` : ''}>
        <div class="ex-header">
            <i class='i-status'></i>
            ${name !== 'detail' ? `<i class='i-adm i-${name}'></i>` : ''}
            <span class="ex-title">${
                hexo.render.renderSync({ text: title, engine: 'markdown' }).replaceAll(/<p>|<\/p>/g,"")
            }</span>
        </div>
        <div class="ex-content">${hexo.render.renderSync({ text: data, engine: 'markdown' })}</div>
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

hexo.extend.tag.register('detail', (args, data) => {
    return genBlock('detail', args, data);
}, { ends: true })
