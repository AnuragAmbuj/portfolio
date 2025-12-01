"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
    readonly news: {
        readonly id: string;
        readonly title: string;
        readonly summary: string;
        readonly url: string | null;
        readonly imageUrl: string | null;
        readonly source: string;
        readonly publishedAt: Date;
    };
    readonly index: number;
}

export default function NewsCard({ news, index }: NewsCardProps) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {news.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
            )}

            <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {news.source}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {format(new Date(news.publishedAt), "MMM d, yyyy")}
                    </span>
                </div>

                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {news.summary}
                </p>

                {news.url && (
                    <Link
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                        Read more <ExternalLink size={14} />
                    </Link>
                )}
            </div>
        </motion.div>
    );
}
