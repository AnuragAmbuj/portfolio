import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { incrementView } from "@/lib/actions";
import MDXContent from "@/components/mdx/MDXContent";
import ShareButtons from "@/components/blog/ShareButtons";
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

    return (
        <article className={`container ${styles.container}`}>
            <header className={styles.header}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                    <span className={styles.date}>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </header>
            <div className={styles.content}>
                <MDXContent source={post.content} />
            </div>

            <ShareButtons title={post.title} />
        </article>
    );
}
