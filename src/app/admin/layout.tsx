import Link from "next/link";
import { signOut } from "@/auth";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>Admin Panel</div>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.link}>Dashboard</Link>
                    <Link href="/admin/posts" className={styles.link}>Posts</Link>
                    <Link href="/admin/projects" className={styles.link}>Projects</Link>
                    <Link href="/admin/messages" className={styles.link}>Messages</Link>
                </nav>
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className={styles.logout}>Sign Out</button>
                </form>
            </aside>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
