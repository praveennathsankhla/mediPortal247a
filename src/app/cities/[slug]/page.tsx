import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export const dynamic = "force-dynamic";

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
    </div>
  );
}
