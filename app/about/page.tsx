import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import { ABOUT_SECTIONS, type AboutSection } from "@/content/about/sections";
import { readCameraSpecs } from "@/lib/exif";
import { FadeIn, FadeInOnMount } from "@/components/Motion";

const bodyComponents: Components = {
  p: ({ children }) => <p className="text-body text-muted">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-fg hover:opacity-80"
    >
      {children}
    </a>
  ),
};

async function Photo({ section }: { section: AboutSection }) {
  const camera = await readCameraSpecs(section.photo);
  return (
    <FadeIn y={16} className="w-full max-w-[400px]">
      <div className="group relative w-full aspect-[400/550] bg-border rounded-2xl shadow-[0_30px_55px_-18px_rgba(0,0,0,0.3),0_14px_25px_-10px_rgba(0,0,0,0.2),0_6px_10px_-4px_rgba(0,0,0,0.13)] ring-1 ring-black/5 overflow-hidden">
        <Image
          src={section.photo}
          alt={section.heading}
          fill
          sizes="400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-sm font-thin drop-shadow">
            {section.location}
          </span>
          {camera && (
            <div className="flex flex-col items-end text-white text-sm font-thin text-right drop-shadow leading-tight">
              {camera.model && <span>{camera.model}</span>}
              {camera.details && <span>{camera.details}</span>}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function Text({
  section,
  uppercase,
}: {
  section: AboutSection;
  uppercase?: boolean;
}) {
  return (
    <FadeIn y={16} className="w-full max-w-[400px]">
      <div className="flex flex-col w-full px-5 gap-8">
        <h2
          className={uppercase ? "text-h1 uppercase tracking-widest" : "text-h2"}
        >
          {section.heading}
        </h2>
        <ReactMarkdown components={bodyComponents}>{section.body}</ReactMarkdown>
      </div>
    </FadeIn>
  );
}

function Closing() {
  return (
    <FadeIn y={16} className="w-full max-w-[400px]">
      <div className="mt-10 flex flex-col items-center text-center w-full px-5 gap-3">
        <p className="text-body font-semibold text-fg">Thanks for stopping by!</p>
        <Image src="/logo.svg" alt="" width={56} height={56} aria-hidden="true" />
        <p className="text-body font-light text-subtle max-w-[260px]">
          {"If you're wondering, the logo is my initials shaped together like the foot of a penguin!"}
        </p>
      </div>
    </FadeIn>
  );
}

export default function AboutPage() {
  return (
    <FadeInOnMount as="div" duration={0.6} y={0}>
      <main className="px-6 lg:px-24 pt-32 pb-20 max-w-6xl mx-auto">
        <div className="lg:hidden flex flex-col items-center gap-20">
          {ABOUT_SECTIONS.flatMap((section, i) => [
            <Text key={`t-${i}`} section={section} uppercase={i === 0} />,
            <Photo key={`p-${i}`} section={section} />,
          ])}
          <Closing />
        </div>

        <div className="hidden lg:flex lg:gap-x-16">
          <div className="flex-1 flex flex-col gap-20">
            {ABOUT_SECTIONS.map((section, i) =>
              i % 2 === 0 ? (
                <Photo key={i} section={section} />
              ) : (
                <Text key={i} section={section} />
              ),
            )}
            <Closing />
          </div>

          <div className="flex-1 flex flex-col gap-20 mt-[60px]">
            {ABOUT_SECTIONS.map((section, i) =>
              i % 2 === 0 ? (
                <Text key={i} section={section} uppercase={i === 0} />
              ) : (
                <Photo key={i} section={section} />
              ),
            )}
          </div>
        </div>
      </main>
    </FadeInOnMount>
  );
}
