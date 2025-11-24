import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import PostForm from "@/components/admin/PostForm";
import { updatePost } from "@/lib/actions";
import styles from "../../AdminPosts.module.css";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) notFound();

    const updateAction = updatePost.bind(null, post.id);

    return (
        <div>
            <h1 className={styles.title}>Edit Post</h1>
            <PostForm action={updateAction} post={post} />
        </div>
    );
}
