---
title: Monaco Editor 示例
date: 2025-08-25 05:50:49
tags: code
category: Example
permalink: /monaco-editor/
---

# Monaco Editor

除了 Hexo 自带的 [代码块](https://hexo.io/zh-cn/docs/tag-plugins#%E4%BB%A3%E7%A0%81%E5%9D%97) 外，本主题还支持 VS Code 风格的 [Monaco Editor](https://github.com/microsoft/monaco-editor)。

> ```text
> {% editor javascript %}
> /* global hexo */
> 
> 'use strict';
> 
> function render(data) {
>     return hexo.render.renderSync({ text: data, engine: 'markdown' });
> }
> 
> hexo.extend.tag.register('hide', (args) => {
>     let content = ''
>     args.forEach((item) => {
>         content += ' ' + item
>     });
>     return `<span class="hide"><object>${render(content.slice(1)).trim()}</object></span>`;
> })
> {% endeditor %}
> ```

{% editor javascript %}
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
{% endeditor %}

`editor` 标签支持以下参数：

```text
[language, [theme, [readOnly, [height]]], [...extras(key:value)]]
```

+ `language` 默认为 `plaintext`；
+ `theme` 默认为 `vs-dark`；
+ `readOnly` 默认为 `true`；
+ `height` 默认为 `300px`。

较少使用的参数可通过 `extras` 项传入。例如，下面示例在超过 40 列时启用折行：

```
{% editor javascript hc-black wordWrap:`wordWrapColumn` wordWrapColumn:40 wrappingIndent:`indent` %}
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
{% endeditor %}
```

更多扩展参数请参阅 [Monaco Editor 文档](https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html)；具体样式效果见 [PR #215](https://github.com/Yue-plus/hexo-theme-arknights/pull/215)。