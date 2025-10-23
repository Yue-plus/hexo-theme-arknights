| [简体中文](README.md)
| [English](README.en.md)
| [日本語](README.ja.md)
| 

# hexo-theme-arknights

## デモページ　　

ここには、すべての本テーマの使用者<!-- かつて使用したことがある人 -->の相互リンクが記録されています。

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
　
このテーマを使用した場合、[Pull Requests](https://github.com/Yue-plus/hexo-theme-arknights/compare) を発起してここに相互リンクを貼ることを大歓迎します。

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
git clone https://github.com/Yue-plus/hexo-theme-arknights.git themes/arknights --depth=1
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
  locale:
    placeholder: "コメントをお待ちしています～"
    # sofa: "コメントをお待ちしています～"
    # nick: "ニックネーム"
    # mail: "メールアドレス"
    # link: "URL"
    # submit: "送信"
```

Walineはロケールオプションを提供しており、インターフェースの言語と表示テキストをカスタマイズするために使用できます。デフォルトでは、Walineは組み込みの多言語テキストを使用します。現在の言語がサポートされていない場合、自動的にen-US（アメリカ英語）にフォールバックします。<br/>デフォルトで表示されるテキストを上書きするために、一部のフィールドを設定できます。ロケールオプションでは、すべてのフィールドはオプションであり、指定されていないフィールドはデフォルト値を保持します。<br/>
```yaml
レベル関連:
level${number}: レベル${number}の表示テキスト
```
```yaml
リアクション関連:
reactionTitle: リアクションタイトル
reaction0: リアクション1のテキスト
reaction1: リアクション2のテキスト
reaction2: リアクション3のテキスト
reaction3: リアクション4のテキスト
reaction4: リアクション5のテキスト
reaction5: リアクション6のテキスト
reaction6: リアクション7のテキスト
reaction7: リアクション8のテキスト
reaction8: リアクション9のテキスト
```
```yaml
UI関連:
nick: ニックネーム
mail: メールアドレス
link: ウェブサイト
placeholder: コメント欄プレースホルダー
sofa: コメントがまだない時の表示テキスト
submit: 送信ボタンテキスト
comment: コメントボタンテキスト
refresh: 更新ボタンテキスト
more: さらに読み込むボタンテキスト
uploading: アップロード中表示テキスト
login: ログインボタンテキスト
admin: 管理者バッジ
sticky: 固定表示
word: 文字
anonymous: 匿名ユーザー名
optional: 任意項目表示テキスト
gifSearchPlaceholder: GIF検索プレースホルダー
oldest: 古い順
latest: 新しい順
hottest: 人気順
```
> 上記設定項目のテキストはページに表示されます。

```yaml
エラーメッセージ関連:
nickError: ニックネームが条件を満たしていない場合のエラーメッセージ
mailError: メールアドレスが条件を満たしていない場合のエラーメッセージ
wordHint: コメント文字数に関するエラーメッセージ。$0、$1、$2は自動的に文字数の下限、上限、現在の文字数に置き換えられます。
```
```yaml
コメント時間関連:
seconds: 秒前
minutes: 分前
hours: 時間前
days: 日前
now: たった今
```
```yaml
管理関連:
approved: 承認済み
waiting: 承認待ち
spam: スパムコメント
unsticky: 固定を解除
```
```yaml
アクセシビリティ関連(アクセシビリティサービスのみで使用され、ページには表示されません):
like: いいね
cancelLike: いいね取消
reply: 返信ボタンのラベル
cancelReply: 返信取消ボタンのラベル
preview: プレビューボタンのラベル
emoji: 絵文字ボタンのラベル
gif: GIFボタンのラベル
uploadImage: 画像アップロードボタンのラベル
profile: プロフィールページのラベル
logout: ログアウトボタンのラベル
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

### Utterances

このテーマは [Utterances](https://utteranc.es/) をサポートしています。
Utterances 公式ドキュメントを参考に、Hexo ディレクトリの `_config.arknights.yml` ファイルを変更してください:

```yaml
utterances:
  enable: false
  repo: # GitHub リポジトリの所有者と名前、形式：owner/repo
  issue_term: pathname # 選択肢: pathname | url | title | og:title
  theme: github-light # 選択肢: github-light | github-dark | preferred-color-scheme | github-dark-orange | icy-dark | dark-blue | photon-dark | boxy-light
```

> 使用前に必要な設定：
> 1. GitHub リポジトリが公開されていることを確認
> 2. リポジトリに [utterances app](https://github.com/apps/utterances) をインストール
> 3. リポジトリで Issues が有効になっていることを確認

### Giscus

このテーマは [Giscus](https://giscus.app/) コメントシステムをサポートしています。
Giscus 公式ドキュメントを参考に、Hexo ディレクトリの `_config.arknights.yml` ファイルを変更してください:

#### 基本設定

```yaml
giscus:
  enable: false
  repo: # GitHub リポジトリの所有者と名前、形式：owner/repo
  repo_id: # リポジトリ ID、giscus ページから取得
  category: # discussion カテゴリ名
  category_id: # カテゴリ ID、giscus ページから取得
  mapping: pathname # ページ ↔️ discussion マッピング関係
  strict: 0 # 厳密なタイトルマッチングを有効にする 0 | 1
  reactions_enabled: 1 # メイン投稿でのリアクションを有効にする 0 | 1
  emit_metadata: 0 # discussion のメタデータを出力する 0 | 1
  input_position: bottom # コメント入力ボックスの位置: top | bottom
  lang: ja # 言語
  loading: lazy # 懒惰読み込み: lazy | 空で無効化
  crossorigin: anonymous # CORS 設定
```

#### テーマ設定（3つの方法から1つを選択）

**方法1：単一テーマ（固定テーマ、サイトテーマに追従しない）**
```yaml
giscus:
  theme: preferred_color_scheme # または他のテーマ名
```

**方法2：明暗テーマ個別設定（推奨、自動テーマ切り替えサポート）**
```yaml
giscus:
  theme_light: light # ライトモードテーマ
  theme_dark: dark # ダークモードテーマ
```

**方法3：カスタムCSS（上級者向け）**
```yaml
giscus:
  theme: https://your-domain.com/path/to/custom-giscus-theme.css
```

#### 利用可能なテーマオプション

- **GitHub テーマシリーズ**: `light`, `dark`, `dark_dimmed`, `dark_high_contrast`, `dark_tritanopia`, `light_high_contrast`, `light_tritanopia`, `light_protanopia`, `dark_protanopia`
- **特殊テーマ**: `preferred_color_scheme`, `transparent_dark`
- **ボーダーレステーマ**: `noborder_light`, `noborder_dark`, `noborder_gray`
- **サードパーティテーマ**: `gruvbox`, `gruvbox_dark`, `gruvbox_light`, `purple_dark`, `cobalt`
- **Catppuccin テーマ**: `catppuccin_latte`, `catppuccin_frappe`, `catppuccin_macchiato`, `catppuccin_mocha`
- **その他**: `fro`

#### マッピングオプション

```yaml
giscus:
  mapping: pathname # 選択肢：
    # pathname - ページパスを使用
    # url - 完全なURLを使用  
    # title - ページタイトルを使用
    # og:title - og:title メタタグを使用
    # specific - 特定の文字列を使用（term と組み合わせ）
    # number - 特定のdiscussion番号を使用（discussion_number と組み合わせ）
  
  # mapping が specific の場合に使用
  term: "your-specific-term"
  
  # mapping が number の場合に使用
  discussion_number: 123
```

#### 上級設定オプション

```yaml
giscus:
  # カスタム discussion 説明
  description: "コメント"
  
  # ドメイン制限
  origin: "https://your-domain.com"
  
  # カスタムバックリンク
  backlink: "https://your-domain.com"
```

より良いセキュリティ制御のため、サイトルートに `source/giscus.json` ファイルを作成できます：

```json
{
  "origins": ["https://your-domain.com"],
  "originsRegex": ["http://localhost:[0-9]+"],
  "defaultCommentOrder": "newest"
}
```

ドメイン検証優先順位：YAML設定 > JSON完全一致 > JSON正規表現 > デフォルト許可

#### メッセージイベント API

```javascript
// メッセージイベントを監視
giscusManager.addMessageHandler((data) => {
  console.log('Giscus message:', data)
})

// 設定を更新
giscusManager.sendMessage({ setConfig: { theme: 'dark' } })

// テーマを同期
giscusManager.syncTheme()
```

> **使用前に必要な設定：**
> 1. GitHub リポジトリが公開されていることを確認
> 2. リポジトリに [giscus app](https://github.com/apps/giscus) をインストール
> 3. リポジトリで Discussions が有効になっていることを確認

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

[Vercount](https://vercount.one/) を使用してブラウズ統計を取得します。元の不蒜子サービスの不安定性により、より信頼性の高いVercountサービスに置き換えられました。
**Hexoディレクトリ** の下にある `_ config.arknights.yml` ファイルを変更して有効にするには：

```yaml
vercount:
  enable: false
  sitePV: true # サイト総アクセス数
  siteUV: true # サイト訪問者数
  pagePV: true # ページアクセス数
```

## ドキュメント暗号化

修正された [hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt) プラグインはこのトピックに適合して統合されています（現在は `default` と `up` トピックのみがサポートされています）。

> もしこの前にインストールした場合は、Hexo ディレクトリの `package.json` から `hexo-blog-encrypt` 依存を削除し、次のコマンドを実行してください
> 
> ```shell
> npm i
> hexo clean
> ```
> 
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

## 検索

デフォルトでオンになっています。オフにするには、`Hexo/_config.arknights.yml` ファイルで次の手順に従います。

```yaml
search:
  enable: false
```

## ビルド時間の表示

サイドバーにビルド時間の表示を追加できます。デフォルトでは無効になっています。有効にするには、`Hexo/_config.arknights.yml` ファイルで次のように設定してください：

```yaml
build_time: true
```

## Front-matter

[Hexo サポートの Front-matter](https://hexo.io/ja/docs/front-matter.html) もサポート：

```yaml
# 投稿/更新日
post-time: true/false

# 記事の読み込み時間/語数の統計
post-count: true/false

# 記事の読み取り回数
vercount: true/false

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

### Monaco Editor

Hexo 標準の [コードブロック](https://hexo.io/ja/docs/tag-plugins.html#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF) に加え、本テーマは VS Code スタイルの [Monaco Editor](https://github.com/microsoft/monaco-editor) をサポートしています。

```text
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
```

`editor` タグは次のパラメータをサポートします：

```text
[language, [theme, [readOnly, [height]]], [...extras(key:value)]]
```

+ `language` のデフォルトは `plaintext` です；
+ `theme` のデフォルトは `vs-dark` です；
+ `readOnly` のデフォルトは `true` です；
+ `height` のデフォルトは `300px` です。

あまり使われないパラメータは `extras` で渡すことができます。例えば、下の例は列数が 40 を超えた時に折り返し（ワードラップ）を有効にします：

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

追加の拡張パラメータは [Monaco Editor ドキュメント](https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html) を参照してください。具体的なスタイルの反映例は [PR #215](https://github.com/Yue-plus/hexo-theme-arknights/pull/215) をご覧ください。

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
- 開発者の arknight id：`24444750`（中国 Bilibili 鯉）
- Tencent QQ の交流グループ：[618221514](https://qm.qq.com/q/QJ7NPWiWyK)
- Reward：
  ![QRコード](./support.jpg)
