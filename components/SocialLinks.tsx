import { SOCIALS, type SocialIcon } from "@/lib/constants";

function Icon({ name }: { name: SocialIcon }) {
  const url = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className="inline-block w-5 h-5 bg-current"
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function SocialLinks({
  orientation = "vertical",
}: {
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <ul
      className={`flex gap-5 ${
        orientation === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      {SOCIALS.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="text-muted hover:text-fg transition-colors block"
          >
            <Icon name={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
