export const dynamic = "force-dynamic";

import Link from "next/link";
import React from 'react';
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminSpecialtiesPage() {
    const specialties = await prisma.specialty.findMany({
        include: { _count: { select: { hospitals: true } } },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="admin-specialties">
            <header className="page-header">
                <div>
                    <h1>Manage Specialties</h1>
                    <p>Organize hospitals by medical expertise</p>
                </div>
                <Link href="/admin/specialties/new" className="btn btn-primary">
                    Add New Specialty
                </Link>
            </header>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Specialty Name</th>
                            <th>Slug</th>
                            <th>Hospitals Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialties.map(s => (
                            <tr key={s.id}>
                                <td className="font-bold">{s.name}</td>
                                <td>{s.slug}</td>
                                <td>{s._count.hospitals}</td>
                                <td className="actions">
                                    <Link href={`/admin/specialties/${s.id}/edit`} className="edit-link">Edit</Link>
                                    <DeleteButton id={s.id} endpoint="/api/admin/specialties" itemName={s.name} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
