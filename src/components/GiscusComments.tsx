"use client";

import Giscus from "@giscus/react";

export default function GiscusComments() {
  // You can use next-themes if you have it, or just default to light/dark based on system or preference
  // For now, I'll assume light theme or let Giscus handle it automatically if possible,
  // but usually Giscus needs a specific theme string.
  // Since I don't see next-themes in package.json, I will default to specific theme or "preferred_color_scheme"

  return (
    <div className="mt-16 border-t pt-10">
      <Giscus
        id="comments"
        repo="vlrdimir/portofolio-v2"
        repoId="R_kgDOQcdxAA"
        category="General"
        categoryId="DIC_kwDOQcdxAM4C0QzG"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
