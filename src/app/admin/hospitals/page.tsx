export const dynamic = "force-dynamic";

import Link from "next/link";
import React from 'react';
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminHospitalsPage() {
  const hospitals = await prisma.hospital.findMany({
    include: { city: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="admin-hospitals">
      <header className="page-header">
        <div>
          <h1>Hospital Listings</h1>
          <p>Manage all hospital profiles on the platform</p>
        </div>
        <Link href="/admin/hospitals/new" className="btn btn-primary">
          Add New Hospital
        </Link>
      </header>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>City</th>
              <th>Published Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map(h => (
                <tr key={h.id}>
                  <td className="font-bold">{h.name}</td>
                  <td>{h.city?.name || 'N/A'}</td>
                  <td>{new Date(h.publishDate).toLocaleDateString()}</td>
                  <td>{new Date(h.lastUpdated).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link href={`/admin/hospitals/${h.id}/edit`} className="edit-link">Edit</Link>
                    <DeleteButton id={h.id} endpoint="/api/admin/hospitals" itemName={h.name} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8">No hospitals found. Add your first listing!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
