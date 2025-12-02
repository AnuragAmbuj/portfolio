import { prisma } from "@/lib/db";
import BlogCard from "@/components/features/BlogCard";

export const metadata = {
    title: "Blog | Portfolio",
    description: "Thoughts on software engineering and design.",
};

export default async function BlogIndex() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Thoughts, tutorials, and insights on software engineering and design.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
