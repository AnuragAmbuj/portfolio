"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5 sm:pt-5 pointer-events-none">
      <nav
        className={clsx(
          "pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-6 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full",
          "bg-card/85 dark:bg-card/90 backdrop-blur-md border border-border/80 transition-all duration-300",
          "w-auto max-w-[94vw] sm:max-w-fit shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.35)]",
          scrolled && "border-border shadow-md bg-card/95 dark:bg-card/95"
        )}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 py-0.5 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            AA
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
            Anurag Ambuj
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 pl-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pl-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground hover:bg-muted/70 transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-[2px] md:hidden pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-50 p-2 rounded-2xl bg-card/95 dark:bg-card/95 backdrop-blur-xl border border-border shadow-xl md:hidden">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      <span>{link.name}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
