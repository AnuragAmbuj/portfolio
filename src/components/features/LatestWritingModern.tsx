import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Mail } from "lucide-react";
import { prisma } from "@/lib/db";
import { format } from "date-fns";

export default async function LatestWritingModern() {
  let posts: Array<{
    id: string;
    title: string;
    excerpt: string | null;
    slug: string;
    createdAt: Date;
  }> = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching latest posts for homepage:", error);
  }

  return (
    <section className="py-20 border-t border-border/60">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
              Writing &amp; Perspectives
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Engineering Insights
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-base">
              Articles and deep dives on software architecture, low-latency runtimes, and distributed patterns.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline self-start md:self-end"
          >
            <span>View All Articles</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar size={12} className="text-primary" />
                    <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt || "Click to read this in-depth engineering article."}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-border/40 flex items-center gap-1 text-xs font-semibold text-primary">
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-card border border-border text-center mb-16">
            <BookOpen size={32} className="mx-auto text-primary mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">New Articles Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Currently documenting architectural learnings in distributed Go, Zig runtimes, and memory concurrency.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
            >
              <span>Visit Blog Directory</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Closing Connect CTA Card */}
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card via-card to-primary/10 border border-border text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Have a complex systems challenge?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Open to high-impact technical advisory, distributed systems design discussions, and engineering collaboration.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 shadow-md shadow-primary/25 transition-all"
            >
              <Mail size={16} />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
