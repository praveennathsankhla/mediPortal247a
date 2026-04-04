import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const {
            title, content, faqs = "[]", references = "", author = session.user?.email || "Admin",
            imageUrl = "", imageCredit = "", categoryId, metaTitle = "", metaDescription = "",
            publishDate, lastUpdated
        } = data;
        let { slug } = data;

        // Sanitize slug
        if (slug) {
            slug = (slug as string).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        } else if (title) {
            slug = (title as string).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        const publishDateObj = publishDate ? new Date(publishDate) : new Date();
        const lastUpdatedObj = lastUpdated ? new Date(lastUpdated) : new Date();

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                faqs,
                references,
                author,
                imageUrl,
                imageCredit,
                categoryId: categoryId || null,
                metaTitle,
                metaDescription,
                publishDate: isNaN(publishDateObj.getTime()) ? new Date() : publishDateObj,
                lastUpdated: isNaN(lastUpdatedObj.getTime()) ? new Date() : lastUpdatedObj,
            },
        });

        return NextResponse.json(post);
    } catch (error: unknown) {
        console.error("Blog post creation error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });
    return NextResponse.json(posts);
}
