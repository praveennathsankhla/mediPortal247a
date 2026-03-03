"use client";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  // Parse FAQs if they exist
  const faqs = post.faqs ? JSON.parse(post.faqs) : [];

  return (
    <article className="blog-post-page">
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: post.category?.name || "Articles", href: `/blog/${post.category?.slug}` },
        { label: post.title }
      ]} />

      <div className="container py-12">
        <header className="post-header">
          <span className="post-category">{post.category?.name}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>By {post.author}</span> • <span>Published on {new Date(post.publishDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
          </div>
        </header>

        {post.imageUrl && (
          <div className="post-featured-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}

        <div className="post-content-layout">
          <div className="post-main-content">
            <div className="content-body" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />

            {faqs.length > 0 && (
              <section className="post-faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqs.map((faq: any, index: number) => (
                    <div key={index} className="faq-item">
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {post.references && (
              <section className="post-references">
                <h3>References</h3>
                <p className="text-sm text-muted">{post.references}</p>
              </section>
            )}
          </div>

          <aside className="post-sidebar">
            <div className="sidebar-card ad-sidebar">
              Google AdSense - Sidebar
            </div>

            <div className="sidebar-card medical-notice">
              <h4>Medical Disclaimer</h4>
              <p>This content is for informational purposes only and does not constitute medical advice. Always consult a healthcare professional.</p>
              <Link href="/medical-disclaimer" className="text-primary font-bold">Read More &rarr;</Link>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .post-header {
          max-width: 800px;
          margin-bottom: 3rem;
        }
        .post-category {
          color: var(--secondary);
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 1rem;
        }
        .post-header h1 {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        .post-meta {
          color: var(--text-muted);
          font-size: 1rem;
        }
        .post-featured-image {
          margin-bottom: 3rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .post-featured-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .post-content-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
        }
        .content-body {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #2d3748;
        }
        .post-faqs {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border-color);
        }
        .faq-item {
          margin-bottom: 2rem;
        }
        .faq-item h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--primary);
        }
        .post-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .sidebar-card {
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .ad-sidebar {
          background: #f8fafc;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a0aec0;
          font-size: 0.85rem;
          text-align: center;
          border: 1px dashed #cbd5e0;
        }
        .medical-notice {
          background: #fff5f5;
          border-color: #feb2b2;
        }
        .medical-notice h4 {
          color: #c53030;
          margin-bottom: 0.75rem;
        }
        .medical-notice p {
          font-size: 0.9rem;
          color: #9b2c2c;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 900px) {
          .post-content-layout {
            grid-template-columns: 1fr;
          }
          .post-header h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </article>
  );
}
