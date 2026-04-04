"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSpecialtyPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/admin/specialties", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to create specialty");

            router.push("/admin/specialties");
            router.refresh();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            alert(message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Add New Specialty</h1>
                <p>Create a new medical category for hospital listings</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Specialty Name *</label>
                        <input name="name" required placeholder="e.g. Cardiology" />
                    </div>
                    <div className="form-group">
                        <label>Slug *</label>
                        <input name="slug" required placeholder="e.g. cardiology" />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Specialty"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
