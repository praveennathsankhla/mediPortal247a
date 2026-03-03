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
            title, slug, content, faqs, references, author,
            imageUrl, categoryId, metaTitle, metaDescription,
            publishDate, lastUpdated
        } = data;

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                faqs,
                references,
                author,
                imageUrl,
                categoryId: categoryId || null,
                metaTitle,
                metaDescription,
                publishDate: new Date(publishDate),
                lastUpdated: new Date(lastUpdated),
            },
        });

        return NextResponse.json(post);
    } catch (error: any) {
        console.error("Blog post creation error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });
    return NextResponse.json(posts);
}
