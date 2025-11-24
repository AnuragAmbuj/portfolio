import Link from "next/link";
import { prisma } from "@/lib/db";
import { deletePost } from "@/lib/actions";
import styles from "./AdminPosts.module.css";

export default async function AdminPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: true },
    });

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Posts</h1>
                <Link href="/admin/posts/create" className={styles.createBtn}>
                    New Post
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>
                                <span className={post.published ? styles.published : styles.draft}>
                                    {post.published ? "Published" : "Draft"}
                                </span>
                            </td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td className={styles.actions}>
                                <Link href={`/admin/posts/${post.id}/edit`} className={styles.editBtn}>
                                    Edit
                                </Link>
                                <form action={deletePost.bind(null, post.id)}>
                                    <button className={styles.deleteBtn}>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
