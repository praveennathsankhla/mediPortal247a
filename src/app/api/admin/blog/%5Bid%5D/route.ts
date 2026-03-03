import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

        const post = await prisma.blogPost.update({
            where: { id: params.id },
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
        console.error("Blog post update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.blogPost.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Blog post deletion error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
