import { MDXLayoutRenderer } from "pliny/mdx-components";
import React from "react";

export const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-8 mb-4 text-2xl font-bold text-neutral-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-bold text-neutral-900" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-neutral-800" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-neutral-800" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 list-decimal space-y-2 pl-5 text-neutral-800"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 border-l-4 border-orange-200 bg-orange-50/50 py-2 pr-4 pl-4 text-neutral-700 italic"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-neutral-900 underline decoration-neutral-400 decoration-2 underline-offset-2 transition-colors hover:decoration-neutral-900"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-orange-100/50 px-1.5 py-0.5 font-mono text-sm text-neutral-900"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-neutral-50"
      {...props}
    />
  ),
};

export function CustomMDX({ code }: { code: string }) {
  return <MDXLayoutRenderer code={code} components={components} />;
}
