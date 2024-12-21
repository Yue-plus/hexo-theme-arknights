| [简体中文](README.md)
| [English](README.en.md)
| [日本語](README.ja.md)
| 

# hexo-theme-arknights

## デモページ　　

- ### **Dr.Yue_plus: <http://arknights.theme.hexo.yue.zone/>**
- ### **Dr.ToUNVRSe <https://tounvrse.github.io/>**
- **Dr.Ye: <https://laurenfrost.github.io/>**
- **Dr.LingYun: <https://dr-lingyun.gitee.io/>**
- **Dr.XIMU：<http://b.ligzs.cn/>**
- **Dr.tyqtyq <https://tyq0712.github.io/>**
- **Dr.TTsdzb <https://ark.ttsdzb.monster/>**
- **Dr.Angine <https://angine.tech/>**
- **Dr.sjfhsjfh <https://sjfh.top/>**
- **Dr.Voilone <https://note.voiblog.top/>**
- **Zhongye1 <https://zhongye1.github.io/>**
- **Dr.yuanli-LFSW<https://blog.yuanli-lfsw.com/>**
- **Dr.Rimrose: <https://blog.rimrose.site>**
- **Dr.Laplacian: <https://rhinelab.kr>**
- **Dr.Chen: <https://light-of-hers.github.io>**
- **Dr.Linyee <https://linyee.world/>**
- **Dr.Flacier <https://fldicoahkiin.github.io>**
- **Dr.LZW <https://lzwnb.github.io/blog/>** 😋😋

このテーマを使ったあなたのブログリンク、ここに付けたいなら大歓迎~　　

![テーマのデモページ](./demo.jpg)

## インストール

## 環境

