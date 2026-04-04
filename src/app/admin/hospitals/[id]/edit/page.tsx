import React from 'react';
import HospitalForm from "@/components/admin/HospitalForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditHospitalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const hospital = await prisma.hospital.findUnique({
        where: { id }
    });

    if (!hospital) notFound();

    const cities = await prisma.city.findMany({
        orderBy: { name: 'asc' }
    });
    const specialtiesList = await prisma.specialty.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Edit Hospital</h1>
                <p>Update information for {hospital.name}</p>
            </header>

            <HospitalForm initialData={hospital} cities={cities} specialties={specialtiesList} />

        </div>
    );
}
