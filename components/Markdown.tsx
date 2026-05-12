import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

function flatten(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => {
      if (typeof c === "string" || typeof c === "number") return String(c);
      if (isValidElement(c)) {
        const props = c.props as { children?: ReactNode };
        return flatten(props.children);
      }
      return "";
    })
    .join("");
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractH2s(md: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  let inFence = false;
  for (const line of md.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (m) out.push({ id: slugify(m[1]), text: m[1] });
  }
  return out;
}

const components: Components = {
  h2: ({ children }) => <h2 id={slugify(flatten(children))}>{children}</h2>,
  p: ({ children }) => {
    const kids = Children.toArray(children).filter(
      (c) => !(typeof c === "string" && !c.trim()),
    );
    if (
      kids.length === 1 &&
      isValidElement(kids[0]) &&
      (kids[0].type === "img" ||
        (kids[0].props as { src?: string })?.src !== undefined)
    ) {
      return <figure>{kids[0]}</figure>;
    }
    return <p>{children}</p>;
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
