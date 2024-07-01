import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export const GET = async (context: APIContext) => {
  const blog = await getCollection('blog')

  return rss({
    title: 'くちべたコーディング',
    description:
      'くちべたコーディングは、口下手なフリーランスのマークアップエンジニアが運営するウェブサイトです。',
    site: context.site!,
    items: blog
      .filter((post) => post.data.draft !== true)
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.publishedAt),
        description: post.data.summary,
        link: `/blog/${post.slug}`,
      })),
    customData: `<language>ja_JP</language>`,
  })
}
