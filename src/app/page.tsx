import Link from "next/link";

export default async function HomePage() {
  // Mocked featured hospitals
  const featuredHospitals = [
    {
      id: '1',
      name: 'Apollo Hospital Delhi',
      slug: 'apollo-hospital-delhi',
      overview: 'One of the leading healthcare providers in India with world-class facilities and expert doctors across various specialties.',
      imageUrl: null,
      city: { name: 'Delhi' }
    },
    {
      id: '2',
      name: 'Fortis Memorial Research Institute',
      slug: 'fortis-memorial-gurgaon',
      overview: 'A multi-specialty, quaternary care hospital with a faculty of reputed clinicians and high-end technology.',
      imageUrl: null,
      city: { name: 'Gurgaon' }
    },
    {
      id: '3',
      name: 'Max Super Speciality Hospital',
      slug: 'max-hospital-saket',
      overview: 'Renowned for its excellence in cardiology, oncology, and neurology, providing patient-centric care.',
      imageUrl: null,
      city: { name: 'Delhi' }
    }
  ];

  // Mocked latest blog posts
  const latestPosts = [
    {
      id: 'a',
      title: 'Top 10 Health Tips for 2026',
      slug: 'top-10-health-tips-2026',
      author: 'Dr. Sharma',
      publishDate: new Date(),
      imageUrl: null,
      category: { name: 'Wellness' }
    },
    {
      id: 'b',
      title: 'Understanding Diabetes Management',
      slug: 'understanding-diabetes-management',
      author: 'Dr. Verma',
      publishDate: new Date(),
      imageUrl: null,
      category: { name: 'Health Awareness' }
    }
  ];

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
                      <img src={h.imageUrl} alt={h.name} />
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
                    {p.imageUrl && <img src={p.imageUrl} alt={p.title} />}
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-category">{p.category?.name || 'Awareness'}</span>
                    <h3>{p.title}</h3>
                    <div className="blog-meta">
                      <span>{p.author}</span> • <span>{new Date(p.publishDate).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blog/${p.slug}`} className="read-btn">Read Article</Link>
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
