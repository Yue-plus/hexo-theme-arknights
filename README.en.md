| [简体中文](README.md)
| [English](README.en.md)
| [日本語](README.ja.md)
|

# hexo-theme-arknights

## Preview

Here are all the friendship links of this theme<!--Previously used-->:

- ### **Dr.Yue_plus: <http://arknights.theme.hexo.yue.zone/>**
- ### **Dr.ToUNVRSe <https://tounvrse.github.io/>**
- **Dr.Ye: <https://laurenfrost.github.io/>**
- **Dr.tyqtyq <https://tyq0712.github.io/>**
- **Dr.Angine <https://angine.tech/>**
- **Dr.sjfhsjfh <https://sjfh.top/>**
- **Dr.Voilone <https://note.voiblog.top/>**
- **Dr.yuanli-LFSW<https://blog.yuanli-lfsw.com/>**
- **Dr.Laplacian: <https://rhinelab.kr>**
- **Dr.Chen: <https://light-of-hers.github.io>**
- **Dr.Linyee <https://linyee.world/>**
- **Dr.Flacier <https://flacier.us.kg/>**
- **Dr.LZW <https://lzwnb.github.io/blog/>** 
- **Dr.GrandpaFox <https://grandpafox.online/>** 
- **Dr.未雨屏 <https://weiyuping.top/>**
- **飞龙project <https://schale.top/>**
- **tomorinao-www <https://ghpage.wwnao.xyz>**

<!-- - **Dr.LingYun: <https://dr-lingyun.gitee.io/>** -->
<!-- - **Dr.XIMU：<http://www.ligzs.com/>** -->
<!-- - **Dr.TTsdzb <https://ark.ttsdzb.monster/>** -->
<!-- - **Dr.Zhongye1 <https://zhongye1.github.io/>** -->
<!-- - **Dr.Rimrose: <https://blog.rimrose.site>** -->

If you're using this theme, we warmly welcome you to initiate [Pull Requests](https://github.com/Yue-plus/hexo-theme-arknights/compare) to post friends' links here.

![Preview image](./demo.jpg)

## Install

## System requirements

