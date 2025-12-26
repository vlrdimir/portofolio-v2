import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ProjectMetadata {
  title: string;
  description: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  slug: string;
}

export interface Project {
  metadata: ProjectMetadata;
  content: string;
}

export function getProjectBySlug(locale: string, slug: string): Project | null {
  try {
    const filePath = path.join(
      contentDirectory,
      "projects",
      locale,
      `${slug}.mdx`,
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      metadata: {
        ...data,
        slug,
      } as ProjectMetadata,
      content,
    };
  } catch (error: unknown) {
    console.error(`Error getting project by slug: ${error as string}`);
    return null;
  }
}

export function getAllProjects(locale: string): ProjectMetadata[] {
  try {
    const projectsDirectory = path.join(contentDirectory, "projects", locale);

    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const files = fs.readdirSync(projectsDirectory);

    const projects = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(projectsDirectory, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          ...data,
          slug,
        } as ProjectMetadata;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return projects;
  } catch (error: unknown) {
    console.error(`Error getting all projects: ${error as string}`);
    return [];
  }
}
