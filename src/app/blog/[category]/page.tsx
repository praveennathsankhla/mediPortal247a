import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";


export async function generateStaticParams() {
  const categories = await prisma.blogCategory.findMany({
    select: { slug: true }
  });
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = await prisma.blogCategory.findUnique({
    where: { slug: category },
    select: { name: true }
  });

  if (!cat) return { title: 'Category Not Found' };

  return {
    title: `${cat.name} Articles | mediportal247 Medical Blog`,
    description: `Explore the latest medical articles and health tips in the ${cat.name} category. Verified health insights for a better life.`,
  };
}

export const revalidate = 3600;

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // First check if it's a valid category
  const cat = await prisma.blogCategory.findUnique({
    where: { slug: category },
    include: {
      posts: {
        orderBy: { publishDate: 'desc' },
      },
    },
  });

  if (!cat) {
    // Fallback: Check if it's a post slug and redirect
    const post = await prisma.blogPost.findUnique({
      where: { slug: category },
      select: { slug: true }
    });

    if (post) {
      redirect(`/blog/post/${post.slug}`);
    }

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
                <div className="blog-card-image">
                  {post.imageUrl ? (
                    <Image src={post.imageUrl} alt={post.title} width={400} height={200} />
                  ) : (
                    <div className="image-placeholder">Awareness</div>
                  )}
                </div>
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
