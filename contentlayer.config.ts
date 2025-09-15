import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const Bio = defineDocumentType(() => ({
  name: 'Bio',
  filePathPattern: `bios/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug:  { type: 'string', required: true },
    updated: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/about#${doc.slug}` },
  },
}));

export const Section = defineDocumentType(() => ({
  name: 'Section',
  filePathPattern: `sections/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    kicker: { type: 'string', required: false },
    ctaLabel: { type: 'string', required: false },
    ctaHref: { type: 'string', required: false },
    media: {
      type: 'json',
      required: false,
    }
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Bio, Section],
});
