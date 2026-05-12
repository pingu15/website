"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav" | "li" | "span";
};

export function FadeIn({
  children,
  delay = 0,
  y = 12,
  duration = 0.6,
  once = true,
  amount = 0.15,
  className,
  as = "div",
}: FadeInProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <Comp
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function FadeInOnMount({
  children,
  delay = 0,
  y = 8,
  duration = 0.5,
  className,
  as = "div",
}: Omit<FadeInProps, "once" | "amount">) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <Comp
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 10,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: FadeInProps["as"];
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as ?? "div"] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <Comp
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export { motion, AnimatePresence, useReducedMotion };
