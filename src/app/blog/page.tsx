import Link from "next/link";
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
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mb-12 md:mb-16 border-b border-border pb-8">
                <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
                    Field notes
                </p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 max-w-3xl">
                    Notes from the engine room
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Field reports on software engineering — systems that shipped, ones that
                    broke, and what they taught me.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Nothing published yet</h2>
                    <p className="text-muted-foreground mb-6">
                        The first essays are being written. Check back soon or head back to
                        the work.
                    </p>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        See selected work
                    </Link>
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
