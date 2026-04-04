"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCityPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState({ name: "", slug: "" });

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch(`/api/admin/cities/${id}`);
                if (!res.ok) throw new Error("Failed to fetch city");
                const data = await res.json();
                setCity(data);
            } catch (err) {
                console.error(err);
                alert("Error loading city");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCity();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/admin/cities/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to update city");

            router.push("/admin/cities");
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
                <h1>Edit City</h1>
                <p>Modify location details</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>City Name *</label>
                        <input name="name" defaultValue={city.name} required />
                    </div>
                    <div className="form-group">
                        <label>Slug *</label>
                        <input name="slug" defaultValue={city.slug} required />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Updating..." : "Update City"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
