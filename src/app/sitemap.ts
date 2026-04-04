import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mediportal247.online'

    // Static pages
    const staticPages = [
        '',
        '/hospitals',
        '/blog',
        '/about-us',
        '/contact-us',
        '/privacy-policy',
        '/terms-conditions',
        '/disclaimer'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8
    }))

    // Dynamic Hospital pages
    const hospitals = await prisma.hospital.findMany({
        select: { slug: true, updatedAt: true }
    })
    const hospitalPages = hospitals.map(h => ({
        url: `${baseUrl}/hospitals/${h.slug}`,
        lastModified: h.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6
    }))

    // Dynamic Blog pages
    const blogPosts = await prisma.blogPost.findMany({
        select: { slug: true, updatedAt: true }
    })
    const blogPages = blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6
    }))

    return [...staticPages, ...hospitalPages, ...blogPages]
}
