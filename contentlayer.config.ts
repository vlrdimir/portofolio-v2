import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkImgToJsx } from "pliny/mdx-plugins/remark-img-to-jsx.js";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the project",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the project",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the project",
      required: true,
    },
    category: {
      type: "json",
      description: "The categories of the project",
      required: true,
    },
    summary: {
      type: "string",
      description: "The summary of the project",
      required: false,
    },
    readTime: {
      type: "string",
      description: "The estimated read time",
      required: false,
    },
    author: {
      type: "string",
      description: "The author of the project",
      required: false,
    },
    image: {
      type: "string",
      description: "Image URL for project thumbnail",
      required: false,
    },
    githubUrl: {
      type: "string",
      description: "GitHub URL",
      required: false,
    },
    demoUrl: {
      type: "string",
      description: "Demo URL",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => {
        const locale = doc._raw.flattenedPath.includes("/id/") ? "id" : "en";
        const pathMatch = doc._raw.flattenedPath.match(new RegExp(`(?:en|id)/(.+)`));
        const slug = pathMatch ? pathMatch[1] : doc._raw.flattenedPath;
        return `/${locale}/projects/${slug}`;
      },
    },
    slug: {
      type: "string",
      resolve: (doc) => {
        const pathMatch = doc._raw.flattenedPath.match(new RegExp(`(?:en|id)/(.+)`));
        return pathMatch ? pathMatch[1] : doc._raw.flattenedPath;
      },
    },
    locale: {
      type: "string",
      resolve: (doc) => {
        return doc._raw.flattenedPath.includes("/id/") ? "id" : "en";
      },
    },
    categorySlugs: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => {
        const categoryList = doc.category?._array ?? doc.category;
        if (Array.isArray(categoryList)) {
          return categoryList.map((cat: string) => slugify(cat));
        }
        console.warn(
          `Category is not an array in ${doc._raw.flattenedPath}:`,
          doc.category,
        );
        return [];
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
