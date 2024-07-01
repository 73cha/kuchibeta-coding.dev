import { defineCollection, reference, z } from 'astro:content'

export type BlogCollectionKeys = keyof typeof blogCollectionSchema

const blogCollectionSchema = {
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string().date(),
  updatedAt: z.string().date().or(z.null()).optional(),
  tags: z.array(reference('tag')).or(z.null()).optional(),
  draft: z.boolean(),
}

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...blogCollectionSchema,
  }),
})

const resultCollection = defineCollection({
  type: 'content',
  schema: z.object({
    subject: z.string(),
    subtitle: z.string(),
    href: z.string().url(),
    thumb: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
    period: z.object({
      start: z.string().date(),
      end: z.string().date(),
    }),
  }),
})

const skillCollection = defineCollection({
  type: 'data',
  schema: z.object({
    lv: z.string(),
    screenReaderText: z.string(),
    description: z.string(),
    order: z.number(),
  }),
})

const careerCollection = defineCollection({
  type: 'data',
  schema: z.object({
    subject: z.string(),
    url: z.string().optional(),
    description: z.array(z.string()),
    period: z.object({
      start: z.string().date(),
      end: z.string().date().or(z.string()),
    }),
  }),
})

const tagCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
  }),
})

export const collections = {
  blog: blogCollection,
  result: resultCollection,
  skill: skillCollection,
  career: careerCollection,
  tag: tagCollection,
}
