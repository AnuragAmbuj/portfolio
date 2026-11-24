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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Concrete Logo Mark & Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group py-1 text-foreground"
          aria-label="Anurag Ambuj - Home"
        >
          {/* Architectural systems isometric prism */}
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
          <span className="font-semibold text-sm sm:text-base tracking-tight text-foreground transition-colors">
            Anurag Ambuj
          </span>
        </Link>

        {/* Mature Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative py-1 text-sm transition-colors duration-150",
                  active
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
          <div className="pl-2 border-l border-border/50">
            <ThemeToggle className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors" />
          </div>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors" />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-14 sm:top-16 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-xs md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 bg-background/98 backdrop-blur-xl border-b border-border px-4 py-3 md:hidden">
            <nav className="flex flex-col space-y-1 max-w-4xl mx-auto">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                      active
                        ? "text-foreground font-semibold bg-muted/50"
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
    </header>
  );
}
