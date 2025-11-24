import { prisma } from "@/lib/db";
import styles from "./AdminDashboard.module.css";

export default async function AdminDashboard() {
    const postsCount = await prisma.post.count();
    const projectsCount = await prisma.project.count();
    const viewsCount = await prisma.analytics.aggregate({
        _sum: { views: true },
    });

    return (
        <div>
            <h1 className={styles.title}>Dashboard</h1>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3>Total Posts</h3>
                    <p className={styles.number}>{postsCount}</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Projects</h3>
                    <p className={styles.number}>{projectsCount}</p>
                </div>
                <div className={styles.card}>
                    <h3>Total Views</h3>
                    <p className={styles.number}>{viewsCount._sum.views || 0}</p>
                </div>
            </div>
        </div>
    );
}
