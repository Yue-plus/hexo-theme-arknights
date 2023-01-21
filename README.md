| [简体中文](README.md)
| [English](README.en.md)
| [日本語](README.ja.md)

# hexo-theme-arknights

## 预览

- ### **Dr.Yue_plus: <http://arknights.theme.hexo.yue.zone/>**
- **Dr.Ye: <https://laurenfrost.github.io/>**
- **Dr.LingYun: <https://dr-lingyun.gitee.io/>**
- **Dr.XIMU：<http://b.ligzs.cn/>**
- **Dr.ToUNVRSe <https://tounvrse.github.io/>**
- **Dr.tyqtyq <https://tyq0712.github.io/>**
- **Dr.Ryo <https://blog.ryo-okami.xyz/>**
- **Dr.TTsdzb <https://ark.ttsdzb.monster/>**
- **Dr.Tanle <https://ztblog.work/>**
- **Dr.Sherkey <https://blog.sherkey.ml/>**
- **Dr.Angine <https://angine.tech/>**

如果使用了这个主题，欢迎在这儿贴预览链接~

![主题预览图片](./demo.jpg)

## 系统环境

- [Node.js `16.13.x` 以上](https://nodejs.org/zh-cn/)
- [最新版 Hexo](https://hexo.io/zh-cn/)
  > Hexo `6.0.0` 以上；
  > hexo-cli `4.3.0` 以上；
- 中国大陆用户推荐使用 `cnpm` 安装依赖包，参考 [中国 NPM 镜像](https://npmmirror.com/)

## 安装

### 使用 `hexo-cli` 新建博客项目：

```shell script
hexo init Hexo
cd Hexo
cnpm install
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights
```

### 安装依赖

npm 用户：
```shell script 
cnpm install hexo-server hexo-browsersync hexo-renderer-pug --save
```

yarn 用户：
```shell script
yarn add hexo-server hexo-browsersync hexo-renderer-pug
```

### 修改配置文件

- 参照 [Hexo 官网](https://hexo.io/zh-cn/docs/configuration) 修改 `Hexo/` 目录下的 `_config.yml`。
  - 把 `theme:` 的值改为 `arknights`
  - 开启代码高亮：
    ```yml
    highlight:
      hljs: true
    ```
- **剪切** [`Hexo/themes/arknights/_config.yml`](https://github.com/Yue-plus/hexo-theme-arknights/blob/main/_config.yml) 到 Hexo 目录下，并重命名为 `_config.arknights.yml`。
  > 建议参考：
  > - [使用代替主题配置文件](https://hexo.io/zh-cn/docs/configuration#%E4%BD%BF%E7%94%A8%E4%BB%A3%E6%9B%BF%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

  主题的配置文件可参照中文注释修改。

### 修改资源文件

可按需修改 `Hexo/themes/arknights/source/` 目录下的
- `favicon.ico`：浏览器标签页上的图标
- `CNAME`: GitHub Pages 部署时的自定义域名
- `README.md`: 部署仓库的 README
- `img/`目录下的 `Alipay.png` 与 `WeChat.png` 可替换为自己的二维码（1:1 比例的 `png` 图片）；

## 写作

- 参考 [Hexo | 写作](https://hexo.io/zh-cn/docs/writing)。
- 在主题仓库的 Hexo 分支有一些 [示例文本](https://github.com/Yue-plus/hexo-theme-arknights/tree/hexo/source/_posts)可以取用
- 添加文章标签与分类，更多特性可参考 [Hexo | Front-matter](https://hexo.io/zh-cn/docs/front-matter) ，示例：
  ```markdown
  ---
  title: 'Hello World !'
  date: 2020-04-15 21:54:02
  tags: code
  category: Example
  ---
  ```
- 在 `<!-- more -->` 之前的内容称之为摘要，会显示在首页上，并且可以设置是否也在正文显示。

## 可在顶部导航栏新建自定义页面

- 例如：新建一个 `about` 页面
  在 `Hexo` 目录下执行
  ```shell script
  hexo new page 'about'
  ```
  然后 `Hexo/source/` 目录下会多一个 `about` 文件夹
- 编辑 `Hexo/source/about/index.md` 文件
- 编辑 `_config.arknights.yml`，添加一个链接：
  ```yml
  menu:
    About: /about
  ```

## 评论系统

### Valine

本主题支持[Valine](https://valine.js.org/) 。
请参考 [Valine 快速开始](https://valine.js.org/quickstart.html) 修改 Hexo 目录下的 `_config.arknights.yml` 文件：

```yaml
valine:
  enable: false
  app_id: # APP ID
  app_key: # APP KEY
  server_url: # APP DOMAIN（LeanCloud 国际版）
```

开启邮件提醒：[zhaojun1998 / Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)

> **注意！** 当 Valine 使用 *LeanCloud 国际版* 时，才需要配置 `server_url:`。  
> 该设置可在 LeanCloud 应用中的 `设置 -> 应用凭证 -> 域名白名单 -> Request 域名` 中找到以 `.api.lncldglobal.com` 结尾的域名，加上 `https://` 前缀即可。

### Gitalk

本主题支持 [Gitalk](https://gitalk.github.io/) 。
请参考 [gitalk/readme-cn.md](https://github.com/gitalk/gitalk/blob/master/readme-cn.md) 修改 Hexo 目录下的 `_config.arknights.yml` 文件：

```yaml
gitalk:
  enable: false
  client_id: # GitHub 应用 Client ID
  client_secret: # GitHub 应用 Client Secret
  repo: # 用于存放评论数据的 GitHub 仓库
  owner: # 该 GitHub 仓库所有者
  admin: [] # 具有写该 GitHub 仓库权限的用户
  # 例如: [adminA,adminB]
  id: # (可选) 页面的唯一标识
  # 例如: location.pathname
```
### Waline

本主题支持 [Waline](https://waline.js.org/) 。  
请参考 [Waline官方文档](https://waline.js.org/) 修改 Hexo 目录下的 `_config.arknights.yml` 文件:  
```yaml
waline:
  enable: false 
  server_url: #Server_Url
```


## 数学公式

本主题支持两种方案显示数学公式：

### 方案一：静态渲染

可以使用 [hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) Hexo 过滤器静态渲染，来显示数学公式：

1. 在 Hexo 目录下执行以下指令：

```shell script
# 安装 hexo-filter-mathjax 插件
cnpm install hexo-filter-mathjax --save
# 清除缓存
hexo clean
```

2. 把以下内容添加到 `Hexo/_config.yml` 文件：

```yaml
mathjax:
  tags: none # 或 'ams' 或 'all'
  single_dollars: true # 启用单个美元符号作为内联（行内）数学公式定界符
  cjk_width: 0.9 # 相对 CJK 字符宽度
  normal_width: 0.6 # 相对正常（等宽）宽度
  append_css: true # 将 CSS 添加到每个页面
  every_page: false # 如果为 true，那么无论每篇文章的前题中的 `mathjax` 设置如何，每页都将由 mathjax 呈现
```

3. 在需要启用 mathjax 的文章的 [Front-matter](https://hexo.io/zh-cn/docs/front-matter) 区内添加 `mathjax: true`：

```markdown
---
title: On the Electrodynamics of Moving Bodies
categories: Physics
date: 1905-06-30 12:00:00
mathjax: true
---
```

然后，就可以在文章中使用 LaTeX 语法。

4. 需要注意，内联数学公式（…… `$<数学公式>$` ……）在开头 `$` 之后和结尾 `$` 之前不能有空格！例如：

```diff
-$ \epsilon_0 $
+$\epsilon_0$
-$ \frac{\partial}{\partial t} $
+$\frac{\partial}{\partial t}$
```

5. 需要注意 LaTeX 与 Markdown 语法之间的冲突。如有必要，请使用 `\` 进行转义：

```diff
-$\epsilon_0$
+$\epsilon\_0$
-\begin{eqnarray*}
+\begin{eqnarray\*}
```

### 方案二：动态渲染

本主题也支持 [MathJax](https://www.mathjax.org/) ，在用户浏览时动态渲染公式：

1. 首先要卸载 Hexo 默认自带的 hexo-renderer-marked 渲染器，更换成对 MathJax 支持更好的 [hexo-renderer-kramed](https://github.com/sun11/hexo-renderer-kramed) 渲染器：

```shell
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

2. 修改 **Hexo 目录** 下的 `_config.arknights.yml` 文件：

```diff
# 公式支持
mathjax:
-  enable: false
+  enable: true
  version: '2.6.1'  # 重要
```

3. 然后，就可以在文章中使用 LaTeX 语法：

```latex
% 单行内联公式
% 注意需要两边带上 "`" ，且 "`" 与 "$" 之间不能有空格
`$\sigma$`

% 多行公式
$$
\begin{aligned}f(x) &= \sum_{i=1}^{\infty}{\frac{x}{2^i}} \\
&= x\end{aligned}
$$
```

4. 用这种方案，不会造成 LaTeX 与 Markdown 语法之间的冲突。在文中使用 LaTeX 语法不需要转义。
以下公式可以直接使用，不会造成任何问题：

```latex
\epsilon_0
\begin{eqnarray*}
```

hexo-renderer-kramed 插件还有其他可配置项，请参考插件文档： https://github.com/sun11/hexo-renderer-kramed

几种公式显示方案各有优缺点：

1. 动态渲染方案 LaTeX 语法不需要转义，能更好的支持从其他地方导出的 Markdown 文件。但因为需要在浏览器渲染，页面显示会略有延迟。
2. 静态渲染方案将公式直接编译在静态文件里，显示性能更优，但语法需要转义。

## 图表支持

修改 **Hexo 目录** 下的 `_config.arknights.yml` 文件：

```diff
 # 图表支持
 mermaid:
-  enable: false
+  enable: true
   version: '8.13.5'
```

主题通过 mermaid-js 绘制各种图表。**[查看示例](https://ark.theme.yueplus.ink/mermaid/)**

支持：
[流程图](https://ark.theme.yueplus.ink/mermaid/#%E6%B5%81%E7%A8%8B%E5%9B%BE)
| [序列图](https://ark.theme.yueplus.ink/mermaid/#%E5%BA%8F%E5%88%97%E5%9B%BE)
| [类图](https://ark.theme.yueplus.ink/mermaid/#%E7%B1%BB%E5%9B%BE)
| [状态图](https://ark.theme.yueplus.ink/mermaid/#%E7%8A%B6%E6%80%81%E5%9B%BE)
| [实体关系图](https://ark.theme.yueplus.ink/mermaid/#%E5%AE%9E%E4%BD%93%E5%85%B3%E7%B3%BB%E5%9B%BE)
| [用户旅程图](https://ark.theme.yueplus.ink/mermaid/#%E7%94%A8%E6%88%B7%E6%97%85%E7%A8%8B%E5%9B%BE)
| [甘特图](https://ark.theme.yueplus.ink/mermaid/#%E7%94%98%E7%89%B9%E5%9B%BE)
| [指令图](https://ark.theme.yueplus.ink/mermaid/#%E6%8C%87%E4%BB%A4%E5%9B%BE)
| [饼图](https://ark.theme.yueplus.ink/mermaid/#%E9%A5%BC%E5%9B%BE)

语法：

```html
<div class="mermaid">
  graph LR
  A[Hard edge] -->|Link text| B(Round edge)
  B --> C{Decision}
  C -->|One| D[Result one]
  C -->|Two| E[Result two]
</div>
```

> 如果习惯使用 `代码块` 也完全支持。

## 字数/阅读时长统计

依赖 [`hexo-wordcount`](https://github.com/willin/hexo-wordcount)：

npm 用户：

```shell script
cnpm install hexo-wordcount --save
```

yarn 用户：

```shell script
yarn add hexo-wordcount
```

之后修改 **Hexo 目录** 下的 `_config.arknights.yml` 文件：

```yaml
post:
  count: true # 是否显示字数统计
  time: true # 是否显示阅读时长统计
```

## 文档加密

**注意： 前端加密并不可靠！**

**注意！** 此加密插件会加密摘要内容，所以使用此插件时不能在正文中隐藏摘要。在 `_config.arknights.yaml` 文件中：

```yaml
post:
  excerpt: true # 是否在文章中显示摘要内容（<!-- more--> 以上的内容）
```

可尝试使用 [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) 插件进行文档加密。

> 详细参考 [hexo-blog-encrypt/ReadMe.zh.md](https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md)

```sh
cnpm install hexo-blog-encrypt --save
```

在 `Hexo/_config.yml` 文件中添加以下内容：

```yml
# Security
encrypt: # hexo-blog-encrypt
  abstract: 与 Rhodes Island™ 取得弱神经连接时需要口令
  message: 请输入与 Rhodes Island™ 取得弱神经连接时的口令：
  tags:
  - {name: tagName, password: 密码A}
  - {name: tagName, password: 密码B}
  template: <div id="hexo-blog-encrypt" data-wpm="{{hbeWrongPassMessage}}" data-whm="{{hbeWrongHashMessage}}"><div class="hbe-input-container"><input type="password" id="hbePass" placeholder="{{hbeMessage}}" /><label>{{hbeMessage}}</label><div class="bottom-line"></div></div><script id="hbeData" type="hbeData" data-hmacdigest="{{hbeHmacDigest}}">{{hbeEncryptedData}}</script></div>
  wrong_pass_message: 与 Rhodes Island™ 效验口令失败，请重试。
  wrong_hash_message: 与 Rhodes Island™ 效验口令失败，当前使用临时权限查看。
```

**或** 在文章的 [Front-matter](https://hexo.io/zh-cn/docs/front-matter) 区内设置：

```markdown
---
title: Hello World
tags:
- 作为日记加密
date: 2016-03-30 21:12:21
password: mikemessi
abstract: 与 Rhodes Island™ 取得弱神经连接时需要口令
message: 请输入与 Rhodes Island™ 取得弱神经连接时的口令：
wrong_pass_message: 与 Rhodes Island™ 效验口令失败，请重试。
wrong_hash_message: 与 Rhodes Island™ 效验口令失败，当前使用临时权限查看。
---
```

## 搜索

默认开启，若要关闭，在 `Hexo/_config.arknights.yml` 文件中：

```yaml
search:
  enable: false
```

## Front-matter

除了 [Hexo 支持的 Front-matter](https://hexo.io/zh-cn/docs/front-matter) 还支持：

```yaml
# 文章页右上角发布/更新日期
post-info: true/false

# 侧边栏的目录
post-index: true/false

# 打赏框
reward: true/false
```

## 引入自定义 CSS/JS 文件

可以在 `Hexo/source/css/` 目录下放入自己的 CSS 文件；
在 `Hexo/source/js/` 目录下放入自己的 JavaScript 脚本文件；

然后修改 `Hexo/_config.arknights.yml` 文件：

```diff
 # 在 `<head>` 标签内引入 CSS 样式表
 stylesheets:
 - //unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/atom-one-dark-reasonable.min.css
+- /css/custom.css
 
 # 在 `<body>` 尾部引入 JavaScript 脚本
 scripts:
 - //unpkg.com/@highlightjs/cdn-assets@11.4.0/highlight.min.js
+- /js/custom.js
```

> 资源文件夹是存放用户资源的地方。
> 除 `_posts` 文件夹之外，开头命名为 `_` (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。
> Markdown 和 HTML 文件会被解析并放到 `public` 文件夹，而其他文件会被拷贝过去。
>
> ——来自 [Hexo 官方文档](https://hexo.io/zh-cn/docs/setup#source)

## 参与开发

### 开发人员

- [Yue_plus](https://github.com/Yue-plus)
- [Laurenfrost](https://github.com/Laurenfrost)
- [ToUNVRSe](https://github.com/ToUNVRSe)
- [飞龙project](https://github.com/feilongproject)
- [DarkLingYun](https://github.com/DarkLingYun)
- [RyoJerryYu](https://github.com/RyoJerryYu)
- [TTsdzb](https://github.com/TTsdzb)

> 欢迎提交 [Issues](https://github.com/Yue-plus/hexo-theme-arknights/issues/new) 与 [PR](https://github.com/Yue-plus/hexo-theme-arknights/pulls)

### 分支说明

| 分支       | 说明                            |
|----------|-------------------------------|
| main     | 相对稳定的版本                       |
| dev      | 开发中的版本                        |
| gh-pages | gh-page 托管                    |
| hexo     | Hexo 目录，这里有可以用于测试主题的 `.md` 文件 |

### 开发中可能遇见的 BUG 及解决方法

<!--

#### 修改 `.pug` 模板文件无法自动刷新页面。
解决方法：将 Hexo 目录下的
`./node_modules/hexo-renderer-pug/lib/pug.js`
中的
`pugRenderer.compile = pugCompile;`
注释掉。
-->

#### 修改 TS 文件不生效

这是因为在拆分文件后 TypeScript 需要手动编译，请全局安装 `typescript` 后在 `arknights\source\js\_src` 目录下执行 `tsc` 以编译。

#### 运行 `hexo serve --debug` 时，长文章渲染不全

这是由热重载插件 `hexo-browsersync` 导致的，不会影响发布。

解决方法：禁用该插件。（反正不影响发布，不管也行）

#### 参与开发可能需要的文档

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/templates)
- [Stylus 中文网](http://stylus.bootcss.com/)
- [Pug 模板引擎中文文档](https://www.pugjs.cn/api/getting-started.html)

- 另外引用几个大佬的blog
  > - [Easy Hexo](https://easyhexo.com/)
  > - [让 Hexo 搭建的博客支持 LaTeX](http://cps.ninja/2019/03/16/hexo-with-latex/)
  > - [Hexo主题开发 - ﹏猴子请来的救兵 - 博客园](https://www.cnblogs.com/yyhh/p/11058985.html)
  > - [Hexo主题开发经验杂谈 | MARKSZのBlog](https://molunerfinn.com/make-a-hexo-theme/)
  > - [Hexo 主题开发指南 | Peak Xin's Blog](https://xinyufeng.net/2019/04/15/hexo-theme-guide/)

## 支援主题开发

喜欢这个主题的话可以：

- 给颗小星星吧 `(/▽＼)`
  > - √ `ヾ(✿ﾟ▽ﾟ)ノ` 100star 做个新主题哦~
  > - 新主题开发中 [Yue-plus/vuepress-theme-rhinelab](https://github.com/Yue-plus/vuepress-theme-rhinelab)
- 开发者的B服ID：`24444750`
- 加入 QQ 群：618221514
  > 群内开发为主，吹水晒卡，分享线索7也都欢迎哦~ `d=====(￣▽￣*)b`
- 打赏、赞助:

![收款二维码](./support.jpg)
