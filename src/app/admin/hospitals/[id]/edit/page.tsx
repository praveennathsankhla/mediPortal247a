"use client";

import React from 'react';
import HospitalForm from "@/components/admin/HospitalForm";

export default function EditHospitalPage({ params }: { params: { id: string } }) {
    // Mocked hospital data
    const hospital = {
        id: params.id,
        name: 'Apollo Hospital Delhi',
        slug: 'apollo-hospital-delhi',
        overview: 'One of the leading healthcare providers in India.',
        specialties: 'General Medicine, Cardiology',
        facilities: 'ICU, Emergency, Pharmacy',
        departments: 'OPD, IPD',
        accreditations: 'NABH',
        emergencyInfo: '1066',
        contactInfo: '+91-11-26925858',
        faqs: '[]',
        author: 'Admin',
    };

    const cities = [
        { id: '1', name: 'Delhi', slug: 'delhi' },
    ];
    const specialtiesList = [
        { id: '1', name: 'Cardiology', slug: 'cardiology' },
    ];

    return (
        <div className="admin-page">
            <header className="page-header">
                <h1>Edit Hospital</h1>
                <p>Update information for {hospital.name}</p>
            </header>

            <HospitalForm initialData={hospital} cities={cities} specialties={specialtiesList} />

            <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
      `}</style>
        </div>
    );
}
