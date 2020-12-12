# hexo-theme-arknights

## デモページ　　

デモページはこちらです。　　

- **Dr.Yue_plus: <http://ark.theme.yueplus.ink/>**
- **Dr.Ye: <https://laurenfrost.github.io/>**
- **Dr.LingYun: <https://dr-lingyun.gitee.io/>**
- **Dr.hastin: <http://hastin-blog.cn/>**

このテーマを使ったあなたのブログリンク、ここに付けたいなら大歓迎~　　

![テーマのデモページ](https://api.yueplus.ink/img/arknights_demo.png)

## ダウンロード
### [ダウンロード](https://github.com/Yue-plus/hexo-theme-arknights/releases)

## インストールする

以下の手順通りコマンドを入力すればオーケー。　　

```shell script
hexo init Hexo
cd Hexo
npm install
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights
```

ちなみに、中国でnpm mirrorに接続エラーが発生した時は、コマンド`npm`の代わりにコマンド`cnpm`を使ってください。　　

```shell script
hexo init Hexo
cd Hexo
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights
```

### 依存パッケージ

npm ユーザー：
```shell script 
cnpm install hexo-server hexo-browsersync hexo-renderer-pug hexo-renderer-sass hexo-renderer-ts
```
yarn ユーザー：
```shell script
yarn add hexo-server hexo-browsersync hexo-renderer-pug hexo-renderer-sass hexo-renderer-ts
```

> パッケージ`hexo-renderer-sass`　はインストールエラーが発生しかねません。もう一度インストールしたら、意外と成功したケースは少なくありません。  

### 設定ファイルの編集
- まずは [Hexo 公式サイト](https://hexo.io/docs/configuration) の説明に従い、`<Hexo>/_config.yml` を修正しましょう。  
    - `theme:` 初期値の`landscape` を `arknights` に変更してください。  
    - ソースコードのハイライト：  
      ```yml
      highlight:
        hljs: true
      ```
- 次は `<Hexo>/themes/arknights/_config.yml` を修正しましょう。    

### ページ情報の編集
`<Hexo>/themes/arknights/source/` の中で
- `favicon.ico`：ページのアイコン
- `CNAME`: ドメイン名
- `README.md`: デプロイ先のREADME
- `img/` フォルダにAlipayとWeChatのQRコード `Alipay.png` と `WeChat.png`  

## 新しい記事の作成
`hexo new <記事名>`と打てば`source/_posts/<記事名>.md`というものが生成されるので、生成された`<記事名>.md`にMarkdown形式で入力してください。  

- 参考になる記事 [Hexo公式サイト](https://hexo.io/docs/writing)。  
- このリトジポリの Hexo というブランチには[デモ](https://github.com/Yue-plus/hexo-theme-arknights/tree/hexo/source/_posts)がいくつかあります。どうぞお使いください。  
- 記事にタグとカテゴリーを付けたいなら、記事の頭にタグとカテゴリー入力してください。参考になる記事 [Hexo | Front-matter](https://hexo.io/docs/front-matter) 。  
  ```markdown
  ---
  title: 'Hello World !'
  date: 2020-04-15 21:54:02
  tags: code
  category: Example
  ---
  ```
- `<!-- more -->` の前に出る内容は要旨abstractと呼ばれます。記事のabstractがホームページに見えるかどうかは、コンフィグファイル次第です。  

## 新しいページの作成
- 例えば、 `about` というページを作ります。  
   `<Hexo>` で以下のコマンドを実行して、  
  ```shell script
  hexo new page 'about'
  ```
   `<Hexo>/source/` に `about` というフォルダが作成されます。  
-  `Hexo/source/about/index.md` にお好きなことを書き込みます。  
-  `<Hexo>/themes/arknights/_config.yml` に新しいリンクを入力します：  
  ```yml
  menu:
    About: /about
  ```
- `hexo d`してから、aboutページが見えます。

## コメントシステム
このテーマは[Valine](https://valine.js.org/) がサポートされています。  
コメント機能を付けることには、`<Hexo>/_config.yml` で `valine:` の `app_id:` と `app_key:` を提供しなければなりません。  

参考になる記事 [Valine Quick Start](https://valine.js.org/quickstart.html)。  

メールサブスクライブ：[zhaojun1998 / Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)。  

## 数式および方程式の作成
このテーマは数式および方程式を書類に含めることができます。  
数式を作成するために、[hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) というフィルターが使用されています。  

1. まずは `<Hexo>` で以下のコマンドを実行します： 

```shell script
# hexo-filter-mathjax プラグインをインストール
cnpm install hexo-filter-mathjax --save
# キャッシュの削除
hexo clean
```

2. 以下のコンテンツを `<Hexo>/_config.yml` に加えましょう：

```yml
mathjax:
  tags: none # あるいは 'ams' また 'all'
  single_dollars: true # $⋯$ で囲んでインライン LaTeX 方程式を書く
  cjk_width: 0.9 # CJK 統合漢字の幅
  normal_width: 0.6 # 正常文字（等幅）の幅
  append_css: true # CSS を全部のページに加える
  every_page: false #  true に設定されると、記事の頭の `mathjax` の値を問わずに、 mathjax が使用される
```

3. mathjax を使用したい記事の [Front-matter](https://hexo.io/zh-cn/docs/front-matter) に `mathjax: true` を追加すると：
```markdown
---
title: On the Electrodynamics of Moving Bodies
categories: Physics
date: 1905-06-30 12:00:00
mathjax: true
---
```
記事の中で LaTeX 方程式が使用可能になります。

4. インライン方程式（…… `$<数式>$` ……）は、頭の `$` と後ろの `$` の間で間隔は不要です：
```diff
-$ \epsilon_0 $
+$\epsilon_0$
-$ \frac{\partial}{\partial t} $
+$\frac{\partial}{\partial t}$
```

5. LaTeX と Markdown の文法の差異にご注意ください。必要とされる時は半角のバックスラッシュ `\` （日本語環境では半角円記号 '¥'）を文字の前に付けましょう：
```diff
-$\epsilon_0$
+$\epsilon\_0$
-\begin{eqnarray*}
+\begin{eqnarray\*}
```

> さらに効果の高い数式プラグイン [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc) の使用はまだ検討中です。

## テーマの開発にあなたの力を
### メンバー
- [Yue_plus](https://github.com/Yue-plus)
- [Laurenfrost](https://github.com/Laurenfrost)

>  [Issues](https://github.com/Yue-plus/hexo-theme-arknights/issues/new) と [PR](https://github.com/Yue-plus/hexo-theme-arknights/pulls)は大歓迎。  

### ブレンチの説明
| ブレンチ  | 説明                                           |
| -------- | ---------------------------------------------- |
| master   | テーマの開発                                    |
| gh-pages | github-page                                    |
| hexo     | Hexoファイルとテスト用 `.md` ファイル            |

### 開発の環境
まずは [nodejs](https://nodejs.org/) と [yarn](https://classic.yarnpkg.com/zh-Hans/) をインストール。そして以下のコマンド通り：
```shell script
yarn global add hexo-cli yo generator-hexo-theme
git clone -b hexo https://github.com/Yue-plus/hexo-theme-arknights.git
cd hexo-theme-arknights
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights
yarn install
hexo serve --debug
```

## Reward  
このテーマはお気に入れば：  
- star頂戴いたします `(/▽＼)`  
  > star 100 達成したら、新しいテーマの開発をスケジュールに入れます。  
- 開発者のarknight id：`YuePlus#6221`（中国Bilibili鯖）  
- Tencent QQの交流グループ 618221514  
- Reward：  

![QRコード](https://api.yueplus.ink/img/support.jpg)  
