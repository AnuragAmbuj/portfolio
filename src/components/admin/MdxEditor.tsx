"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // Import highlight.js theme
import styles from "./MdxEditor.module.css";

interface MdxEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MdxEditor({ value, onChange }: MdxEditorProps) {
    return (
        <div className={styles.container}>
            <div className={styles.editorWrapper}>
                {/* Input Area */}
                <TextareaAutosize
                    className={styles.inputArea}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    minRows={20}
                    placeholder="Write your post in MDX..."
                />

                {/* Preview Area */}
                <div className={`${styles.previewArea} glass`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {value || "*Preview will appear here...*"}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
