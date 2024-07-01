import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from '@iconify/tools'

import type { SVG } from '@iconify/tools'
import type { Color } from '@iconify/utils/lib/colors/types'

// パスの指定に`__dirname`を使うのはNG
// ビルドプロセスでディレクトリが見つからない例外が発生する
const iconSet = await importDirectory(`src/icons`, {
  prefix: 'local',
  keyword: (file) => file.file,
  keepTitles: true,
})

const isBlack = (color: Color) => {
  const colorCode = 0

  switch (color.type) {
    case 'rgb':
      return (
        color.r === colorCode && color.g === colorCode && color.b === colorCode
      )
  }

  return false
}

const isWhite = (color: Color) => {
  const colorCode = 255

  switch (color.type) {
    case 'rgb':
      return (
        color.r === colorCode && color.g === colorCode && color.b === colorCode
      )
  }

  return false
}

const convertToCurrentColorIfMonotone = (svg: SVG) => {
  parseColors(svg, {
    defaultColor: 'currentColor',
    callback: (_, colorStr, color) => {
      // `falsy` or 空(`none`や`transparent`)
      if (!color || isEmptyColor(color)) {
        return colorStr
      }

      // 黒 or 白
      if (isBlack(color) || isWhite(color)) {
        return 'currentColor'
      }

      // 色付きならそのまま
      return colorStr
    },
  })
}

// name: `iconSet`の`keyword`で取得したファイル名
// type: IconSetのインスタンスを作成すると、`type`は`icon`になる
// `forEach`は配列のメソッドではなく、IconSetのメソッド
iconSet.forEach((name, type) => {
  if (type !== 'icon') return

  const svg = iconSet.toSVG(name)

  // 指定したファイル名のアイコンがなければ削除する
  if (!svg) {
    iconSet.remove(name)

    return
  }

  try {
    // https://iconify.design/docs/libraries/tools/icon/cleanup.html#clean-up-process
    // SVGに含まれる余計なものを取り除く
    cleanupSVG(svg)

    convertToCurrentColorIfMonotone(svg)

    // SVGの最適化
    runSVGO(svg)
  } catch (err) {
    console.error(`Error parsing ${name}:`, err)
    iconSet.remove(name)

    return
  }

  iconSet.fromSVG(name, svg)
})

export const iconifyJson = iconSet.export(true)