- [Node.js `16.13.x` 以上](https://nodejs.org/zh-cn/)
- [最新版 Hexo](https://hexo.io/zh-cn/)
  > Hexo `6.0.0` 以上；
  > hexo-cli `4.3.0` 以上；


### `hexo-cli` を使用して新しいブログ プロジェクトを作成します。

```shell
hexo init Hexo
cd Hexo
npm install
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights
```

### 依存関係をインストールする

npm ユーザー：

```shell 
npm install hexo-server hexo-browsersync hexo-renderer-pug --save
```

yarn ユーザー：

```shell
yarn add hexo-server hexo-browsersync hexo-renderer-pug
```

## 設定ファイルの変更

- [Hexo 公式サイト](https://hexo.io/ja/docs/configuration.html) を参考に `<Hexo>/_config.yml` を変更します。  
    - `theme:` 初期値の`landscape` を `arknights` に変更してください。  
    - コードハイライトを有効にします：

      ```yml
      highlight:
        hljs: true
      ```

- `<Hexo>/themes/arknights/_config.yml` を **切り取って** `Hexo` ディレクトリに移動し、·_config.arknights.yml` という名前に変更します。    
  > 参考：
  > - [代替テーマ設定](https://hexo.io/ja/docs/configuration.html#%E4%BB%A3%E6%9B%BF%E3%83%86%E3%83%BC%E3%83%9E%E8%A8%AD%E5%AE%9A)

  テーマの設定ファイルは、中国語のコメントを参考に変更できます。

### リソースファイルの変更

必要に応じて `Hexo/source/` ディレクトリに以下のファイルを追加します

- `CNAME`：GitHub Pages のデプロイ時のカスタムドメイン
- `img/`：ディレクトリ下の `Alipay.png` と `WeChat.png` を自分の受取用 `QR` コード（1:1 比率の `png` 画像）にします；

必要に応じて `Hexo/themes/arknights/source/` ディレクトリ下の以下を変更します

`favicon.ico`：ブラウザのタブ上のアイコン（64*64、解像度が高すぎると表示されません）
`README.md`: デプロイリポジトリの README

## 執筆

- [執筆 | Hexo](https://hexo.io/ja/docs/writing.html) を参考にします。
- テーマリポジトリの Hexo ブランチにはいくつかの [サンプルテキスト](https://github.com/Yue-plus/hexo-theme-arknights/tree/hexo/source/_posts) があります
- 記事にタグとカテゴリを追加し、より多くの特性は [Hexo | Front-matter](https://hexo.io/ja/docs/front-matter.html) を参考にできます、例：

  ```markdown
  ---
  title: 'Hello World !'
  date: 2020-04-15 21:54:02
  tags: code
  category: Example
  ---
  ```

- `<!-- more -->` の前の内容は要約と呼ばれ、ホームページに表示され、本文にも表示するかどうかを設定できます。

## ナビゲーションバーにページを追加する

- 例えば、`about` ページを新規作成する
  + `Hexo` ディレクトリで `hexo new page 'about'` を実行します
  + その後、`Hexo/source/` ディレクトリに `about` フォルダが追加されます
- `Hexo/source/about/index.md` ファイルを編集します
- `_config.arknights.yml` を編集し、リンクを追加します：

  ```yml
  menu:
    About: /about
  ```

## ページネーションの禁止

この設定は Hexo の設定ファイル `_config.yml` の約 88 行目にあります。

```yaml
# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page
```

`per_page:` を 0 に変更すればよいです。

## コメントシステム

### Valine

このテーマはValineをサポートしています。
Valineのクイックスタートを参考に、Hexoディレクトリの`_config.arknights.yml`ファイルを変更してください：

```yaml
valine:
  enable: false
  app_id: # APP ID
  app_key: # APP KEY
  server_url: # APP DOMAIN（LeanCloud 国際版）
  avatar: 'retro' # (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
  avatar_cdn: 'https://dn-qiniu-avatar.qbox.me/avatar/' # カスタム avatar CDN
```

メール通知を有効にする：[zhaojun1998 / Valine-Admin](https://github.com/zhaojun1998/Valine-Admin)

> **注意！** Valine を *LeanCloud国際版* で使用する場合のみ、`server_url:` を設定する必要があります。
> この設定は、LeanCloud アプリの`設定 -> アプリケーション証明書 -> ドメインホワイトリスト -> Requestドメイン`で、`.api.lncldglobal.com`で終わるドメインを見つけ、`https://`のプレフィックスを追加すればよいです。

### Gitalk

このテーマは [Gitalk](https://gitalk.github.io/) をサポートしています。
 Gitalk の公式ドキュメントを参考に、Hexo ディレクトリの `_config.arknights.yml` ファイルを変更してください：

```yaml
gitalk:
  enable: false
  client_id: # GitHub アプリの Client ID
  client_secret: # GitHub アプリの Client Secret
  repo: # コメントデータを保存する GitHub リポジトリ
  owner: # その GitHub リポジトリの所有者
  admin: [] # その GitHub リポジトリに書き込み権限を持つユーザー
            # 例: [adminA,adminB]
  id: # (オプション) ページの一意の識別子
      # 例: location.pathname
```

### Waline

このテーマは [Waline](https://waline.js.org/) をサポートしています。  
Waline の公式ドキュメントを参考に、Hexo ディレクトリの `_config.arknights.yml` ファイルを変更してください:

```yaml
waline:
  enable: false
  server_url: # Server_Url
```

### Artalk

このテーマは  [Artalk](https://artalk.js.org/) をサポートしています。
Artalk の公式ドキュメントを参考に、Hexo ディレクトリの `_config.arknights.yml` ファイルを変更してください:

```yaml
artalk:
  enable: false
  server: https://artalk.server.instance/ # あなたの Artalk サービスのアドレス
  site_name: My Blog # サイト名、複数のサイトを区別するために使用（オプション）
```

## 数学公式

このテーマは数学公式を表示するための2つの方法をサポートしています：

### 方法一：静的レンダリング

数学公式を表示するために、Hexoフィルターの [hexo-filter-mathjax](https://github.com/next-theme/hexo-filter-mathjax) を静的レンダリングとして使用することができます。

数学公式をより良く処理するためのマークダウンレンダラー [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc) に切り替えることをお勧めします。

1. Hexoディレクトリで以下のコマンドを実行します：

   ```shell script
   # hexo-filter-mathjaxプラグインをインストール
   cnpm install hexo-filter-mathjax --save
   # キャッシュをクリア
   hexo clean
   ```

2. 以下の内容を `<Hexo>/_config.yml` ファイルに追加します：

   ```yml
   mathjax:
     tags: none # あるいは 'ams' また 'all'
     single_dollars: true # $⋯$ で囲んでインライン LaTeX 方程式を書く
     cjk_width: 0.9 # CJK 統合漢字の幅
     normal_width: 0.6 # 正常文字（等幅）の幅
     append_css: true # CSS を全部のページに加える
     every_page: false #  true に設定されると、記事の頭の `mathjax` の値を問わずに、 mathjax が使用される
   ```

3. mathjax を利用したい記事の [Front-matter](https://hexo.io/zh-cn/docs/front-matter) に `mathjax: true` を追加すると：

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
   - $ \epsilon_0 $
   + $\epsilon_0$
   - $ \frac{\partial}{\partial t} $
   + $\frac{\partial}{\partial t}$
   ```

5. LaTeX と Markdown の文法の差異にご注意ください。必要とされる時は半角のバックスラッシュ `\` （日本語環境では半角円記号 '¥'）でエスケープしてください：

   ```diff
   - $\epsilon_0$
   + $\epsilon\_0$
   - \begin{eqnarray*}
   + \begin{eqnarray\*}
   ```

### その2：動的レンダリング

このテーマでは、[MathJax](https://www.mathjax.org/) を利用して、数式をブラウザサイドで動的レンダリングすることもできます。

1. まずは、デフォルトのレンダラー hexo-renderer-marked をアンインストールし、その代わりとして [hexo-renderer-kramed](https://github.com/sun11/hexo-renderer-kramed) をインストールします。

   ```shell
   $ npm uninstall hexo-renderer-marked --save
   $ npm install hexo-renderer-kramed --save
   ```

2. また、 `<Hexo>/_config.yml` を、以下のように変更します。

   ```diff
     # 公式支持
     mathjax:
   -   enable: false
   +   enable: true
     version: '2.6.1'  # 重要
   ```

3. そして、記事の中で以下のように LaTeX 文法を利用して、数式を表示出来ます。

   ```latex
   % インライン数式
   % 両側に「`」を付けてください。「`」と「$」の間に隙間あってはいけません。
   `$\sigma$`

   % ディスプレイ数式
   $$
   \begin{aligned}f(x) &= \sum_{i=1}^{\infty}{\frac{x}{2^i}} \\
   &= x\end{aligned}
   $$
   ```

4. この方法を使うと、 LaTeX と Markdown の文法の差を気にせずに数式を書くことができます。
   以下のように数式を書いても、何の問題もなくレンダリングされます。

   ```latex
   \epsilon_0
   \begin{eqnarray*}
   ```

レンダラー hexo-renderer-marked は他の設定もできますので、公式ドキュメントを参考にしてみてください：https://github.com/sun11/hexo-renderer-kramed

以上の方法は、それぞれに長所と短所があります：

1. 動的レンダリングは、 LaTeX 文法のエスケープせずに書くことができる為、他のフレームワークやブログサイトからの記事導入は簡単にできます。ですが、クライアントサイドレンダリングですので、ページ上の数式表示は若干遅れます。
2. 静的生成は、数式を素早く表示することができますが、 LaTeX 文法のエスケープをしなくてはいけません。
3. [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc) を利用して、文法をエスケープする手間がかからなくても、数式を素早く表示できますが、 Pandoc をインストールしなくてはいけません。

## グラフのサポート

**Hexo ディレクトリ**の `_config.arknights.yml` ファイルを変更します：

```diff
  # グラフのサポート
  mermaid:
-   enable: false
+   enable: true
    version: '8.13.5'
```

このテーマは mermaid-js を使用して各種グラフを描画します。**[例を見る](https://arknights.theme.hexo.yue.zone/mermaid/)**

支持：
[フローチャート](https://arknights.theme.hexo.yue.zone/mermaid/#%E6%B5%81%E7%A8%8B%E5%9B%BE)
| [シーケンス図](https://arknights.theme.hexo.yue.zone/mermaid/#%E5%BA%8F%E5%88%97%E5%9B%BE)
| [クラス図](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%B1%BB%E5%9B%BE)
| [状態図](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%8A%B6%E6%80%81%E5%9B%BE)
| [エンティティ関係図](https://arknights.theme.hexo.yue.zone/mermaid/#%E5%AE%9E%E4%BD%93%E5%85%B3%E7%B3%BB%E5%9B%BE)
| [ユーザージャーニーマップ](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%94%A8%E6%88%B7%E6%97%85%E7%A8%8B%E5%9B%BE)
| [ガントチャート](https://arknights.theme.hexo.yue.zone/mermaid/#%E7%94%98%E7%89%B9%E5%9B%BE)
| [命令図](https://arknights.theme.hexo.yue.zone/mermaid/#%E6%8C%87%E4%BB%A4%E5%9B%BE)
| [パイチャート](https://arknights.theme.hexo.yue.zone/mermaid/#%E9%A5%BC%E5%9B%BE)

構文：

```html
<div class="mermaid">
  graph LR
  A[Hard edge] -->|Link text| B(Round edge)
  B --> C{Decision}
  C -->|One| D[Result one]
  C -->|Two| E[Result two]
</div>
```

もし `コードブロック` を使い慣れていれば完全にサポートします。

## 文字数/読取り時間の統計

依存：[`hexo-wordcount`](https://github.com/willin/hexo-wordcount)：

npm ユーザー：

```shell
cnpm install hexo-wordcount --save
```

yarn ユーザー：

```shell
yarn add hexo-wordcount
```

その後、**Hexo ディレクトリ** の下の `_ config.arknights.yml` ファイルを変更する：

```yaml
post:
  count: true # 文字数統計を表示するかどうか
  time: true # 読書時間統計を表示するかどうか
```

## ブラウズ統計

[不蒜子](http://busuanzi.ibruce.info/)  を使用してブラウズ統計を取得します。
**Hexoディレクトリ** の下にある `_ config.arknights.yml` ファイルを変更して有効にするには：

```yaml
busuanzi:
  enable: false
  sitePV: true # サイト総アクセス数
  siteUV: true # サイト訪問者数
  pagePV: true # ページアクセス数
```

### ドキュメント暗号化

修正された [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) プラグインはこのトピックに適合して統合されています（現在は default と up トピックのみがサポートされています）。

> 詳細構成リファレンス [hexo-blog-encrypt/ReadMe.zh.md](https://github.com/D0n9X1n/hexo-blog-encrypt/)

`Hexo/_config.yml` ファイルに次の内容を追加します。

```yml
# Security
encrypt: # hexo-blog-encrypt
  abstract: Rhodes Islandと™ 弱神経接続を取得するにはパスワードが必要です
  message: Rhodes Islandと入力してください™ 弱神経接続を取得する際のパスワード：
  tags:
  - {name: tagName, password: パスワードA}
  - {name: tagName, password: パスワードB}
  wrong_pass_message: Rhodes Islandと™ パスワードの有効化に失敗しました。再試行してください。
  wrong_hash_message: Rhodes Islandと™ 有効パスワードが失敗しました。現在は一時権限を使用して表示されています。
```

**または**記事の [Front-matter](https://hexo.io/ja/docs/front-matter.html)  セクション内の設定：

```markdown
---
title: Hello World
tags:
- 日記として暗号化
date: 2016-03-30 21:12:21
password: mikemessi
abstract：Rhodes Islandと™ 弱神経接続を取得するにはパスワードが必要です
message：Rhodes Islandと入力してください™ 弱神経接続を取得する際のパスワード：
wrong_pass_message：Rhodes Islandと™ パスワードの有効化に失敗しました。再試行してください。
wrong_hash_message：Rhodes Islandと™ 有効パスワードが失敗しました。現在は一時権限を使用して表示されています。
---
```

### 検索

デフォルトでオンになっています。オフにするには、`Hexo/_config.arknights.yml` ファイルで次の手順に従います。

```yaml
search:
  enable: false
```

## Front-matter

[Hexo サポートの Front-matter](https://hexo.io/ja/docs/front-matter.html) もサポート：

```yaml
# 投稿/更新日
post-time: true/false

# 記事の読み込み時間/語数の統計
post-count: true/false

# 記事の読み取り回数
busuanzi: true/false

# 以上すべてオン/オフ
post-info: true/false

# サイドバーのディレクトリ
post-index: true/false

# に報いる
reward: true/false
```

## 追加ラベル

### admonition

```text
{% note/warning/success/failure/detail [title] [open/fold] [color] %}
content
{% end[note/warning/success/failure/detail] %}
```

ヒント、警告、エラーなどのブロックコンテンツを追加します。その中で、`note/warning/success/failure` はアイコンがあり、`detail` はアイコンがありません。

### hide

```
{% hide content %}
```

コンテンツを非表示にし、content は markdown レンダリングをサポートし、引用符を使用する必要はありません。

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

友達チェーンのセットを生成できます。タイトル（title）、リンク（src）は必須です。スタイル（style）は CSS フォーマットに準拠しています。

## カスタム CSS/JS ファイルの導入

`Hexo/source/css/` ディレクトリに自分の CSS ファイルを置くことができます。
`Hexo/source/js/` ディレクトリに自分の JavaScript スクリプトファイルを置くことができます。

次に `Hexo/_config.arknights.yml` ファイルを変更します：

```diff
  # `<head>` タグ内に CSS スタイルシートを導入
  stylesheets:
+ - /css/custom.css
  
  # `<body>` の末尾に JavaScript スクリプトを導入
  scripts:
+ - /js/custom.js
```

> リソースフォルダはユーザーリソースを保存する場所です。
> `_posts` フォルダ以外で、先頭が `_`（アンダースコア）で名付けられたファイル/フォルダや隠しファイルは無視されます。
> Markdown と HTML ファイルは解析されて `public` フォルダに置かれ、他のファイルはコピーされます。
> 
> —— Hexo 公式ドキュメントより

## テーマの開発にあなたの力を

[Issues](https://github.com/Yue-plus/hexo-theme-arknights/issues/new) と [PR](https://github.com/Yue-plus/hexo-theme-arknights/pulls) は大歓迎。

### ブレンチの説明

| ブレンチ     | 説明                        |
|----------|---------------------------|
| main     | 比較的安定したバージョン              |
| gh-pages | github-page               |
| hexo     | Hexo ファイルとテスト用 `.md` ファイル |

### 開発中に遭遇する可能性のある問題と解決方法

#### TS ファイルの変更が反映されない

TypeScript は手動でコンパイルする必要があります。`typescript` をグローバルにインストールした後、`arknights\source\js\_src` ディレクトリで `tsc` を実行してコンパイルしてください。

#### `hexo serve --debug` を実行すると、長い記事が完全にレンダリングされない

これはホットリロードプラグイン `hexo-browsersync` が原因で、公開には影響ありません。

解決方法：そのプラグインを無効にします。（公開に影響がないので、無視しても構いません）

### 開発に参加するために必要なドキュメント

- [Hexo 公式ドキュメント](https://hexo.io/ja/docs/templates.html)
- [Stylus 公式ドキュメント](https://stylus-lang.com/)
- [Pug 公式ドキュメント](https://pugjs.org/api/getting-started.html)

- 何人かの大物のブログを引用して
  > - [Easy Hexo](https://easyhexo.com/)
  > - [让 Hexo 搭建的博客支持 LaTeX](http://cps.ninja/2019/03/16/hexo-with-latex/)
  > - [Hexo主题开发 - ﹏猴子请来的救兵 - 博客园](https://www.cnblogs.com/yyhh/p/11058985.html)
  > - [Hexo主题开发经验杂谈 | MARKSZのBlog](https://molunerfinn.com/make-a-hexo-theme/)
  > - [Hexo 主题开发指南 | Peak Xin's Blog](https://xinyufeng.net/2019/04/15/hexo-theme-guide/)

### メンバー

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

## 支援テーマの開発

このテーマはお気に入れば：

- star 頂戴いたします `(/▽＼)`  
  > - star 100 達成したら、新しいテーマの開発をスケジュールに入れます。
  > - 新しいテーマ開発中：
  >   + [Yue-plus/astro-arknights](https://github.com/Yue-plus/astro-arknights)
  >   + [Yue-plus/vuepress-theme-rhinelab](https://github.com/Yue-plus/vuepress-theme-rhinelab)
- 開発者の arknight id：`24444750`（中国 Bilibili 鯖）  
- Tencent QQ の交流グループ：[618221514](https://qm.qq.com/q/QJ7NPWiWyK)
- Reward：
  ![QRコード](./support.jpg)  
