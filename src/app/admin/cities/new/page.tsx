"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCityPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/admin/cities", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to create city");

            router.push("/admin/cities");
            router.refresh();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Add New City</h1>
                <p>Create a new location for hospital listings</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>City Name *</label>
                        <input name="name" required placeholder="e.g. Mumbai" />
                    </div>
                    <div className="form-group">
                        <label>Slug *</label>
                        <input name="slug" required placeholder="e.g. mumbai" />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Creating..." : "Create City"}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .form-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: var(--shadow);
          max-width: 500px;
        }
        .form-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-weight: 600; font-size: 0.9rem; }
        .form-group input { padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 4px; }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
      `}</style>
        </div>
    );
}
