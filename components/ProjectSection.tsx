"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectSummary } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectSection({ project }: { project: ProjectSummary }) {
  const { slug, meta, hasBody } = project;
  const reduced = useReducedMotion();

  const viewport = { once: true, amount: 0.25 } as const;

  return (
    <section className="snap-start h-screen min-h-[700px] flex items-center justify-center px-6 lg:px-24 border-t border-border">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-center w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: EASE }}
          className="aspect-square w-full max-w-[max(50vh,400px)] lg:max-w-[600px] mx-auto overflow-hidden"
          style={
            meta.cover
              ? {
                  backgroundImage: `url(${meta.cover})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : undefined
          }
          aria-hidden={meta.cover ? undefined : true}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="flex flex-col gap-4 w-full max-w-[max(50vh,400px)] lg:max-w-[600px] mx-auto"
        >
          {(
            [
              <span
                key="tech"
                className="text-micro text-muted uppercase tracking-widest"
              >
                {meta.tech}
              </span>,
              <h2 key="title" className="text-h1">
                {meta.title}
              </h2>,
              <p key="summary" className="text-body text-muted max-w-prose">
                {meta.summary}
              </p>,
              hasBody ? (
                <Link
                  key="link"
                  href={`/work/${slug}`}
                  className="text-small text-muted hover:text-fg transition-colors w-fit"
                >
                  Read more &rarr;
                </Link>
              ) : (
                <span key="link" className="text-small text-muted w-fit">
                  Coming Soon
                </span>
              ),
            ] as const
          ).map((node, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: reduced ? 0 : 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
            >
              {node}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
