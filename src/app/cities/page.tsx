export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";


export default async function CitiesIndexPage() {
  const cities = await prisma.city.findMany({
    include: {
      _count: {
        select: { hospitals: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="cities-index">
      <Breadcrumbs items={[{ label: "Cities" }]} />

      <div className="container py-12">
        <header className="page-header">
          <h1>Healthcare by City</h1>
          <p>Find the best medical facilities and specialist hospitals in your city.</p>
        </header>

        <div className="cities-grid">
          {cities.map((city) => (
            <Link key={city.id} href={`/cities/${city.slug}`} className="city-card">
              <div className="city-info">
                <h3>{city.name}</h3>
                <p>{city._count.hospitals} Verified Hospitals</p>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
