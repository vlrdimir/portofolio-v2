import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { allProjects, type Project } from "contentlayer/generated";

// Type assertion untuk contentlayer generated types
const projectsList = allProjects as unknown as Project[];

export default function Projects() {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale();
  const projects = projectsList.filter((p) => p.locale === locale);

  return (
    <section>
      <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
        {t("title")}
        <span className="text-red-500">.</span>
      </h1>

      <p className="mb-12 leading-relaxed text-neutral-800">
        {t("description")}
      </p>

      <div className="space-y-10">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group border-border/50 hover:border-primary/40 hover:bg-secondary-hover/50 space-y-4 rounded-lg border bg-orange-100/15 p-6 transition-all hover:shadow-sm"
          >
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
            >
              {project.title}
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <p className="leading-relaxed text-neutral-800">
              {project.description}
            </p>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  <Github className="h-4 w-4" />
                  <span>{t("githubLabel")}</span>
                </Link>
              )}

              {project.githubUrl && project.demoUrl && (
                <span className="text-neutral-300">•</span>
              )}

              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t("externalLabel")}</span>
                </Link>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-neutral-500 italic">No projects found.</p>
        )}
      </div>
    </section>
  );
}
