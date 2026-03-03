import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

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
    </article>
  );
}
