import { prisma } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function fetchNews() {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        console.warn("NEWS_API_KEY is not set. Returning mock data.");
        return getMockNews();
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`NewsAPI failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.articles.map((article: any) => ({
            title: article.title,
            description: article.description || article.content || "No description available.",
            url: article.url,
            urlToImage: article.urlToImage,
            source: { name: article.source.name },
            publishedAt: article.publishedAt,
        }));
    } catch (error) {
        console.error("Error fetching news:", error);
        return getMockNews();
    }
}

export async function generateNewsSummary(newsItem: any) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return newsItem.description;
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that summarizes tech news. Keep it concise (under 30 words).",
                },
                {
                    role: "user",
                    content: `Summarize this news article: Title: ${newsItem.title}. Description: ${newsItem.description}`,
                },
            ],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content || newsItem.description;
    } catch (error) {
        console.error("Error generating summary:", error);
        return newsItem.description;
    }
}

export async function updateNewsDatabase() {
    const newsItems = await fetchNews();
    let count = 0;

    for (const item of newsItems) {
        // Skip items without images or valid content
        if (!item.urlToImage || !item.title || item.title === "[Removed]") continue;

        const summary = await generateNewsSummary(item);

        // Check if news already exists
        const existing = await prisma.news.findFirst({
            where: { url: item.url },
        });

        if (!existing) {
            await prisma.news.create({
                data: {
                    title: item.title,
                    summary: summary,
                    url: item.url,
                    imageUrl: item.urlToImage,
                    source: item.source.name,
                    publishedAt: new Date(item.publishedAt),
                },
            });
            count++;
        }
    }

    return count;
}

function getMockNews() {
    return [
        {
            title: "AI Breakthrough in 2025 (Mock)",
            description: "Scientists announce a major breakthrough in artificial general intelligence.",
            url: "https://example.com/ai-breakthrough",
            urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
            source: { name: "Tech Daily" },
            publishedAt: new Date().toISOString(),
        },
        {
            title: "New Rust Framework Gains Popularity (Mock)",
            description: "A new web framework for Rust is taking the developer community by storm.",
            url: "https://example.com/rust-framework",
            urlToImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
            source: { name: "Dev News" },
            publishedAt: new Date().toISOString(),
        },
    ];
}
