import Link from "next/link";
import { Markdown, extractH2s } from "@/components/Markdown";
import { FadeInOnMount } from "@/components/Motion";
import { getProject, listProjectSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await listProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

function splitAtFirstH2(md: string): [string, string] {
  const lines = md.split("\n");
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("```")) inFence = !inFence;
    if (!inFence && /^##\s+/.test(lines[i])) {
      return [lines.slice(0, i).join("\n"), lines.slice(i).join("\n")];
    }
  }
  return [md, ""];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  const [head, rest] = splitAtFirstH2(project.body);
  const toc = extractH2s(project.body);

  return (
    <main className="editorial">
      <article>
        <FadeInOnMount duration={0.6}>
          <Link href="/work" className="eyebrow">
            ← Work
          </Link>
        </FadeInOnMount>
        <FadeInOnMount delay={0.1} duration={0.7}>
          <Markdown>{head}</Markdown>
        </FadeInOnMount>
        {project.meta.links && project.meta.links.length > 0 ? (
          <FadeInOnMount delay={0.2} duration={0.6}>
            <ul className="project-links" aria-label="Project links">
              {project.meta.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </FadeInOnMount>
        ) : null}
        {toc.length > 0 ? (
          <FadeInOnMount delay={0.25} duration={0.6}>
            <nav className="toc" aria-label="Sections">
              {toc.map((h) => (
                <a key={h.id} href={`#${h.id}`}>
                  {h.text}
                </a>
              ))}
            </nav>
          </FadeInOnMount>
        ) : null}
        {rest ? (
          <FadeInOnMount delay={0.35} duration={0.7} className="editorial-rest">
            <Markdown>{rest}</Markdown>
          </FadeInOnMount>
        ) : null}
        <FadeInOnMount delay={0.45} duration={0.6} className="end">
          <div aria-hidden>·   ·   ·</div>
        </FadeInOnMount>
      </article>
    </main>
  );
}
