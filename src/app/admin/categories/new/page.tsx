"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to create category");

            router.push("/admin/categories");
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
                <h1>Add New Category</h1>
                <p>Create a new category for medical articles</p>
            </header>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category Name *</label>
                        <input name="name" required placeholder="e.g. Mental Health" />
                    </div>
                    <div className="form-group">
                        <label>Slug *</label>
                        <input name="slug" required placeholder="e.g. mental-health" />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
