"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HospitalFormProps {
    initialData?: {
        id: string;
        name: string;
        slug: string;
        overview: string;
        specialties: string;
        facilities: string;
        departments: string;
        accreditations?: string | null;
        emergencyInfo: string;
        contactInfo: string;
        mapUrl?: string | null;
        imageUrl?: string | null;
        imageCredit?: string | null;
        cityId?: string | null;
        specialtyId?: string | null;
        metaTitle?: string | null;
        metaDescription?: string | null;
        publishDate: Date | string;
        lastUpdated: Date | string;
    };
    cities: { id: string; name: string }[];
    specialties: { id: string; name: string }[];
}

export default function HospitalForm({ initialData, cities, specialties }: HospitalFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(formData.entries());

        // Sanitize Google Maps URL if it's an iframe
        if (data.mapUrl && data.mapUrl.includes('<iframe')) {
            const match = data.mapUrl.match(/src="([^"]+)"/);
            if (match) data.mapUrl = match[1];
        }

        try {
            const res = await fetch(initialData ? `/api/admin/hospitals/${initialData.id}` : "/api/admin/hospitals", {
                method: initialData ? "PUT" : "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to save hospital");

            router.push("/admin/hospitals");
            router.refresh();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsPending(false);
        }
    };

    const generateSEO = () => {
        const name = (document.getElementsByName("name")[0] as HTMLInputElement)?.value;
        const overview = (document.getElementsByName("overview")[0] as HTMLTextAreaElement)?.value;

        if (!name) return;

        // Auto-slug
        const slugInput = document.getElementsByName("slug")[0] as HTMLInputElement;
        if (slugInput && !slugInput.value) {
            slugInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Auto-meta title
        const metaTitleInput = document.getElementsByName("metaTitle")[0] as HTMLInputElement;
        if (metaTitleInput && !metaTitleInput.value) {
            metaTitleInput.value = `${name} - Best Hospitals in India | mediportal247`;
        }

        // Auto-meta description
        const metaDescInput = document.getElementsByName("metaDescription")[0] as HTMLTextAreaElement;
        if (metaDescInput && !metaDescInput.value && overview) {
            metaDescInput.value = overview.substring(0, 155).replace(/\s+/g, ' ').trim() + "...";
        }
    };

    return (
        <form onSubmit={handleSubmit} className="hospital-form">
            <div className="form-sections">
                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Basic Information</h3>
                        <button type="button" onClick={generateSEO} className="btn-magic">✨ Magic SEO</button>
                    </div>
                    <div className="form-group">
                        <label>Hospital Name *</label>
                        <input name="name" defaultValue={initialData?.name} required placeholder="e.g. AIIMS Delhi" />
                    </div>
                    <div className="form-group">
                        <label>Slug (URL) *</label>
                        <input name="slug" defaultValue={initialData?.slug} required placeholder="e.g. aiims-delhi" />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>City *</label>
                            <input
                                name="cityName"
                                list="cities-data"
                                defaultValue={cities.find(c => c.id === initialData?.cityId)?.name ?? ""}
                                required
                                placeholder="Type or select city..."
                            />
                            <datalist id="cities-data">
                                {cities.map(c => <option key={c.id} value={c.name} />)}
                            </datalist>
                        </div>
                        <div className="form-group">
                            <label>Primary Specialty</label>
                            <select name="specialtyId" defaultValue={initialData?.specialtyId ?? undefined} required>
                                <option value="">Select Specialty</option>
                                {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="imageUrl" defaultValue={initialData?.imageUrl ?? ""} placeholder="https://example.com/hospital-image.jpg" />
                    </div>
                    <div className="form-group">
                        <label>Image Credit / Source</label>
                        <input name="imageCredit" defaultValue={initialData?.imageCredit ?? ""} placeholder="e.g. Photo by John Doe or Source: Wikipedia" />
                    </div>
                </section>

                <section className="form-section">
                    <h3>Content & Details</h3>
                    <div className="form-group">
                        <label>Overview (Min 800 words recommended)</label>
                        <textarea name="overview" defaultValue={initialData?.overview} rows={10} required />
                    </div>
                    <div className="form-group">
                        <label>Specialties (JSON or comma separated)</label>
                        <textarea name="specialties" defaultValue={initialData?.specialties} rows={3} />
                    </div>
                    <div className="form-group">
                        <label>Facilities</label>
                        <textarea name="facilities" defaultValue={initialData?.facilities} rows={3} />
                    </div>
                    <div className="form-group">
                        <label>Departments</label>
                        <textarea name="departments" defaultValue={initialData?.departments} rows={3} />
                    </div>
                </section>

                <section className="form-section">
                    <h3>Contact & Accreditation</h3>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Accreditations (NABH, JCI, etc.)</label>
                            <input name="accreditations" defaultValue={initialData?.accreditations ?? ""} />
                        </div>
                        <div className="form-group">
                            <label>Contact Details</label>
                            <input name="contactInfo" defaultValue={initialData?.contactInfo} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Emergency Services Information</label>
                        <textarea name="emergencyInfo" defaultValue={initialData?.emergencyInfo} rows={2} required />
                    </div>
                    <div className="form-group">
                        <label>Google Maps Embed URL</label>
                        <input name="mapUrl" defaultValue={initialData?.mapUrl ?? ""} />
                    </div>
                </section>

                <section className="form-section">
                    <h3>SEO & Scheduling</h3>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Publish Date</label>
                            <input type="date" name="publishDate" defaultValue={initialData?.publishDate ? new Date(initialData.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>Last Updated Date</label>
                            <input type="date" name="lastUpdated" defaultValue={initialData?.lastUpdated ? new Date(initialData.lastUpdated).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Meta Title</label>
                        <input name="metaTitle" defaultValue={initialData?.metaTitle ?? ""} placeholder="SEO Title" />
                    </div>
                    <div className="form-group">
                        <label>Meta Description</label>
                        <textarea name="metaDescription" defaultValue={initialData?.metaDescription ?? ""} rows={2} placeholder="SEO Description" />
                    </div>
                </section>
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="form-actions">
                <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                    {isPending ? "Saving..." : (initialData ? "Update Hospital" : "Create Hospital")}
                </button>
            </div>

            <style jsx>{`
        .hospital-form {
          max-width: 900px;
        }
        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .form-section {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: var(--shadow);
        }
        .form-section h3 {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 1.1rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-weight: 600;
          font-size: 0.85rem;
          color: #4a5568;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-family: inherit;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 2rem 0;
        }
        .error-box {
          background: #fff5f5;
          color: var(--error);
          padding: 1rem;
          border-radius: 4px;
          margin-top: 1rem;
        }
        .btn-magic {
          background: #fdf2f8;
          color: #db2777;
          border: 1px solid #fbcfe8;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-magic:hover {
          background: #fce7f3;
        }
      `}</style>
        </form>
    );
}
