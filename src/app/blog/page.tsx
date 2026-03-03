"use client";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";


export default async function BlogIndexPage() {
    const categories = await prisma.blogCategory.findMany({
        include: {
            posts: {
                take: 3,
                orderBy: { publishDate: 'desc' },
            },
        },
    });

    return (
        <div className="blog-index">
            <Breadcrumbs items={[{ label: "Medical Blog" }]} />

            <section className="blog-hero">
                <div className="container">
                    <h1>Medical Awareness & Health Insights</h1>
                    <p>Verified healthcare information to empower your wellness journey.</p>
                </div>
            </section>

            <div className="container py-16">
                {categories.map((cat) => (
                    <section key={cat.id} className="category-section">
                        <div className="section-header">
                            <h2>{cat.name}</h2>
                            <Link href={`/blog/${cat.slug}`} className="view-all">View All {cat.name} →</Link>
                        </div>

                        <div className="blog-grid">
                            {cat.posts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <div className="card-body">
                                        <span className="post-date">{new Date(post.publishDate).toLocaleDateString()}</span>
                                        <h3>{post.title}</h3>
                                        <p className="excerpt">{post.content.substring(0, 120)}...</p>
                                        <Link href={`/blog/post/${post.slug}`} className="read-btn">Read Article</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <style jsx>{`
        .blog-hero {
          background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
          color: white;
          padding: 5rem 0;
          text-align: center;
        }
        .blog-hero h1 { color: white; font-size: 3rem; margin-bottom: 1rem; }
        .blog-hero p { font-size: 1.25rem; opacity: 0.9; }
        
        .category-section { margin-bottom: 5rem; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--accent);
          padding-bottom: 1rem;
        }
        .section-header h2 { margin: 0; font-size: 2rem; }
        .view-all { font-weight: 700; color: var(--secondary); }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .blog-card {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s;
        }
        .blog-card:hover { transform: translateY(-5px); }
        .card-body { padding: 2rem; }
        .post-date { font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.5rem; }
        .blog-card h3 { font-size: 1.25rem; margin-bottom: 1rem; line-height: 1.4; color: var(--primary); }
        .excerpt { color: #4a5568; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6; }
        .read-btn { font-weight: 700; text-decoration: underline; color: var(--foreground); }
      `}</style>
        </div>
    );
}
