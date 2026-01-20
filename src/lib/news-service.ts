export async function fetchNews() {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        console.warn("NEWS_API_KEY is not set. Returning mock data.");
        return getMockNews();
    }

    try {
        // Fetch Global Tech News with 1-hour revalidation
        const globalNewsPromise = fetch(
            `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=15&apiKey=${apiKey}`,
            { next: { revalidate: 3600 } }
        );

        // Fetch India News with 1-hour revalidation
        const indiaNewsPromise = fetch(
            `https://newsapi.org/v2/top-headlines?country=in&pageSize=15&apiKey=${apiKey}`,
            { next: { revalidate: 3600 } }
        );

        const [globalResponse, indiaResponse] = await Promise.all([
            globalNewsPromise,
            indiaNewsPromise
        ]);

        if (!globalResponse.ok || !indiaResponse.ok) {
            console.error("NewsAPI returned error status");
            return getMockNews();
        }

        const globalData = await globalResponse.json();
        const indiaData = await indiaResponse.json();

        // Prioritize India news
        const allArticles = [...(indiaData.articles || []), ...(globalData.articles || [])];

        // Deduplicate based on URL and remove articles without images
        const uniqueArticles = Array.from(new Map(
            allArticles
                .filter(item => item.urlToImage && item.title && item.title !== "[Removed]")
                .map(item => [item.url, item])
        ).values());

        // Sort by publishedAt desc
        uniqueArticles.sort((a: any, b: any) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        return uniqueArticles.map((article: any) => ({
            id: article.url, // Use URL as unique ID for frontend keys
            title: article.title,
            summary: article.description || article.content || "No description available.",
            url: article.url,
            imageUrl: article.urlToImage,
            source: article.source?.name || "Unknown Source",
            publishedAt: article.publishedAt,
        }));
    } catch (error) {
        console.error("Error fetching news:", error);
        return getMockNews();
    }
}

function getMockNews() {
    return [
        {
            id: "mock-1",
            title: "AI Breakthrough in 2025 (Mock)",
            summary: "Scientists announce a major breakthrough in artificial general intelligence.",
            url: "https://example.com/ai-breakthrough",
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
            source: "Tech Daily",
            publishedAt: new Date().toISOString(),
        },
        {
            id: "mock-2",
            title: "New Rust Framework Gains Popularity (Mock)",
            summary: "A new web framework for Rust is taking the developer community by storm.",
            url: "https://example.com/rust-framework",
            imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
            source: "Dev News",
            publishedAt: new Date().toISOString(),
        },
    ];
}
