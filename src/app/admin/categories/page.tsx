export const dynamic = "force-dynamic";

import Link from "next/link";
import React from 'react';
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCategoriesPage() {
    const categories = await prisma.blogCategory.findMany({
        include: { _count: { select: { posts: true } } },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="admin-categories">
            <header className="page-header">
                <div>
                    <h1>Blog Categories</h1>
                    <p>Organize medical articles by topic</p>
                </div>
                <Link href="/admin/categories/new" className="btn btn-primary">
                    Add New Category
                </Link>
            </header>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Slug</th>
                            <th>Posts Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id}>
                                <td className="font-bold">{c.name}</td>
                                <td>{c.slug}</td>
                                <td>{c._count.posts}</td>
                                <td className="actions">
                                    <Link href={`/admin/categories/${c.id}/edit`} className="edit-link">Edit</Link>
                                    <DeleteButton id={c.id} endpoint="/api/admin/categories" itemName={c.name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
