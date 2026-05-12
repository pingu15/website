export const NAME = "Max Sun";

export const LANDING_DESCRIPTION =
  "Studying Computer Science and Finance at the University of Waterloo.";

export const RESUME_PDF = "/resume.pdf";

export type SocialIcon = "github" | "linkedin" | "email" | "x" | "instagram";

export const SOCIALS: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "GitHub", href: "https://github.com/pingu15", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/pingu15", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/max_sun15", icon: "instagram" },
  { label: "X", href: "https://x.com/squarepingu", icon: "x" },
  { label: "Email", href: "mailto:max.sun@uwaterloo.ca", icon: "email" },
];

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  // { label: "Resume", href: "/resume" },
];

export const PORTRAIT = "/photos/penguin.jpeg";
