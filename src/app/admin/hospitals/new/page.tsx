"use client";

import React from 'react';
import HospitalForm from "@/components/admin/HospitalForm";

export default function NewHospitalPage() {
  const cities = [
    { id: '1', name: 'Delhi', slug: 'delhi' },
    { id: '2', name: 'Mumbai', slug: 'mumbai' },
  ];
  const specialties = [
    { id: '1', name: 'Cardiology', slug: 'cardiology' },
    { id: '2', name: 'Neurology', slug: 'neurology' },
  ];

  return (
    <div className="admin-page">
      <header className="page-header">
        <h1>Add New Hospital</h1>
        <p>Enter detailed information for the hospital profile</p>
      </header>

      <HospitalForm cities={cities} specialties={specialties} />

      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
