import Link from "next/link";
import { prisma } from "@/lib/db";
import styles from "./Blog.module.css";

export const metadata = {
    title: "Blog | Portfolio",
    description: "Thoughts on software engineering and design.",
};

export default async function BlogIndex() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Blog</h1>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <article key={post.id} className={styles.card}>
                        <Link href={`/blog/${post.slug}`} className={styles.link}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <span className={styles.date}>
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
