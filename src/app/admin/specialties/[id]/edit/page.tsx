"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditSpecialtyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [specialty, setSpecialty] = useState({ name: "", slug: "" });

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const res = await fetch(`/api/admin/specialties/${id}`);
                if (!res.ok) throw new Error("Failed to fetch specialty");
                const data = await res.json();
                setSpecialty(data);
            } catch (err) {
                console.error(err);
                alert("Error loading specialty");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSpecialty();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/admin/specialties/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to update specialty");

            router.push("/admin/specialties");
            router.refresh();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            alert(message);
        } finally {
            setIsPending(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Edit Specialty</h1>
                <p>Modify medical category details</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Specialty Name *</label>
                        <input name="name" defaultValue={specialty.name} required />
                    </div>
                    <div className="form-group">
                        <label>Slug *</label>
                        <input name="slug" defaultValue={specialty.slug} required />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Specialty"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
