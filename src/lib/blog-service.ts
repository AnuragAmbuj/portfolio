import { prisma } from "@/lib/db";

export async function generatePostImage(post: { id: string; title: string; excerpt: string | null }) {
    try {
        // Construct a descriptive prompt for Pollinations.ai
        const prompt = `minimalistic artistic cover image for blog post "${post.title}", abstract, modern, gradient, high quality, 4k`;
        const encodedPrompt = encodeURIComponent(prompt);

        // Pollinations.ai URL
        const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${post.id}`;

        return imageUrl;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}

export async function updatePostImages() {
    const posts = await prisma.post.findMany({
        where: {
            imageUrl: null,
            published: true,
        },
    });

    let count = 0;

    for (const post of posts) {
        const imageUrl = await generatePostImage(post);

        if (imageUrl) {
            await prisma.post.update({
                where: { id: post.id },
                data: { imageUrl },
            });
            count++;
        }
    }

    return count;
}
