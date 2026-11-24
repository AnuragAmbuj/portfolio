import Link from "next/link";
import { ArrowRight, Calendar, Mail } from "lucide-react";
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
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-1">
              Writing
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Recent Articles
            </h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Notes on software engineering and systems architecture.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline self-start md:self-end"
          >
            <span>All Articles</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 font-mono">
                    <Calendar size={12} className="text-primary" />
                    <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt || "Read article"}
                  </p>
                </div>

                <div className="pt-1 mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                  <span>Read</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground">
              Have a question or want to discuss systems architecture?
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 hover:text-primary-foreground active:scale-[0.98] transition-all self-start sm:self-auto shrink-0"
          >
            <Mail size={15} />
            <span>Send Message</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
