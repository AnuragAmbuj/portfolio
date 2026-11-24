"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal as TerminalIcon, Sparkles, BookOpen } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

const CODE_SNIPPETS = {
  "domain.go": `// Scalable Domain Event Bus in Go
type EventDispatcher struct {
    subscribers map[EventType][]Subscriber
    queue       chan Event
}

func (d *EventDispatcher) Publish(ctx context.Context, e Event) error {
    select {
    case d.queue <- e:
        metrics.RecordEventLatency(e.Type(), time.Since(e.Timestamp()))
        return nil
    case <-ctx.Done():
        return ctx.Err()
    default:
        return ErrBackpressureBufferFull
    }
}`,
  "system.rs": `// High-Throughput Memory-Mapped Pipeline
pub struct LockFreeRingBuffer<T: Send + Sync> {
    buffer: Arc<[AtomicPtr<T>]>,
    capacity: usize,
    head: AtomicUsize,
    tail: AtomicUsize,
}

impl<T: Send + Sync> LockFreeRingBuffer<T> {
    #[inline(always)]
    pub fn push(&self, item: T) -> Result<(), BufferError> {
        // Zero-copy CAS loop for sub-microsecond latency
        self.atomic_enqueue(Box::into_raw(Box::new(item)))
    }
}`,
  "stats.json": `{
  "engineer": "Anurag Ambuj",
  "experience": "10+ years",
  "focus": [
    "Domain-Driven Architectures",
    "Distributed Streaming & Storage",
    "High-Throughput Payments & Dispatch"
  ],
  "primary_languages": ["Java", "Go", "Rust", "Zig"],
  "status": "Engineering Expert @ Applied Materials"
}`,
};

type SnippetKey = keyof typeof CODE_SNIPPETS;

export default function HeroModern() {
  const [activeTab, setActiveTab] = useState<SnippetKey>("domain.go");

  return (
    <section className="relative pt-6 pb-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Narrative & Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Staff & Expert Systems Architect • 10 Years</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Anurag <span className="text-gradient">Ambuj</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-foreground/80">
                Architecting robust distributed systems in{" "}
                <span className="text-primary font-semibold">Java, Go, Rust &amp; Zig</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Close to a decade of leadership in engineering distributed backends,
              high-throughput payment pipelines, and real-time fleet engines. Focused on
              domain-driven design, fault tolerance, and sub-millisecond reliability at scale.
            </p>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 max-w-lg border-y border-border py-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">10+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">6+</div>
                <div className="text-xs text-muted-foreground">Scale Platforms</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">Core</div>
                <div className="text-xs text-muted-foreground">Low-Latency Tech</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 shadow-md shadow-primary/20 transition-all hover:translate-y-[-2px]"
              >
                <span>Selected Systems</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-muted/50 transition-all"
              >
                <BookOpen size={16} className="text-primary" />
                <span>Read Articles</span>
              </Link>

              <div className="flex items-center gap-3 pl-2">
                <Link
                  href="https://github.com/AnuragAmbuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/anuragambuj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-card border border-border text-foreground/70 hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Engineering Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-[#1A1A1A] text-slate-100 border border-border/60 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="ml-2 text-xs text-slate-400 font-sans flex items-center gap-1.5">
                    <TerminalIcon size={12} className="text-primary" />
                    systems-core
                  </span>
                </div>
                
                {/* Code Snippet Tabs */}
                <div className="flex items-center gap-1">
                  {(["domain.go", "system.rs", "stats.json"] as SnippetKey[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded text-xs transition-all ${
                        activeTab === tab
                          ? "bg-primary text-black font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 sm:p-5 overflow-x-auto min-h-[300px] max-h-[360px] leading-relaxed select-text bg-[#1A1A1A]">
                <pre className="text-slate-200 font-mono">
                  <code>{CODE_SNIPPETS[activeTab]}</code>
                </pre>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="px-4 py-2 bg-[#141414] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 select-none">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={11} className="text-primary" />
                  UTF-8 • Latency: &lt;1ms
                </span>
                <span className="text-primary">Ready</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
