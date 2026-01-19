import { prisma } from "@/lib/db";

export async function fetchNews() {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        console.warn("NEWS_API_KEY is not set. Returning mock data.");
        return getMockNews();
    }

    try {
        // Fetch Global Tech News
        const globalNewsPromise = fetch(
            `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${apiKey}`
        );

        // Fetch India Tech News
        const indiaNewsPromise = fetch(
            `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=10&apiKey=${apiKey}`
        );

        const [globalResponse, indiaResponse] = await Promise.all([
            globalNewsPromise,
            indiaNewsPromise
        ]);

        if (!globalResponse.ok) {
            console.error(`Global NewsAPI failed with status ${globalResponse.status}`);
        }
        if (!indiaResponse.ok) {
            console.error(`India NewsAPI failed with status ${indiaResponse.status}`);
        }

        const globalData = globalResponse.ok ? await globalResponse.json() : { articles: [] };
        const indiaData = indiaResponse.ok ? await indiaResponse.json() : { articles: [] };

        // Combine articles, prioritizing India news by interleaving or just concatenating
        // Let's concatenate for now, maybe India first? Or mix them.
        // Let's put India news first to ensure visibility as requested.
        const allArticles = [...indiaData.articles, ...globalData.articles];

        // Deduplicate based on URL
        const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.url, item])).values());

        return uniqueArticles.map((article: any) => ({
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

export async function updateNewsDatabase() {
    const newsItems = await fetchNews();
    let count = 0;

    for (const item of newsItems) {
        // Skip items without images or valid content
        if (!item.urlToImage || !item.title || item.title === "[Removed]") continue;

        const summary = item.description;

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
