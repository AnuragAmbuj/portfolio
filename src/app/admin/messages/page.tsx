import { prisma } from "@/lib/db";
import styles from "../AdminDashboard.module.css";
import MessageList from "./MessageList";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
    const messages = await prisma.message.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Inbox</h1>
                <p className={styles.subtitle}>
                    {messages.length} {messages.length === 1 ? "message" : "messages"}
                </p>
            </header>

            <MessageList messages={messages} />
        </div>
    );
}
