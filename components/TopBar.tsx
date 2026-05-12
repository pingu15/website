"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: reduced ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="sm:hidden fixed inset-0 bg-bg flex flex-col items-center justify-center gap-10 z-40"
          >
            {NAV.map((item, i) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-h2 transition-colors ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-50 flex items-center justify-between px-6 lg:px-10 h-16">
        <Link href="/work" aria-label="Home" className="flex items-center">
          <motion.div
            whileHover={reduced ? undefined : { rotate: -8, scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={28}
              height={28}
              priority
              aria-hidden="true"
            />
          </motion.div>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV.map((item, i) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: reduced ? 0 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.06 }}
              >
                <Link
                  href={item.href}
                  className={`text-small transition-colors ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex items-center justify-center w-8 h-8 text-fg"
        >
          <Image
            src={open ? "/close.svg" : "/menu.svg"}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.header>
  );
}
