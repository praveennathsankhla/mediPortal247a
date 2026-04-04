export const dynamic = "force-dynamic";

import React from 'react';
import BlogForm from "@/components/admin/BlogForm";
import { prisma } from "@/lib/prisma";

export default async function NewBlogPostPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="admin-page">
      <header className="page-header">
        <h1>Create New Blog Post</h1>
        <p>Write an SEO-optimized medical awareness article</p>
      </header>

      <BlogForm categories={categories} />

    </div>
  );
}
