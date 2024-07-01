import fs from 'node:fs/promises'

const __dirname = import.meta.dirname
const rootPath = __dirname.replace('src', '')
const files = await fs.readdir(`${rootPath}/public/icons`, {
  encoding: 'utf-8'
})

const filenames = files.map((file) => `${file.replace('.svg', '')}`)

const content = `export type IconNames = ${
  filenames.reduce((p, c, i) => {
    if (i === 1) {
      p = `'${p}'`
    }

    return (`${p} | '${c}'`).replace('\n', '')
  })
}`

console.log(content, filenames)

await fs
  .writeFile(`${__dirname}/src/types/IconNames.ts`, content, 'utf-8')
  .catch(error => console.error(error))