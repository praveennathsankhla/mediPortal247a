"use client";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { notFound } from "next/navigation";


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
                                {hospital.facilities.split(',').map((f, i) => (
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

            <style jsx>{`
        .hospital-header {
          margin-bottom: 3rem;
        }
        .header-tags {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .city-tag { background: var(--secondary); color: white; padding: 0.2rem 0.8rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; }
        .specialty-tag { background: var(--accent); color: var(--primary); padding: 0.2rem 0.8rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; }
        .hospital-header h1 { font-size: 3rem; margin-bottom: 0.5rem; }
        .accreditations { color: var(--success); font-weight: 600; font-size: 1.1rem; }
        
        .detail-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; }
        .info-block { margin-bottom: 4rem; }
        .info-block h2 { font-size: 1.75rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        .content { line-height: 1.8; font-size: 1.1rem; color: #4a5568; }
        
        .facilities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .facility-item { background: #f8fafc; padding: 0.75rem; border-radius: 6px; font-weight: 500; }
        
        .contact-card { background: white; border: 1px solid var(--border-color); padding: 2rem; border-radius: 12px; box-shadow: var(--shadow); position: sticky; top: 120px; }
        .contact-item { margin-bottom: 1.5rem; }
        .emergency-text { color: var(--error); font-weight: 700; font-size: 1.2rem; }
        
        .ad-card { background: #f8fafc; border: 1px dashed #cbd5e0; height: 250px; display: flex; align-items: center; justify-content: center; margin: 2rem 0; color: #a0aec0; }
        .warning-card { background: #fffaf0; border: 1px solid #feebc8; padding: 1rem; border-radius: 8px; font-size: 0.85rem; color: #7b341e; }
        
        @media (max-width: 900px) {
          .detail-layout { grid-template-columns: 1fr; }
          .contact-card { position: static; }
        }
      `}</style>
        </div>
    );
}
