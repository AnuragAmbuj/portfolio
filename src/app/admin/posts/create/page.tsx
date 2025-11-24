import PostForm from "@/components/admin/PostForm";
import { createPost } from "@/lib/actions";
import styles from "../AdminPosts.module.css";

export default function CreatePostPage() {
    return (
        <div>
            <h1 className={styles.title}>Create New Post</h1>
            <PostForm action={createPost} />
        </div>
    );
}
