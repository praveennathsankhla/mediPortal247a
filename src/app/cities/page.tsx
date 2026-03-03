"use client";

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
          {cities.map((city: any) => (
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

      <style jsx>{`
        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        .page-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .city-card {
          background: white;
          border: 1px solid var(--border-color);
          padding: 2rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .city-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: var(--shadow);
        }
        .city-info h3 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--primary);
        }
        .city-info p {
          margin: 0.5rem 0 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .arrow {
          font-size: 1.5rem;
          color: var(--secondary);
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
