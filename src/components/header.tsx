"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "about", href: "#about" },
  { label: "work", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "stack", href: "#skills" },
  { label: "say hi", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] flex h-11 items-center border-b-2 border-ink bg-paper font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
        <div className="wrap flex w-full items-center gap-4 md:gap-7">
          <div
            className="bg-ink px-3 py-1.5 font-semibold text-paper shadow-riso-pink-xs"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            K · G
          </div>
          <nav className="ml-2 hidden gap-[22px] md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-ink transition-colors hover:text-pink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 md:gap-4">
            <span className="relative text-pink">
              <span className="mr-1.5 inline-block animate-riso-pulse">●</span>
              Open to work
            </span>
            <span className="hidden sm:inline">Mumbai · UTC+05:30</span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="-mr-1 p-1 text-ink md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-paper md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-11 items-center border-b-2 border-ink">
            <div className="wrap flex w-full items-center justify-between">
              <div
                className="bg-ink px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-paper shadow-riso-pink-xs"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                K · G
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-1 text-ink"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <nav className="flex flex-1 flex-col items-start gap-6 px-10 py-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-[48px] font-bold uppercase leading-[0.9] tracking-[-0.025em] text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
