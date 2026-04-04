import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default async function HospitalsPage({
    searchParams,
}: {
    searchParams: Promise<{ city?: string; specialty?: string }>;
}) {
    const { city, specialty } = await searchParams;

    // Fetch cities and specialties for filters
    const cities = await prisma.city.findMany({
        orderBy: { name: 'asc' }
    });

    const specialties = await prisma.specialty.findMany({
        orderBy: { name: 'asc' }
    });

    // Fetch hospitals with filters
    const hospitals = await prisma.hospital.findMany({
        where: {
            AND: [
                city ? { city: { slug: city } } : {},
                specialty ? { specialty: { slug: specialty } } : {},
            ]
        },
        include: {
            city: true,
            specialty: true,
        },
        orderBy: {
            publishDate: 'desc'
        }
    });

    return (
        <div className="hospitals-portal">
            <Breadcrumbs items={[{ label: "Hospitals" }]} />

            <div className="container page-content">
                <header className="listing-header">
                    <h1>Find Best Hospitals in India</h1>
                    <p>Browse verified hospitals by city and specialty. Get detailed information on facilities and departments.</p>
                </header>

                <div className="portal-layout">
                    <aside className="filters-sidebar">
                        <div className="filter-group">
                            <h3>Filter by City</h3>
                            <ul>
                                <li><Link href="/hospitals" className={!city ? 'active' : ''}>All Cities</Link></li>
                                {cities.map((c) => (
                                    <li key={c.id}>
                                        <Link href={`/hospitals?city=${c.slug}`} className={city === c.slug ? 'active' : ''}>{c.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-group">
                            <h3>Filter by Specialty</h3>
                            <ul>
                                <li><Link href="/hospitals" className={!specialty ? 'active' : ''}>All Specialties</Link></li>
                                {specialties.map((s) => (
                                    <li key={s.id}>
                                        <Link href={`/hospitals?specialty=${s.slug}`} className={specialty === s.slug ? 'active' : ''}>{s.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="listing-main">
                        <div className="results-info">
                            Showing {hospitals.length} hospital profiles
                        </div>

                        <div className="hospitals-list">
                            {hospitals.length > 0 ? (
                                hospitals.map((h) => (
                                    <div key={h.id} className="hospital-item">
                                        <div className="hospital-item-image">
                                            {h.imageUrl ? <Image src={h.imageUrl} alt={h.name} width={200} height={150} className="object-cover" /> : <div className="placeholder">MediCare</div>}
                                        </div>
                                        <div className="hospital-item-content">
                                            <div className="item-tags">
                                                <span className="tag-city">{h.city?.name}</span>
                                                <span className="tag-specialty">{h.specialty?.name}</span>
                                            </div>
                                            <h3>{h.name}</h3>
                                            <p className="item-accreditation">{h.accreditations || 'NABH/JCI Accredited'}</p>
                                            <p className="item-excerpt">{h.overview.substring(0, 150)}...</p>
                                            <div className="item-actions">
                                                <Link href={`/hospitals/${h.slug}`} className="btn btn-primary">View Full Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">
                                    <h3>No hospitals found</h3>
                                    <p>Try adjusting your filters or search for another city.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}
