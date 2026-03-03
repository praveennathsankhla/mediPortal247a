"use client";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = await prisma.blogCategory.findUnique({
    where: { slug: category },
    include: {
      posts: {
        orderBy: { publishDate: 'desc' },
      },
    },
  });

  if (!cat) {
    notFound();
  }

  return (
    <div className="blog-category-page">
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: cat.name }
      ]} />

      <div className="container py-12">
        <header className="category-header">
          <h1>{cat.name}</h1>
          <p>Browsing articles related to {cat.name.toLowerCase()}.</p>
        </header>

        <div className="blog-grid">
          {cat.posts.length > 0 ? (
            cat.posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-content">
                  <div className="meta">
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="excerpt">{post.content.substring(0, 120)}...</p>
                  <Link href={`/blog/post/${post.slug}`} className="read-more">Read Full Article &rarr;</Link>
                </div>
              </article>
            ))
          ) : (
            <div className="no-posts">
              <h3>New articles coming soon!</h3>
              <p>Our medical writers are preparing high-quality content for the {cat.name} category.</p>
              <Link href="/blog" className="btn btn-primary">Back to Blog</Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .category-header {
          margin-bottom: 3rem;
          border-bottom: 2px solid var(--accent);
          padding-bottom: 2rem;
        }
        .category-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .blog-card {
          background: white;
          border: 1px solid var(--border-color);
          border-bottom: 4px solid var(--secondary);
          border-radius: 8px;
          padding: 2rem;
          transition: transform 0.2s;
        }
        .blog-card:hover {
          transform: translateY(-5px);
        }
        .meta {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .blog-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .excerpt {
          font-size: 0.95rem;
          color: #4a5568;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .read-more {
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          font-size: 0.9rem;
        }
        .no-posts {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 0;
        }
      `}</style>
    </div>
  );
}
