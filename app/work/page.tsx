import { listProjects } from "@/lib/projects";
import { ProjectSection } from "@/components/ProjectSection";
import { SocialLinks } from "@/components/SocialLinks";
import { FadeInOnMount } from "@/components/Motion";
import { NAME, LANDING_DESCRIPTION, PORTRAIT } from "@/lib/constants";

export default async function WorkPage() {
  const projects = await listProjects();

  return (
    <main className="work-snap">
      <section className="snap-start h-screen min-h-[700px] flex items-center justify-center px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 mx-auto">
          <FadeInOnMount
            y={0}
            duration={0.9}
            className="aspect-square shrink-0 bg-border w-full max-w-[400px] lg:w-[400px]"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${PORTRAIT})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label={`${NAME} portrait`}
            />
          </FadeInOnMount>
          <FadeInOnMount
            delay={0.2}
            className="flex flex-col justify-center gap-3 w-full max-w-[400px] lg:w-[400px] lg:h-[400px] shrink-0"
          >
            <p className="text-body text-fg">{NAME}</p>
            <p className="text-body font-light text-subtle">{LANDING_DESCRIPTION}</p>
          </FadeInOnMount>
        </div>
        <FadeInOnMount
          delay={0.4}
          y={0}
          as="div"
          className="hidden lg:block fixed right-10 top-1/2 -translate-y-1/2 z-10"
        >
          <SocialLinks />
        </FadeInOnMount>
        <FadeInOnMount
          delay={0.4}
          y={0}
          className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <SocialLinks orientation="horizontal" />
        </FadeInOnMount>
      </section>

      {projects.map((p) => (
        <ProjectSection key={p.slug} project={p} />
      ))}
    </main>
  );
}
