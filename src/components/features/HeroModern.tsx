"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

export default function HeroModern() {
  return (
    <section className="relative pt-14 pb-20 md:pt-28 md:pb-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-8">
          <p className="flex items-center gap-3 text-xs sm:text-sm font-medium tracking-[0.2em] text-primary uppercase">
            <span className="inline-block h-px w-10 bg-primary" aria-hidden="true" />
            The latest release
          </p>

          <div className="space-y-5">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground max-w-3xl">
              Product engineering that speaks plainly and ships reliably
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/85 font-medium">
              Anurag Ambuj — distributed systems and backend engineering in{" "}
              <span className="text-primary font-semibold">Java, Go, Rust &amp; Zig</span>.
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A decade of designing and scaling backend platforms across semiconductor manufacturing,
            EV mobility and fintech — domain-driven design, event-driven architecture and
            low-latency systems, written about in plain language.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>Start exploring</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:bg-muted/50 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>Read the writing</span>
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