- [Node.js >= `16.13.x`](https://nodejs.org/)
- [Newest Hexo](https://hexo.io/)
  > Hexo >= `6.0.0`;
  > hexo-cli >= `4.3.0`;


### Use `hexo-cli` to create a new blog project

```shell
hexo init Hexo
cd Hexo
npm install
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights --depth=1
```

### Install dependencies

For npm users:

```shell
npm install hexo-server hexo-browsersync hexo-renderer-pug --save
```

For yarn users:

```shell
yarn add hexo-server hexo-browsersync hexo-renderer-pug
```

### Edit configurations

- Edit `_config.yml` under folder `Hexo/`. You can refer to [Hexo](https://hexo.io/docs/configuration).  
    - Change the default value of `theme:` from `landscape` to `arknights`
    - Enable code highlighting:

      ```yml
      highlight:
        hljs: true
      ```

- **Move** `Hexo/themes/arknights/_config.yml` to the root directory of Hexo, and rename it to `_config.arknights.yml`.
  > Please refer to:
  > - [Alternate Theme Config](https://hexo.io/docs/configuration#Alternate-Theme-Config)
  
  The configuration file of the theme can be modified by referring to the Chinese comments.  

### Edit asset files

The following files can be added to the `Hexo/source` directory as needed:

- `CNAME`: Custom domain name when GitHub Pages is deployed
- The `Alipay.png` and `WeChat.png` in the `img/` directory are your own QR codes (1:1 scale `png` images); 

You can modify the `Hexo/themes/arknights/source/` directory as needed:

- `favicon.ico`: Icons on browser tabs (64*64, not displayed if the resolution is high)
- `README.md`: README for deployment repository

## Writing

- Please refer to [Hexo | Writing](https://hexo.io/docs/writing).
- There are some [sample texts](https://github.com/Yue-plus/hexo-theme-arknights/tree/hexo/source/_posts) available in the Hexo branch.  
- To add tags and categories, or for more features, please refer to [Hexo | Front-matter](https://hexo.io/docs/front-matter). Example:

  ```markdown
  ---
  title: 'Hello World !'
  date: 2020-04-15 21:54:02
  tags: code
  category: Example
  ---
  ```

- The content before `<!-- more -->` is called a summary. It will be displayed on the home page, and you can set whether it is also displayed in the main body of the article.  

## Custom pages in the top navigation bar

- Example: Creating an `about` page  
  + Run the commands `hexo new page 'about'` in `Hexo` directory
  + Hexo will create an `about` folder in `Hexo/source/`  
- Edit file `Hexo/source/about/index.md`  
- Edit `_config.arknights.yml`, and add a link there:

  ```yml
  menu:
    About: /about
  ```

## Disable Archive Page Turning

This setting is located in the Hexo configuration file `_config.yml` about line 88.

```yaml
# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page
```

Change `per_page:` to 0.

## Comment systems

### Valine

The theme supports [Valine](https://valine.js.org/en/index.html).  
Please refer to [Valine Quick Start](https://valine.js.org/en/quickstart.html) and edit `_config.arknights.yml` in your Hexo directory:  

```yaml
valine:
  enable: false
  app_id: # APP ID
  app_key: # APP KEY
  server_url: # APP DOMAIN (LeanCloud international version requires this)
  avatar: 'retro' # (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
  avatar_cdn: 'https://dn-qiniu-avatar.qbox.me/avatar/' # Custom avatar cdn
```

For notifications with email: [zhaojun1998 / Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)

> **Note!** `server_url:` is ONLY required when using *LeanCloud international version*.
> This setting can be found in the LeanCloud application in `Settings -> Application Credentials -> Domain Whitelist -> Request Domain` for the domain name ending in '.api.lncldglobal.com' and add the 'https:' prefix.

### Gitalk

The theme supports [Gitalk](https://gitalk.github.io/) .
Please refer to [gitalk/readme.md](https://github.com/gitalk/gitalk/blob/master/readme.md) and edit `_config.arknights.yml` in your Hexo directory:  

```yaml
gitalk:
  enable: false
  client_id: # GitHub Application Client ID
  client_secret: # GitHub Application Client Secret
  repo: # GitHub repository
  owner: # GitHub repository owner
  admin: [] # GitHub repository owner and collaborators (Users who having write access to this repository)
            # Example: [adminA,adminB]
  id: # The unique id of the page
      # Example: location.pathname
```

### Waline

The theme supports [Waline](https://waline.js.org/).  
Please refer to [Waline docs](https://waline.js.org/) and edit `_config.arknights.yml` in your Hexo directory

```yaml
waline:
  enable: false 
  server_url: #Server_Url
```

### Artalk

The theme supports [Artalk](https://artalk.js.org/).  
Please refer to Artalk docs and edit `_config.arknights.yml` in your Hexo directory.

```yaml
artalk:
  enable: false
  server: https://artalk.server.instance/ # 你的 Artalk 服务地址
  site_name: My Blog # 站点名称，用于区分多个站点（可选）
```

### Utterances

The theme supports [Utterances](https://utteranc.es/).  
Please refer to Utterances docs and edit `_config.arknights.yml` in your Hexo directory:

```yaml
utterances:
  enable: false
  repo: # GitHub repository owner and name, format: owner/repo
  issue_term: pathname # Options: pathname | url | title | og:title
  theme: github-light # Options: github-light | github-dark | preferred-color-scheme | github-dark-orange | icy-dark | dark-blue | photon-dark | boxy-light
```

> Before using, you need to:
> 1. Ensure the GitHub repository is public
> 2. Install the [utterances app](https://github.com/apps/utterances) in your repository
> 3. Ensure Issues are enabled for the repository

### Giscus

The theme supports [Giscus](https://giscus.app/) comment system.
Please refer to Giscus official documentation and edit `_config.arknights.yml` in your Hexo directory:

#### Basic Configuration

```yaml
giscus:
  enable: false
  repo: # GitHub repository owner and name, format: owner/repo
  repo_id: # Repository ID, get it from giscus page
  category: # Discussion category name
  category_id: # Category ID, get it from giscus page
  mapping: pathname # Page ↔️ discussion mapping
  strict: 0 # Enable strict title matching: 0 | 1
  reactions_enabled: 1 # Enable reactions on main post: 0 | 1
  emit_metadata: 0 # Emit discussion metadata: 0 | 1
  input_position: bottom # Comment input position: top | bottom
  lang: en # Language
  loading: lazy # Lazy loading: lazy | leave empty to disable
  crossorigin: anonymous # CORS setting
```

#### Theme Configuration (Choose One)

**Option 1: Single Theme (Fixed theme, doesn't follow site theme)**
```yaml
giscus:
  theme: preferred_color_scheme # or other theme name
```

**Option 2: Separate Light/Dark Themes (Recommended, supports auto theme switching)**
```yaml
giscus:
  theme_light: light # Light mode theme
  theme_dark: dark # Dark mode theme
```

**Option 3: Custom CSS (Advanced usage)**
```yaml
giscus:
  theme: https://your-domain.com/path/to/custom-giscus-theme.css
```

#### Available Theme Options

- **GitHub Theme Series**: `light`, `dark`, `dark_dimmed`, `dark_high_contrast`, `dark_tritanopia`, `light_high_contrast`, `light_tritanopia`, `light_protanopia`, `dark_protanopia`
- **Special Themes**: `preferred_color_scheme`, `transparent_dark`
- **Borderless Themes**: `noborder_light`, `noborder_dark`, `noborder_gray`
- **Third Party Themes**: `gruvbox`, `gruvbox_dark`, `gruvbox_light`, `purple_dark`, `cobalt`
- **Catppuccin Themes**: `catppuccin_latte`, `catppuccin_frappe`, `catppuccin_macchiato`, `catppuccin_mocha`
- **Others**: `fro`

#### Mapping Options

```yaml
giscus:
  mapping: pathname # Available options:
    # pathname - Use page path
    # url - Use full URL
    # title - Use page title
    # og:title - Use og:title meta tag
    # specific - Use specific string (requires term)
    # number - Use specific discussion number (requires discussion_number)
  
  # Used when mapping is specific
  term: "your-specific-term"
  
  # Used when mapping is number
  discussion_number: 123
```

#### Advanced Configuration Options

```yaml
giscus:
  # Custom discussion description
  description: "Comments"
  
  # Domain restriction
  origin: "https://your-domain.com"
  
  # Custom backlink
  backlink: "https://your-domain.com"
```

For better security control, create `source/giscus.json` file in your site root:

```json
{
  "origins": ["https://your-domain.com"],
  "originsRegex": ["http://localhost:[0-9]+"],
  "defaultCommentOrder": "newest"
}
```

Domain validation priority: YAML config > JSON exact match > JSON regex match > default allow

#### Message Events API

```javascript
// Listen to message events
giscusManager.addMessageHandler((data) => {
  console.log('Giscus message:', data)
})

// Update configuration
giscusManager.sendMessage({ setConfig: { theme: 'dark' } })

// Sync theme
giscusManager.syncTheme()
```

> **Before using, you need to:**
> 1. Ensure the GitHub repository is public
> 2. Install the [giscus app](https://github.com/apps/giscus) in your repository
> 3. Ensure Discussions are enabled for the repository

## Mathematical formulas

The theme supports two scenarios for displaying math formulas:  

### Option 1: Static rendering

You can use [hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) filter to render math formulas statically:  

It is recommended to replace the markdown renderer [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc) that can better handle mathematical formulas first.

1. Run the following commands in your Hexo directory:  

   ```shell script
   # Install hexo-filter-mathjax
   cnpm install hexo-filter-mathjax --save
   # Clean the cache
   hexo clean
   ```

2. Add the following into `Hexo/_config.yml`:  

   ```yaml
   mathjax:
     tags: none # or 'ams' or 'all'
     single_dollars: true # use single '$' as inline math formula delimiter
     cjk_width: 0.9 # Relatively CJK character width
     normal_width: 0.6 # Relatively normal width
     append_css: true # Add CSS to every pages
     every_page: false # If true, then every page will be rendered by mathjax, regardless of the `mathjax` setting in the front-matter of each article
   ```

3. Add `mathjax: true` in the [Front-matter](https://hexo.io/docs/front-matter) of article that requires mathjax to be enabled:  

   ```markdown
   ---
   title: On the Electrodynamics of Moving Bodies
   categories: Physics
   date: 1905-06-30 12:00:00
   mathjax: true
   ---
   ```

   Then, you can use LaTeX in your articles.  

4. Please note that inline math formulas (… `$<math formula>$` ...) cannot have spaces after the opening `$` and before the closing `$`! For example:  

   ```diff
   - $ \epsilon_0 $
   + $\epsilon_0$
   - $ \frac{\partial}{\partial t} $
   + $\frac{\partial}{\partial t}$
   ```

5. Be aware of the conflict between LaTeX and Markdown syntax. Use `\` to escape if necessary:  

   ```diff
   - $\epsilon_0$
   + $\epsilon\_0$
   - \begin{eqnarray*}
   + \begin{eqnarray\*}
   ```

### Option 2: Dynamic rendering

The theme also supports [MathJax](https://www.mathjax.org/), to dynamically render formulas as the user browses:

1. First, uninstall the hexo-renderer-marked renderer that comes with Hexo by default, and replace with [hexo-renderer-kramed](https://github.com/sun11/hexo-renderer-kramed) with better MathJax support:  

   ```shell
   npm uninstall hexo-renderer-marked --save
   npm install hexo-renderer-kramed --save
   ```

2. Edit `_config.arknights.yml` in your **Hexo directory**:  

   ```diff
     # Formula support
     mathjax:
   -   enable: false
   +   enable: true
       version: '2.6.1'  # important
   ```

3. Then, you can use LaTeX in your articles:  

   ```latex
   % Single-line inline formula
   % Note that you need to put "`" on both sides, and there can be no space between "`" and "$"
   `$\sigma$`
   
   % Multi-line formula
   $$
   \begin{aligned}f(x) &= \sum_{i=1}^{\infty}{\frac{x}{2^i}} \\
   &= x\end{aligned}
   $$
   ```

4. With this scheme, there will be no conflict between LaTeX and Markdown syntax. Escaping is not required to use LaTeX syntax in the text.  
   The following formulas can be used directly without any problems:  

   ```latex
   \epsilon_0
   \begin{eqnarray*}
   ```

The hexo-renderer-kramed plugin has other configurable items, please refer to the plugin documentation: https://github.com/sun11/hexo-renderer-kramed  

Advantages and disadvantages of these formula display schemes:  

1. Dynamic rendering does not require escaping, and can better support Markdown files exported from other places. But since it needs to be rendered in the browser, the page display will be slightly delayed.  
2. The static rendering compiles the formula directly into the static file, which has better display performance, but the syntax needs to be escaped.  
3. [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc) quickly displays formulas without having to go through the hassle of escaping syntax, but requires Pandoc to be installed.

## Chart support

Edit `_config.arknights.yml` in your **Hexo directory**:  

```diff
  # Chart support
  mermaid:
-   enable: false
+   enable: true
    version: '8.13.5'
```

The theme renders various charts via mermaid-js. **[Examples](https://arknights.theme.hexo.yue.zone/mermaid/)**

Supports:
[Flow Chart](https://arknights.theme.hexo.yue.zone/mermaid/#%E6%B5%81%E7%A8%8B%E5%9B%BE)
| [Sequence Diagram](https://arknights.theme.hexo.yue.zone/mermaid/#%E5%BA%8F%E5%88%97%E5%9B%BE)
| [Class Diagram](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%B1%BB%E5%9B%BE)
| [State Diagram](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%8A%B6%E6%80%81%E5%9B%BE)
| [Entity Relationship Diagram](https://arknights.theme.hexo.yue.zone/mermaid/#%E5%AE%9E%E4%BD%93%E5%85%B3%E7%B3%BB%E5%9B%BE)
| [User Journey Map](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%94%A8%E6%88%B7%E6%97%85%E7%A8%8B%E5%9B%BE)
| [Gantt Chart](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%94%98%E7%89%B9%E5%9B%BE)
| [Instruction Map](https://arknights.theme.hexo.yue.zone/mermaid/#%E6%8C%87%E4%BB%A4%E5%9B%BE)
| [Pie Chart](https://arknights.theme.hexo.yue.zone/mermaid/#%E9%A5%BC%E5%9B%BE)

Syntax:

```html
<div class="mermaid">
  graph LR
  A[Hard edge] -->|Link text| B(Round edge)
  B --> C{Decision}
  C -->|One| D[Result one]
  C -->|Two| E[Result two]
</div>
```

> It is also fully supported if you are used to using `code blocks`.  

## Word count & Reading time statistics

Depends [`hexo-wordcount`](https://github.com/willin/hexo-wordcount):

For npm users:

```shell script
cnpm install hexo-wordcount --save
```

For yarn users:

```shell script
yarn add hexo-wordcount
```

Then edit `_config.arknights.yml` in your **Hexo directory**:

```yaml
post:
  count: true # Display word count
  time: true # Display reading time statistics
```

## Views statistics

Use [Vercount](https://vercount.one/) for page view statistics. Due to instability of the original Busuanzi service, it has been replaced with the more reliable Vercount service.
Modify the `_config.arknights.yml` file in the **Hexo directory** to enable this feature:

```yaml
vercount:
  enable: false
  sitePV: true # Total Site Visits
  siteUV: true # Number of site visitors
  pagePV: true # Page Views
```

## Document encryption

The modified [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) plugin has been adapted and integrated into this theme (currently only the `default` and `up` themes are supported).

> If previously installed, please remove the `hexo-blog-encrypt` dependency in `package.json` under the hexo directory and execute the following command
> 
> ```shell
> pnpm i
> hexo clean
> ```
> 
> For detailed configuration reference [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt)

Add the following to the `Hexo/_config.yml` file:

```yml
# Security
encrypt: # hexo-blog-encrypt
  abstract: Password required for weak neural connection to Rhodes Island™
  message: Please enter password for weak neural connection to Rhodes Island™
  tags:
  - {name: tagName, password: PassowrdA}
  - {name: tagName, password: PasswordB}
  wrong_pass_message: Failed to verify password with Rhodes Island™, please try again.
  wrong_hash_message: Failed to validate password with Rhodes Island™, currently viewing with temporary privileges.
```

**Or** Set the following in [Front-matter](https://hexo.io/docs/front-matter) of the artical:  

```markdown
---
title: Hello World
tags:
- Encrypted as a diary
date: 2016-03-30 21:12:21
password: mikemessi
abstract: Password required for weak neural connection to Rhodes Island™
message: Please enter password for weak neural connection to Rhodes Island™
wrong_pass_message: Failed to verify password with Rhodes Island™, please try again.
wrong_hash_message: Failed to validate password with Rhodes Island™, currently viewing with temporary privileges.
---
```

## Searching

Searching is enabled by default. To disable it, edit your `Hexo/_config.arknights.yml` file:

```yaml
search:
  enable: false
```

## Build time display

You can choose to add a build time display in the sidebar. It is disabled by default. To enable it, add the following to `Hexo/_config.arknights.yml`:

```yaml
build_time: true
```

## Front-matter

In addition to [Front-matter supported by Hexo](https://hexo.io/docs/front-matter), the theme also supports:  

```yaml
# Article Published/updated date
post-time: true/false

# Article reading time/word count statistics
post-count: true/false

# Article Vercount statistics
vercount: true/false

# Turn on/off all of the above
post-info: true/false

# Sidebar table of contents
post-index: true/false

# Rewards
reward: true/false
```

## extra label

### admonition

```text
{% note/warning/success/failure/detail [title] [open/fold] [color] %}
content
{% end[note/warning/success/failure/detail] %}
```

Add block based content such as note, warning, error, etc. with icons for `note/warning/success/failure` and no icons for `detail`.

### hide

```
{% hide content %}
```

Hidden content, supports markdown rendering, can have spaces, and does not require quotation marks.

### link card/linkc

```
{% linkcard %}
Title1:
    avatar: https://someLink/someAvatar.png
    src: https://someLink/
    img: https://somelink/somePicture.png
    descr: someDescr
    style:
    	color: someColor
Title2:
    avatar: https://someLink/someName.png
    src: https://someLink/
{% endlinkcard %}
```

A set of friendly links can be generated, with the title and link (src) as mandatory options. Style follows CSS format.

## Import custom CSS/JS files

You can put your own CSS snippets into `Hexo/source/css/`;  
put JavaScript file into `Hexo/source/js/`;  

Then edit `Hexo/_config.arknights.yml`:  

```diff
  # Include CSS stylesheets inside `<head>` tags
  stylesheets:
  - //unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/atom-one-dark-reasonable.min.css
+ - /css/custom.css
  
  # Introduce JavaScript at the end of `<body>`
  scripts:
  - //unpkg.com/@highlightjs/cdn-assets@11.4.0/highlight.min.js
+ - /js/custom.js
```

> The resource folder is where a user stores his resources.  
> With the exception of the `_posts` folder, files/folders and hidden files named starting with `_` (underscore) will be ignored.
> Markdown and HTML files will be parsed and put into the `public` folder, while other files are copied over there.
>
> -- From [Hexo Official Documentation](https://hexo.io/docs/setup#source)

## Participate in the development

Welcome to submit [Issues](https://github.com/Yue-plus/hexo-theme-arknights/issues/new) and [PR](https://github.com/Yue-plus/hexo-theme-arknights/pulls)

### Branch description

| Branch   | Illustrate                                                        |
|----------|-------------------------------------------------------------------|
| main     | A relatively stable version                                       |\
| gh-pages | gh-page hosting                                                   |
| hexo     | Hexo directory, where you can fine `.md` files to test your theme |

### Bugs and solutions that may encounter during development

#### Modified TS file does not take effect

TypeScript needs to be compiled manually, please install `typescript` globally and execute `tsc` in the `arknights\source\js\_src` directory to compile it.

#### Long articles are not fully rendered when running 'hexo serve --debug'

This is caused by `hexo-browsersync`, and will not affect the release.

Workaround: Disable the plugin. (Anyway, it doesn't affect the release, no matter what)

### Documentation that may be required to participate in the development

- [Hexo](https://hexo.io/docs/templates.html)
- [Stylus](https://stylus-lang.com/)
- [Pug](https://pugjs.org/api/getting-started.html)

- Also quote a few big guy blogs
  > - [Easy Hexo](https://easyhexo.com/)
  > - [让 Hexo 搭建的博客支持 LaTeX](http://cps.ninja/2019/03/16/hexo-with-latex/)
  > - [Hexo主题开发 - ﹏猴子请来的救兵 - 博客园](https://www.cnblogs.com/yyhh/p/11058985.html)
  > - [Hexo主题开发经验杂谈 | MARKSZのBlog](https://molunerfinn.com/make-a-hexo-theme/)
  > - [Hexo 主题开发指南 | Peak Xin's Blog](https://xinyufeng.net/2019/04/15/hexo-theme-guide/)

### Developers

- [ToUNVRSe](https://github.com/ToUNVRSe)
- [Yue_plus](https://github.com/Yue-plus)
- [TTsdzb](https://github.com/TTsdzb)
- [arkerny](https://github.com/arkerny)
- [DarkLingYun](https://github.com/DarkLingYun)
- [Laurenfrost](https://github.com/Laurenfrost)
- [安擎Angine](https://github.com/angine04)
- [飞龙project](https://github.com/feilongproject)
- [sjfhsjfh](https://github.com/sjfhsjfh)
- [Thexvoilone](https://github.com/Thexvoilone)
- [RyoJerryYu](https://github.com/RyoJerryYu)
- [wmz1024](https://github.com/wmz1024)
- [madisontanle](https://github.com/madisontanle)
- [SherkeyXD](https://github.com/SherkeyXD)
- [soundofautumn](https://github.com/soundofautumn)
- [LongFengShuanWu](https://github.com/LongFengShuanWu)
- [Zhongye1](https://github.com/Zhongye1)
- [ChisatoNishikigi73](https://github.com/ChisatoNishikigi73)

## Reward

If you enjoy this theme:  

- give me a star `(/▽＼)`
  > - √ `ヾ(✿ﾟ▽ﾟ)ノ` 100star for a new theme~
  > - New theme developing:
  >   + [Yue-plus/astro-arknights](https://github.com/Yue-plus/astro-arknights)
  >   + [Yue-plus/vuepress-theme-rhinelab](https://github.com/Yue-plus/vuepress-theme-rhinelab)
- Arknights ID of the developer: `24444750` (Chinese Bilibili server)
- Join Tencent QQ discussion group: [618221514](https://qm.qq.com/q/QJ7NPWiWyK)
- reward/sponsor:
  ![Reward QR code](./support.jpg)
