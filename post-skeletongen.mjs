import fs from 'node:fs/promises'

/** @typedef { import('./src/content/config').BlogCollectionKeys } Keys */

/** @type {Keys[]} */
const keys = ['title', 'summary', 'publishedAt', 'tags', 'draft', 'updatedAt']

/** YYYY-MM-DDの日付文字列を取得する */
const currentDate = new Date().toISOString().split('T')[0]

/**
 * @param {keys} key
 * @param {string|null|false} value
 */
const setFrontMatter = (key, value) => `${key}: ${value}`;

/** @param {Keys} key */
const getFrontMatterValue = (key) => {
  switch (key) {
    case 'title':
    case 'summary':
      return "''"
    case 'publishedAt':
      return `'${currentDate}'`
    case 'draft':
      return false
    case 'tags':
    case 'updatedAt':
    default:
      return null
  }
}

const frontMatter = keys
  .map((key) => setFrontMatter(key, getFrontMatterValue(key))).join('\n')

const content = `---
${frontMatter}
---`

console.log(content)

/** コマンドライン引数`--filename=hoge`から`hoge`の部分を取得する */
const filename = process.argv.slice(2).at(0)?.split('=').at(1)
const __dirname = import.meta.dirname

await fs
  .writeFile(`${__dirname}/src/content/blog/${filename}.mdx`, content)
  .catch((error) => console.error(error))

