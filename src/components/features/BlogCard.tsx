"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
    readonly post: {
        readonly id: string;
        readonly title: string;
        readonly excerpt: string | null;
        readonly slug: string;
        readonly imageUrl: string | null;
        readonly createdAt: Date;
    };
    readonly index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors h-full flex flex-col"
        >
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized={post.imageUrl.includes("pollinations.ai")}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                            <span className="text-4xl font-bold">Blog</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {(() => {
                                try {
                                    const date = new Date(post.createdAt);
                                    return isNaN(date.getTime())
                                        ? "Recent"
                                        : format(date, "MMM d, yyyy");
                                } catch {
                                    return "Recent";
                                }
                            })()}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                        {post.excerpt || "Read more about this topic..."}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary mt-auto">
                        Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
