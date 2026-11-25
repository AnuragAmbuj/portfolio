"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "/#projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Attic", href: "/attic" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/#projects") {
      return pathname === "/projects";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto relative flex items-center justify-between gap-4 sm:gap-6 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card/90 dark:bg-card/95 backdrop-blur-md border border-border/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] w-auto max-w-[94vw] sm:max-w-fit transition-all duration-200"
        aria-label="Main navigation"
      >
        {/* Concrete Architectural Systems Mark & Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 py-0.5 group text-foreground"
          aria-label="Anurag Ambuj - Home"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-4.5 sm:h-4.5"
            >
              <path
                d="M12 2.5L20 7V17L12 21.5L4 17V7L12 2.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <path
                d="M12 2.5V12M12 12L20 7M12 12L4 7M12 12V21.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight text-foreground whitespace-nowrap">
            Anurag Ambuj
          </span>
        </Link>

        {/* Mature Desktop Navigation Links (Restrained, no loud colored pills on hover) */}
        <div className="hidden md:flex items-center gap-5 pl-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative py-1 text-xs sm:text-sm transition-colors duration-150",
                  active
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
          <div className="pl-1">
            <ThemeToggle className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors" />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-[2px] md:hidden pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-50 p-2 rounded-2xl bg-card/95 dark:bg-card/95 backdrop-blur-xl border border-border shadow-xl md:hidden">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors",
                        active
                          ? "text-foreground font-semibold bg-muted/60"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
