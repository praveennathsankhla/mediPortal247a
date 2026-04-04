import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, metaTitle: true, metaDescription: true, author: true }
  });

  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.metaTitle || `${post.title} | mediportal247 Blog`,
    description: post.metaDescription || `Read "${post.title}" by ${post.author} on mediportal247 for verified health insights.`,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
    }
  };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true }
  });
  return posts.map((post) => ({
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

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Blog", href: "/blog" }
  ];

  if (post.category) {
    breadcrumbItems.push({ label: post.category.name, href: `/blog/${post.category.slug}` });
  } else {
    breadcrumbItems.push({ label: "Articles", href: "/blog" });
  }

  breadcrumbItems.push({ label: post.title });

  return (
    <article className="blog-post-page">
      <Breadcrumbs items={breadcrumbItems} />

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
            <Image
              src={post.imageUrl || "https://picsum.photos/seed/blog/850/480"}
              alt={post.title}
              width={850}
              height={480}
              className="w-full h-auto object-cover rounded-xl"
              priority
            />
            {post.imageCredit && <div className="image-credit">{post.imageCredit}</div>}
          </div>
        )}

        <div className="post-content-layout">
          <div className="post-main-content">
            <div className="content-body" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />

            {faqs.length > 0 && (
              <section className="post-faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqs.map((faq: { question: string; answer: string }, index: number) => (
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
