import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { incrementView } from "@/lib/actions";
import MDXContent from "@/components/mdx/MDXContent";
import ShareButtons from "@/components/blog/ShareButtons";
import GiscusComments from "@/components/blog/GiscusComments";
import styles from "./BlogPost.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
    });
    if (!post) return {};
    return {
        title: `${post.title} | Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) notFound();

    // Increment view count (non-blocking)
    incrementView(slug).catch((err: unknown) => console.error(err));

    // Calculate approximate reading time
    const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));

    return (
        <article className={styles.container}>
            {/* Top Back Navigation */}
            <Link href="/blog" className={styles.backLink}>
                <ArrowLeft size={16} />
                <span>All Articles</span>
            </Link>

            {/* Article Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>{post.title}</h1>
                
                <div className={styles.metaRow}>
                    <div className={styles.metaItems}>
                        <span className={styles.metaItem}>
                            <User size={14} className="text-primary" />
                            <span>{post.authorName || "Anurag Ambuj"}</span>
                        </span>
                        <span className="text-border">/</span>
                        <span className={styles.metaItem}>
                            <Calendar size={14} className="text-primary" />
                            <span>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </span>
                        <span className="text-border">/</span>
                        <span className={styles.metaItem}>
                            <Clock size={14} className="text-primary" />
                            <span>{readTimeMinutes} min read</span>
                        </span>
                    </div>

                    <ShareButtons title={post.title} />
                </div>
            </header>

            {/* Crisp Body Typography */}
            <div className={styles.content}>
                <MDXContent source={post.content} />
            </div>

            {/* Comments & Discussion */}
            <div className="mt-16 pt-10 border-t border-border">
                <GiscusComments />
            </div>
        </article>
    );
}
