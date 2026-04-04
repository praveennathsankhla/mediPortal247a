import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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

        const post = await prisma.blogPost.update({
            where: { id },
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
        console.error("Hospital update error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.blogPost.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Blog post deletion error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
