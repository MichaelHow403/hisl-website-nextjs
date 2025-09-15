// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Bio = defineDocumentType(() => ({
  name: "Bio",
  filePathPattern: `bios/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    updated: { type: "date", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/about#${doc.slug}` }
  }
}));
var Section = defineDocumentType(() => ({
  name: "Section",
  filePathPattern: `sections/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    kicker: { type: "string", required: false },
    ctaLabel: { type: "string", required: false },
    ctaHref: { type: "string", required: false },
    media: {
      type: "json",
      required: false
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Bio, Section]
});
export {
  Bio,
  Section,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KNIHPKSY.mjs.map
