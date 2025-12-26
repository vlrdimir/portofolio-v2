"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Project } from "contentlayer/generated";

interface CategoryFilterProps {
  projects: Project[];
  locale: string;
}

export default function CategoryFilter({
  projects,
  locale,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  // Get all unique categories
  const allCategories = Array.from(
    new Set(
      projects.flatMap((project) => (project.categorySlugs as string[]) ?? []),
    ),
  );

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <Link
        href={`/${locale}/projects`}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          !currentCategory
            ? "bg-primary text-primary-foreground"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {locale === "id" ? "Semua" : "All"}
      </Link>
      {allCategories.map((category) => (
        <Link
          key={category}
          href={`/${locale}/projects?category=${category}`}
          className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${
            currentCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
