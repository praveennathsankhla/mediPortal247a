import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default async function HospitalsPage({
    searchParams,
}: {
    searchParams: { city?: string; specialty?: string };
}) {
    // Mocked cities and specialties
    const cities = [
        { id: 'c1', name: 'Delhi', slug: 'delhi' },
        { id: 'c2', name: 'Mumbai', slug: 'mumbai' },
        { id: 'c3', name: 'Bangalore', slug: 'bangalore' }
    ];

    const specialties = [
        { id: 's1', name: 'Cardiology', slug: 'cardiology' },
        { id: 's2', name: 'Oncology', slug: 'oncology' },
        { id: 's3', name: 'Neurology', slug: 'neurology' }
    ];

    const { city, specialty } = searchParams;

    // Mocked hospitals list
    const hospitals = [
        {
            id: '1',
            name: 'Apollo Hospital Delhi',
            slug: 'apollo-hospital-delhi',
            overview: 'One of the leading healthcare providers in India with world-class facilities.',
            imageUrl: null,
            accreditations: 'NABH, JCI',
            city: { name: 'Delhi', slug: 'delhi' },
            specialty: { name: 'Multi-Specialty', slug: 'multi-specialty' }
        },
        {
            id: '2',
            name: 'Fortis Memorial Research Institute',
            slug: 'fortis-memorial-gurgaon',
            overview: 'A multi-specialty, quaternary care hospital with high-end technology.',
            imageUrl: null,
            accreditations: 'NABH',
            city: { name: 'Gurgaon', slug: 'gurgaon' },
            specialty: { name: 'Cardiology', slug: 'cardiology' }
        }
    ];

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
                                {cities.map(c => (
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
                                {specialties.map(s => (
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
                                hospitals.map(h => (
                                    <div key={h.id} className="hospital-item">
                                        <div className="hospital-item-image">
                                            {h.imageUrl ? <img src={h.imageUrl} alt={h.name} /> : <div className="placeholder">MediCare</div>}
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
