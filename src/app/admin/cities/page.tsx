export const dynamic = "force-dynamic";

import Link from "next/link";
import React from 'react';
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCitiesPage() {
    const cities = await prisma.city.findMany({
        include: { _count: { select: { hospitals: true } } },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="admin-cities">
            <header className="page-header">
                <div>
                    <h1>Manage Cities</h1>
                    <p>Organize hospitals by location</p>
                </div>
                <Link href="/admin/cities/new" className="btn btn-primary">
                    Add New City
                </Link>
            </header>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th>Slug</th>
                            <th>Hospitals Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(c => (
                            <tr key={c.id}>
                                <td className="font-bold">{c.name}</td>
                                <td>{c.slug}</td>
                                <td>{c._count.hospitals}</td>
                                <td className="actions">
                                    <Link href={`/admin/cities/${c.id}/edit`} className="edit-link">Edit</Link>
                                    <DeleteButton id={c.id} endpoint="/api/admin/cities" itemName={c.name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
