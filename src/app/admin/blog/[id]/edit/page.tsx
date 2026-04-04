export const dynamic = "force-dynamic";

import React from 'react';
import BlogForm from "@/components/admin/BlogForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { id }
    });

    if (!post) notFound();

    const categories = await prisma.blogCategory.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Edit Blog Post</h1>
                <p>Update your article: {post.title}</p>
            </header>

            <BlogForm initialData={post} categories={categories} />

        </div>
    );
}
