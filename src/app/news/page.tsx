import React from "react";
import { prisma } from "@/lib/db";
import NewsCard from "@/components/features/NewsCard";

async function getNews() {
    const news = await prisma.news.findMany({
        orderBy: { publishedAt: "desc" },
    });
    return news;
}

export default async function NewsPage() {
    const newsItems = await getNews();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Latest <span className="text-gradient">News</span></h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Curated tech news and updates from around the web, powered by AI.
                </p>
            </div>

            {newsItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No news items found. Try running the update script.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((item: any, index: number) => (
                        <NewsCard key={item.id} news={item} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
