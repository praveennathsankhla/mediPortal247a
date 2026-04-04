export const dynamic = "force-dynamic";

import React from 'react';
import HospitalForm from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";

export default async function NewHospitalPage() {
  const cities = await prisma.city.findMany({
    orderBy: { name: 'asc' }
  });
  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="admin-page">
      <header className="page-header">
        <h1>Add New Hospital</h1>
        <p>Enter detailed information for the hospital profile</p>
      </header>

      <HospitalForm cities={cities} specialties={specialties} />

    </div>
  );
}
