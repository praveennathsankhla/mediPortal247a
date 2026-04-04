export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
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
                                    <div className="blog-card-image">
                                        {post.imageUrl ? (
                                            <Image src={post.imageUrl} alt={post.title} width={400} height={200} />
                                        ) : (
                                            <div className="image-placeholder">Medical News</div>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <span className="post-date">{new Date(post.publishDate).toLocaleDateString()}</span>
                                        <h3>{post.title}</h3>
                                        <p className="excerpt">{post.content.substring(0, 100)}...</p>
                                        <Link href={`/blog/post/${post.slug}`} className="read-btn">Read Article</Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
