import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await prisma.post.findMany({
        where: { published: true },
    })
    const blogs = posts.map((post) => ({
        url: `https://example.com/blog/${post.slug}`,
        lastModified: post.updatedAt,
    }))

    const routes = ['', '/blog'].map((route) => ({
        url: `https://example.com${route}`,
        lastModified: new Date(),
    }))

    return [...routes, ...blogs]
}
