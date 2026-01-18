import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "./MDXComponents";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkMermaid } from "@/lib/remark-mermaid";

const options = {
    theme: "github-dark",
    keepBackground: true,
};

export default function MDXContent({ source }: { source: string }) {
    return (
        <div className="prose dark:prose-invert max-w-none" suppressHydrationWarning>
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMermaid],
                        rehypePlugins: [[rehypePrettyCode, options]],
                    },
                }}
            />
        </div>
    );
}
