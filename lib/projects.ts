import { promises as fs } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

export type ProjectLink = { label: string; href: string };

export type ProjectMeta = {
  title: string;
  summary: string;
  tech: string;
  order: number;
  cover?: string;
  year?: string;
  status?: string;
  collaborators?: string[];
  links?: ProjectLink[];
};

export type ProjectSummary = { slug: string; meta: ProjectMeta; hasBody: boolean };
export type Project = ProjectSummary & { body: string };

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function readMeta(slug: string): Promise<ProjectMeta> {
  const raw = await fs.readFile(path.join(PROJECTS_DIR, slug, "meta.json"), "utf8");
  return JSON.parse(raw) as ProjectMeta;
}

async function hasBody(slug: string): Promise<boolean> {
  try {
    await fs.access(path.join(PROJECTS_DIR, slug, "project.md"));
    return true;
  } catch {
    return false;
  }
}

export async function listProjects(): Promise<ProjectSummary[]> {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const projects = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      meta: await readMeta(slug),
      hasBody: await hasBody(slug),
    })),
  );
  return projects.sort((a, b) => a.meta.order - b.meta.order);
}

function rewriteAssetPaths(body: string, slug: string): string {
  return body.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g,
    (_m, alt, url, title = "") => {
      if (/^(https?:|data:|\/)/.test(url)) return `![${alt}](${url}${title})`;
      const cleaned = url.replace(/^\.\//, "");
      return `![${alt}](/work/${slug}/${cleaned}${title})`;
    },
  );
}

export async function getProject(slug: string): Promise<Project> {
  try {
    const [meta, rawBody] = await Promise.all([
      readMeta(slug),
      fs.readFile(path.join(PROJECTS_DIR, slug, "project.md"), "utf8"),
    ]);
    return { slug, meta, body: rewriteAssetPaths(rawBody, slug), hasBody: true };
  } catch {
    notFound();
  }
}

export async function listProjectSlugs(): Promise<string[]> {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const withBody = await Promise.all(slugs.map(async (s) => ((await hasBody(s)) ? s : null)));
  return withBody.filter((s): s is string => s !== null);
}
