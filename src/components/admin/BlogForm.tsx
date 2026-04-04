"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogFormProps {
    initialData?: {
        id: string;
        title: string;
        slug: string;
        content: string;
        faqs?: string | null;
        references?: string | null;
        author: string;
        imageUrl?: string | null;
        imageCredit?: string | null;
        categoryId?: string | null;
        publishDate: Date | string;
        lastUpdated: Date | string;
        metaTitle?: string | null;
        metaDescription?: string | null;
    };
    categories: { id: string; name: string }[];
}

export default function BlogForm({ initialData, categories }: BlogFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(initialData ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog", {
                method: initialData ? "PUT" : "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to save blog post");

            router.push("/admin/blog");
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
        const title = (document.getElementsByName("title")[0] as HTMLInputElement)?.value;
        const content = (document.getElementsByName("content")[0] as HTMLTextAreaElement)?.value;

        if (!title) return;

        // Auto-slug
        const slugInput = document.getElementsByName("slug")[0] as HTMLInputElement;
        if (slugInput && !slugInput.value) {
            slugInput.value = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Auto-meta title
        const metaTitleInput = document.getElementsByName("metaTitle")[0] as HTMLInputElement;
        if (metaTitleInput && !metaTitleInput.value) {
            metaTitleInput.value = `${title} | mediportal247`;
        }

        // Auto-meta description
        const metaDescInput = document.getElementsByName("metaDescription")[0] as HTMLTextAreaElement;
        if (metaDescInput && !metaDescInput.value && content) {
            metaDescInput.value = content.substring(0, 155).replace(/\s+/g, ' ').trim() + "...";
        }
    };

    return (
        <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-sections">
                <section className="form-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Article Details</h3>
                        <button type="button" onClick={generateSEO} className="btn-magic">✨ Magic SEO</button>
                    </div>
                    <div className="form-group">
                        <label>Title *</label>
                        <input name="title" defaultValue={initialData?.title} required placeholder="e.g. 10 Tips for a Healthy Heart" />
                    </div>
                    <div className="form-group">
                        <label>Slug (URL) *</label>
                        <input name="slug" defaultValue={initialData?.slug} required placeholder="e.g. 10-tips-healthy-heart" />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="categoryId" defaultValue={initialData?.categoryId ?? undefined}>
                                <option value="">Uncategorized</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Author Name</label>
                            <input name="author" defaultValue={initialData?.author || "mediportal247 Team"} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Featured Image URL</label>
                        <input name="imageUrl" defaultValue={initialData?.imageUrl ?? ""} placeholder="https://example.com/blog-image.jpg" />
                    </div>
                    <div className="form-group">
                        <label>Image Credit / Source</label>
                        <input name="imageCredit" defaultValue={initialData?.imageCredit ?? ""} placeholder="e.g. Source: Pexels" />
                    </div>
                </section>

                <section className="form-section">
                    <h3>Main Content</h3>
                    <div className="form-group">
                        <label>Article Content (1000-1500+ words recommended, use H2/H3/H4 for structure)</label>
                        <textarea name="content" defaultValue={initialData?.content} rows={20} required />
                    </div>
                    <div className="form-group">
                        <label>FAQs (JSON string)</label>
                        <textarea name="faqs" defaultValue={initialData?.faqs ?? ""} rows={4} placeholder='[{"q": "...", "a": "..."}]' />
                    </div>
                    <div className="form-group">
                        <label>References / Citations</label>
                        <textarea name="references" defaultValue={initialData?.references ?? ""} rows={3} placeholder="Medical journals, official health sites, etc." />
                    </div>
                </section>

                <section className="form-section">
                    <h3>SEO & Dates</h3>
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
                    {isPending ? "Saving..." : (initialData ? "Update Post" : "Publish Post")}
                </button>
            </div>

            <style jsx>{`
        .blog-form {
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
