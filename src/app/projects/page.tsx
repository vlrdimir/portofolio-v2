import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      name: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my projects and skills. Built with modern web technologies and best practices.",
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      name: "Automation Bot",
      description:
        "An automation bot for blockchain airdrop tasks. Streamlines repetitive tasks and improves efficiency.",
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      name: "Game Development",
      description:
        "A game development project exploring game mechanics and player interactions. Built with Unity and C#.",
      github: "https://github.com",
      external: "https://example.com",
    },
  ];

  return (
    <section>
      <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
        Projects<span className="text-red-500">.</span>
      </h1>

      <p className="mb-12 leading-relaxed text-neutral-800">
        Here are some of my recent projects. Each project represents a learning
        journey and a step forward in my development skills.
      </p>

      <div className="space-y-10">
        {projects.map((project, index) => (
          <div key={index} className="space-y-4">
            <Link
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
            >
              {project.name}
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <p className="leading-relaxed text-neutral-800">
              {project.description}
            </p>

            <div className="flex items-center gap-3">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
              <span className="text-neutral-300">•</span>
              <Link
                href={project.external}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <ExternalLink className="h-4 w-4" />
                <span>External</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
