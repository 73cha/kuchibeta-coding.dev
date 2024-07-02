# くちべたコーディング
屋号のウェブサイトです。

## コマンド
投稿のスケルトンを生成する。
```
npm run gen:skeleton:post -- --filename={ファイル名}
```

`Icon`コンポーネントで利用する、`name`プロパティの型をファイル名から生成する。
```
npm run gen:type:iconname
```

## Components 配下のディレクトリ構成について
コンポーネントについての持論は、責任を分割するためであると考えています。
そのため、`resusable`なモノと`unreusable`なモノがあると考えています。

`partials`は`unreusable`なモノで、特定のコンテキストの論理的な塊を意味しています。

## CSSセレクターの記述ポリシー
以下のポリシーに従って記述しています。

ネストを利用すると便利に書くことができますが、
最小限に留めて多少冗長でも関心を分離する方針です。

- 詳細度を極力一定(0.1.0)に保つ
- 関心を分離する
- ネストは最小限にする

### ネストを許可するパターン
以下の場合は、ネストを許可します。

- モディファイアー
- 疑似要素・擬似クラス
- メディアクエリ・コンテナクエリ

```css
/**
 * Not Recommend
 * 関心が分離できていない、詳細度が0.1.1
 */
.hoge {
  p {
    color: currentcolor;
  }
}

/**
 * Recommend
 * 関心を分離している、詳細度が0.1.0
 */
.hoge :where(p) {
  color: currentcolor;
}
```

## メモ
### CSSに関するメモ
動的なコンポーネント内の要素へのセレクターは、ネストしないとセレクター自体が生成されない模様。
`getEntry`のような関数が返す、`<Content />`などが該当する。

```html
<div class="content-wrap">
  <Content />
</div>
```

```css
/* NG */
.content-wrap :where(p) {
  color:currentcolor;
}

/* OK */
.content-wrap {
  :where(p) {
    color:currentcolor;
  }
}
```
