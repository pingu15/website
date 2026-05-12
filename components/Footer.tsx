import { FadeIn } from "@/components/Motion";
import { NAME, SOCIALS } from "@/lib/constants";

export function Footer() {
  return (
    <FadeIn y={8} amount={0.4}>
      <footer className="snap-end border-t border-border px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-small text-muted">
          &copy; {new Date().getFullYear()} {NAME}
        </p>
        <ul className="flex flex-row gap-5 text-small">
          {SOCIALS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-fg transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </FadeIn>
  );
}
