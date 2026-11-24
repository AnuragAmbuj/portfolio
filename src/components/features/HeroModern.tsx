"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

export default function HeroModern() {
  return (
    <section className="relative pt-10 pb-16 md:pt-20 md:pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted border border-border text-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Software Engineering Expert</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Anurag <span className="text-gradient">Ambuj</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/85 font-medium">
              Distributed systems and backend engineering in{" "}
              <span className="text-primary font-semibold">Java, Go, Rust &amp; Zig</span>.
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Over a decade of experience designing and scaling backend platforms across semiconductor
            manufacturing, EV mobility, and fintech. Focused on domain-driven design,
            event-driven architectures, and low-latency systems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 hover:text-primary-foreground active:scale-[0.98] transition-all"
            >
              <span>View Projects</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:bg-muted/50 hover:text-foreground active:scale-[0.98] transition-all"
            >
              <span>Read Blog</span>
            </Link>

            <div className="flex items-center gap-2 pl-2">
              <Link
                href="https://github.com/AnuragAmbuj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anuragambuj/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card border border-border text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
