import type { Project } from "contentlayer/generated";
import AnimatedLink from "@/components/AnimatedLink";

interface ProjectsListProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsList({ projects, locale }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {locale === "id" ? "Tidak ada proyek yang ditemukan." : "No projects found."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <AnimatedLink
          key={project.url}
          href={project.url}
          className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex flex-col rounded-lg border transition-all hover:shadow-sm"
        >
          <div className="p-6">
            <h3 className="text-foreground font-serif font-medium text-lg mb-2 group-hover:text-primary">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {project.summary ?? project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(project.category) ? (
                project.category.map((cat: string) => (
                  <span
                    key={cat}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {cat}
                  </span>
                ))
              ) : null}
            </div>

            <div className="text-muted-foreground font-mono text-xs">
              {new Date(project.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </AnimatedLink>
      ))}
    </div>
  );
}
