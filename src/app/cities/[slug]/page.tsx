"use client";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await prisma.city.findUnique({
    where: { slug },
    include: {
      hospitals: {
        include: {
          specialty: true,
        },
      },
    },
  });

  if (!city) {
    notFound();
  }

  return (
    <div className="city-portal">
      <Breadcrumbs items={[
        { label: "Hospitals", href: "/hospitals" },
        { label: city.name }
      ]} />

      <div className="container py-12">
        <header className="city-header">
          <h1>Hospitals in {city.name}</h1>
          <p>Explore verified hospital profiles, specialties, and healthcare facilities available in {city.name}.</p>
        </header>

        <div className="hospitals-list">
          {city.hospitals.length > 0 ? (
            city.hospitals.map((h) => (
              <div key={h.id} className="hospital-item">
                <div className="hospital-info">
                  <div className="tags">
                    <span className="tag-specialty">{h.specialty?.name || 'Multi-Specialty'}</span>
                    {h.accreditations && <span className="tag-accreditation">{h.accreditations}</span>}
                  </div>
                  <h3>{h.name}</h3>
                  <p className="hospital-excerpt">{h.overview.substring(0, 160)}...</p>
                  <div className="hospital-meta">
                    <span>📍 {city.name}</span>
                    {h.contactInfo && <span>📞 {h.contactInfo.split(',')[0]}</span>}
                  </div>
                  <Link href={`/hospitals/${h.slug}`} className="btn btn-primary">View Full Profile</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No hospitals found in {city.name} yet.</h3>
              <p>We are currently updating our database with more healthcare providers in this city. Check back soon!</p>
              <Link href="/hospitals" className="btn btn-outline">Browse All Cities</Link>
            </div>
          )}
        </div>

        {/* AdSense Placeholder */}
        <div className="ad-space">
          Google AdSense Placeholder - City Hospital Listings
        </div>
      </div>

      <style jsx>{`
        .city-header {
          margin-bottom: 3rem;
          border-bottom: 2px solid var(--accent);
          padding-bottom: 2rem;
        }
        .city-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .city-header p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 800px;
        }
        .hospitals-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .hospital-item {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--border-color);
          transition: transform 0.2s;
        }
        .hospital-item:hover {
          transform: translateY(-2px);
        }
        .tags {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .tag-specialty {
          background: var(--accent);
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .tag-accreditation {
          background: #f0fff4;
          color: #2f855a;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .hospital-item h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .hospital-excerpt {
          color: #4a5568;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .hospital-meta {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
        }
        .btn-outline {
          border: 1px solid var(--primary);
          color: var(--primary);
          margin-top: 1rem;
        }
        .ad-space {
          margin-top: 4rem;
          text-align: center;
          padding: 2rem;
          background: #f8fafc;
          border: 1px dashed #cbd5e0;
          color: #718096;
        }
      `}</style>
    </div>
  );
}
