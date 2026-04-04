import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  // Fetch featured hospitals (take first 3)
  const featuredHospitals = await prisma.hospital.findMany({
    take: 3,
    include: {
      city: true,
    },
    orderBy: {
      publishDate: 'desc'
    }
  });

  // Fetch latest blog posts (take first 2)
  const latestPosts = await prisma.blogPost.findMany({
    take: 3,
    include: {
      category: true,
    },
    orderBy: {
      publishDate: 'desc'
    }
  });

  return (
    <div className="homepage">

      {/* Featured Hospitals */}
      <section className="section featured-hospitals">
        <div className="container">
          <div className="section-header">
            <h2>Top Rated Hospitals</h2>
            <Link href="/hospitals" className="view-all">View All Hospitals &rarr;</Link>
          </div>

          <div className="card-grid">
            {featuredHospitals.length > 0 ? (
              featuredHospitals.map(h => (
                <div key={h.id} className="hospital-card">
                  <div className="card-image">
                    {h.imageUrl ? (
                      <Image src={h.imageUrl || "https://picsum.photos/seed/hosp/400/250"} alt={h.name} width={400} height={250} className="object-cover" />
                    ) : (
                      <div className="image-placeholder">Medical Care</div>
                    )}
                  </div>
                  <div className="card-body">
                    <span className="card-city">{h.city?.name || 'India'}</span>
                    <h3>{h.name}</h3>
                    <p className="card-excerpt">{h.overview.substring(0, 100)}...</p>
                    <Link href={`/hospitals/${h.slug}`} className="card-link">Full Profile &rarr;</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Coming soon: Detailed hospital profiles.</p>
            )}
          </div>
        </div>
      </section>

      {/* Health awareness section (Static) */}
      <section className="section info-banner bg-accent">
        <div className="container banner-inner">
          <div className="banner-text">
            <h2>Reliable Medical Awareness</h2>
            <p>Our content is 100% original, well-researched, and medical DISCLAIMER backed. We aim to empower patients with knowledge without replacing professional consultation.</p>
            <Link href="/blog" className="btn btn-primary">Explore Health Blog</Link>
          </div>
          <div className="banner-image">
            {/* Visual element here */}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section latest-blog">
        <div className="container">
          <div className="section-header">
            <h2>Latest Medical Insights</h2>
            <Link href="/blog" className="view-all">Read More Articles &rarr;</Link>
          </div>

          <div className="blog-grid">
            {latestPosts.length > 0 ? (
              latestPosts.map(p => (
                <article key={p.id} className="blog-card">
                  <div className="blog-card-image">
                    {p.imageUrl && <Image src={p.imageUrl || "https://picsum.photos/seed/post/400/250"} alt={p.title} width={400} height={250} className="object-cover" />}
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-category">{p.category?.name || 'Awareness'}</span>
                    <h3>{p.title}</h3>
                    <div className="blog-meta">
                      <span>{p.author}</span> • <span>{new Date(p.publishDate).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/post/${p.slug}`} className="read-btn">Read Article</Link>
                  </div>
                </article>
              ))
            ) : (
              <p>Our medical team is preparing new articles for you.</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
