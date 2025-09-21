import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Bio = defineDocumentType(() => ({
  name: 'Bio',
  filePathPattern: `bios/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string', required: false },
    image: { type: 'string', required: false },
    updated: { type: 'date', required: false }
  },
  computedFields: {
    name: { type: 'string', resolve: (doc) => doc.title },
    role: { type: 'string', resolve: (doc) => doc.summary || '' },
    slug: { type: 'string', resolve: (d) => `/about/${d._raw.flattenedPath}` }
  }
}))

export const Section = defineDocumentType(() => ({
  name: 'Section',
  filePathPattern: `sections/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    kicker: { type: 'string', required: false },
    ctaLabel: { type: 'string', required: false },
    ctaHref: { type: 'string', required: false },
    media: { type: 'json', required: false },
    updated: { type: 'date', required: false }
  },
  computedFields: {
    order: { 
      type: 'number', 
      resolve: (doc) => {
        const filename = doc._raw.sourceFileName;
        const match = filename.match(/^(\d+)-/);
        return match ? parseInt(match[1], 10) : 999;
      }
    },
    cta: { type: 'string', resolve: (doc) => doc.ctaLabel || '' },
    image: { type: 'string', resolve: (doc) => doc.media?.src || '' },
    slug: { type: 'string', resolve: (d) => `/sections/${d._raw.flattenedPath}` }
  }
}))

export const NewsItem = defineDocumentType(() => ({
  name: 'NewsItem',
  filePathPattern: `news/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    source: { type: 'string', required: false }
  },
  computedFields: {
    slug: { type: 'string', resolve: (d: any) => `/news/${d._raw.flattenedPath}` }
  }
}))

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Bio, Section, NewsItem],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  }
})
