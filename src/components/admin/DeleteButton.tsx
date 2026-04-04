"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    id: string;
    endpoint: string;
    itemName: string;
}

export default function DeleteButton({ id, endpoint, itemName }: DeleteButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete item");

            router.refresh();
        } catch (error) {
            alert("Error deleting item. Please try again.");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="delete-btn"
            disabled={isDeleting}
            style={{
                color: 'var(--error)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                opacity: isDeleting ? 0.5 : 1
            }}
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}
