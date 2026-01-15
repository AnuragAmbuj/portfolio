"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./PostForm.module.css";
import MdxEditor from "./MdxEditor";

export default function PostForm({
    action,
    post,
}: Readonly<{
    post?: {
        id: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        imageUrl: string | null;
        published: boolean;
        authorName: string;
    };
    action: (formData: FormData) => Promise<void>;
}>) {
    const [content, setContent] = useState(post?.content || "");

    return (
        <form action={action} className={styles.form}>
            {post && <input type="hidden" name="id" value={post.id} />}

            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={post?.title}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="slug">Slug</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    defaultValue={post?.slug}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                    id="excerpt"
                    name="excerpt"
                    defaultValue={post?.excerpt || ""}
                    rows={3}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="imageUrl">Cover Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={post?.imageUrl || ""}
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="authorName">Author</label>
                <select
                    id="authorName"
                    name="authorName"
                    defaultValue={post?.authorName ?? "Anurag Ambuj"}
                >
                    <option value="Anurag Ambuj">Anurag Ambuj</option>
                    <option value="Shubham">Shubham</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content">Content</label>
                {/* Hidden input for form submission */}
                <input type="hidden" name="content" value={content} />
                <MdxEditor value={content} onChange={setContent} />
            </div>

            <div className={styles.checkboxGroup}>
                <input
                    type="checkbox"
                    id="published"
                    name="published"
                    defaultChecked={post?.published}
                />
                <label htmlFor="published">Published</label>
            </div>

            <button type="submit" className={styles.submitBtn}>
                Save Post
            </button>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className={styles.button} disabled={pending}>
            {pending ? "Saving..." : "Save Post"}
        </button>
    );
}
