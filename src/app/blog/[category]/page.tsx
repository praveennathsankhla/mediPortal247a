import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  const categories = await prisma.blogCategory.findMany();
  return categories.map((cat: any) => ({
    category: cat.slug,
  }));
}

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
            cat.posts.map((post: any) => (
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

    </div>
  );
}
