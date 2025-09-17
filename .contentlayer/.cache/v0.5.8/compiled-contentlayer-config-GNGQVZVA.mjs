var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Bio = defineDocumentType(() => ({
  name: "Bio",
  filePathPattern: `bios/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    role: { type: "string", required: false },
    headshotKey: { type: "string", required: false }
  },
  computedFields: {
    slug: { type: "string", resolve: (d) => `/about/${d._raw.flattenedPath}` }
  }
}));
var Section = defineDocumentType(() => ({
  name: "Section",
  filePathPattern: `sections/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    order: { type: "number", required: true }
  },
  computedFields: {
    slug: { type: "string", resolve: (d) => `/sections/${d._raw.flattenedPath}` }
  }
}));
var NewsItem = defineDocumentType(() => ({
  name: "NewsItem",
  filePathPattern: `news/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    source: { type: "string", required: false }
  },
  computedFields: {
    slug: { type: "string", resolve: (d) => `/news/${d._raw.flattenedPath}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Bio, Section, NewsItem],
  mdx: {
    remarkPlugins: [__require("remark-gfm")],
    rehypePlugins: [__require("rehype-slug")]
  }
});
export {
  Bio,
  NewsItem,
  Section,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GNGQVZVA.mjs.map
