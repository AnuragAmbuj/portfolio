"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GiscusComments() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold mb-8 text-slate-800 dark:text-slate-200">
                Join the Discussion
            </h2>
            <Giscus
                id="comments"
                repo="AnuragAmbuj/BlogPostDiscussions"
                repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
                category="General"
                categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
                mapping="pathname"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                lang="en"
                loading="lazy"
            />
        </section>
    );
}
