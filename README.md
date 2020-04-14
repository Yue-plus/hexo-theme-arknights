# hexo-theme-arknights

明日方舟的 Hexo 主题
开发中……

## 参与开发

### 分支说明
| 分支     | 说明                                           |
| -------- | ---------------------------------------------- |
| master   | 主题开发目录                                   |
| gh-pages | gh-page 托管                                   |
| hexo     | Hexo 目录，这里有可以用于测试主题的 `.md` 文件 |

### 搭建开发环境
先装好 [nodejs](https://nodejs.org/) 和 [yarn](https://classic.yarnpkg.com/zh-Hans/) ，然后执行以下命令：
```shell script
yarn global add hexo-cli yo generator-hexo-theme
hexo init <test>
cd <test>
yarn add hexo-server hexo-browsersync hexo-renderer-pug hexo-renderer-sass hexo-renderer-ts
cd <test>/themes
git clone https://github.com/Yue-plus/hexo-theme-arknights.git arknights
```
修改 `<test>/_config.yml` 中 `theme:` 的值改为 `arknights`
然后,打开 `<test>/themes/arknights` 下编辑主题
```shell script
hexo serve --debug
```


### 开发中可能遇见的 BUG 及解决方法
#### 修改 `.pug` 模板文件无法自动刷新页面。
解决方法：将 Hexo 目录下的
`./node_modules/hexo-renderer-pug/lib/pug.js`
中的
`pugRenderer.compile = pugCompile;`
注释掉。

#### 运行 ‘hexo serve --debug’ 时，长文章渲染不全
这是由热重载插件 `hexo-browsersync` 导致的，不会影响发布
解决方法：禁用该插件。（反正不影响发布，不管也行）

#### 参与开发可能需要的文档
- [Hexo 官方文档](https://hexo.io/zh-cn/docs/templates)
- [SASS 中文网](https://www.sass.hk/guide/)
  > 注意，这个中文网标的是 SASS 但写的是 SCSS 的语法。
  > 其最大区别是 SASS 不要写分号和花括号、文件拓展名不同。
- [Pug 模板引擎中文文档](https://pugjs.bootcss.com/api/getting-started.html)

- 另外引用几个大佬的blog
  > - [让 Hexo 搭建的博客支持 LaTeX](http://cps.ninja/2019/03/16/hexo-with-latex/)
  > - [Hexo主题开发 - ﹏猴子请来的救兵 - 博客园](https://www.cnblogs.com/yyhh/p/11058985.html)
  > - 【墙】[Hexo主题开发经验杂谈 | MARKSZのBlog](https://molunerfinn.com/make-a-hexo-theme/)
  > - 【墙】[Hexo 主题开发指南 | Peak Xin's Blog](https://xinyufeng.net/2019/04/15/hexo-theme-guide/)

## 点个 star 把~
给颗小星星吧 `(/▽＼)`
