import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
    const hospitals = await prisma.hospital.findMany();
    return hospitals.map((h: any) => ({
        slug: h.slug,
    }));
}

export default async function HospitalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const hospital = await prisma.hospital.findUnique({
        where: { slug },
        include: {
            city: true,
            specialty: true,
        },
    });

    if (!hospital) {
        notFound();
    }

    const faqs = hospital.faqs ? JSON.parse(hospital.faqs) : [];

    return (
        <div className="hospital-detail-page">
            <Breadcrumbs items={[
                { label: "Hospitals", href: "/hospitals" },
                { label: hospital.city?.name || "India", href: `/cities/${hospital.city?.slug}` },
                { label: hospital.name }
            ]} />

            <div className="container py-12">
                <header className="hospital-header">
                    <div className="header-tags">
                        <span className="city-tag">{hospital.city?.name}</span>
                        <span className="specialty-tag">{hospital.specialty?.name}</span>
                    </div>
                    <h1>{hospital.name}</h1>
                    <div className="accreditations">
                        {hospital.accreditations || "NABH Accredited"}
                    </div>
                </header>

                <div className="detail-layout">
                    <main className="main-info">
                        <section className="info-block">
                            <h2>Overview</h2>
                            <div className="content" dangerouslySetInnerHTML={{ __html: hospital.overview.replace(/\n/g, '<br/>') }} />
                        </section>

                        <section className="info-block">
                            <h2>Facilities & Amenities</h2>
                            <div className="facilities-grid">
                                {hospital.facilities.split(',').map((f: string, i: number) => (
                                    <div key={i} className="facility-item">✓ {f.trim()}</div>
                                ))}
                            </div>
                        </section>

                        <section className="info-block">
                            <h2>Departments</h2>
                            <p>{hospital.departments}</p>
                        </section>

                        {faqs.length > 0 && (
                            <section className="info-block faqs">
                                <h2>Frequently Asked Questions</h2>
                                <div className="faq-list">
                                    {faqs.map((faq: any, index: number) => (
                                        <div key={index} className="faq-item">
                                            <h3>{faq.question}</h3>
                                            <p>{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <aside className="sidebar-info">
                        <div className="contact-card">
                            <h3>Contact Details</h3>
                            <div className="contact-item">
                                <strong>Address:</strong>
                                <p>{hospital.contactInfo}</p>
                            </div>
                            <div className="contact-item">
                                <strong>Emergency:</strong>
                                <p className="emergency-text">{hospital.emergencyInfo}</p>
                            </div>
                            {hospital.mapUrl && (
                                <div className="map-placeholder">
                                    <a href={hospital.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full">View on Google Maps</a>
                                </div>
                            )}
                        </div>

                        <div className="ad-card">
                            AdSense Placeholder
                        </div>

                        <div className="warning-card">
                            <p><strong>Note:</strong> While we aim for accuracy, please contact the hospital directly for the most current information regarding services and availability.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
