import Link from "next/link";
import { prisma } from "@/lib/db";
import styles from "../posts/AdminPosts.module.css"; // Reuse styles

export default async function AdminProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Projects</h1>
                <Link href="/admin/projects/create" className={styles.createBtn}>
                    New Project
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Featured</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>{project.featured ? "Yes" : "No"}</td>
                            <td>{project.order}</td>
                            <td className={styles.actions}>
                                <button className={styles.deleteBtn}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
