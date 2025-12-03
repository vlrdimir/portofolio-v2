import { allProjects, type Project } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { CustomMDX } from "@/components/CustomMDX";
import GiscusComments from "@/components/GiscusComments";
import { getTranslations } from "next-intl/server";

// Type assertion untuk contentlayer generated types
const projects = allProjects as unknown as Project[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.locale === locale && p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    locale: project.locale,
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("ProjectsPage");

  const project = projects.find((p) => p.locale === locale && p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href={`/${locale}/projects`}
        className="mb-8 inline-flex items-center text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToProjects")}
      </Link>

      <header className="mb-12">
        <h1 className="mb-6 font-mono text-4xl font-bold text-neutral-900 md:text-5xl">
          {project.title}
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-neutral-800">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 hover:border-primary/40 hover:bg-secondary-hover/50 flex w-full items-center justify-center rounded-lg border bg-orange-100/35 p-6 text-sm font-medium text-neutral-900 transition-all hover:shadow-sm"
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 hover:border-primary/40 hover:bg-secondary-hover/50 flex w-full items-center justify-center rounded-lg border bg-orange-100/35 p-6 text-sm font-medium text-neutral-900 transition-all hover:shadow-sm"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Demo
            </a>
          )}
        </div>
      </header>

      <div className="prose prose-neutral max-w-none">
        <CustomMDX code={project.body.code} />
      </div>

      <GiscusComments />
    </article>
  );
}
