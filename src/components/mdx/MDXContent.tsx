import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "./MDXComponents";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
    theme: "github-dark",
    keepBackground: true,
};

export default function MDXContent({ source }: { source: string }) {
    return (
        <div className="prose">
            <MDXRemote
                source={source}
                components={components}
                options={{
                    mdxOptions: {
                        rehypePlugins: [[rehypePrettyCode, options]],
                    },
                }}
            />
        </div>
    );
}
