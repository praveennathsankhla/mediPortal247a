"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";


export default function AboutUs() {
  return (
    <div className="about-page">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="hero-section">
        <div className="container">
          <h1>Dedicated to Your Health Awareness</h1>
          <p>mediportal247 bridges the gap between patients and quality healthcare information in India.</p>
        </div>
      </div>

      <div className="container py-16">
        <div className="about-grid">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At mediportal247, we believe that everyone deserves access to accurate, reliable, and easy-to-understand medical information. Our mission is to empower the people of India with knowledge that helps them make better decisions about their health and the healthcare providers they choose.
            </p>
            <p>
              We provide detailed profiles of top hospitals across cities like Delhi, Mumbai, and Bangalore, ensuring transparency in facilities, specialties, and accreditations.
            </p>

            <h2>Why Choose mediportal247?</h2>
            <ul className="benefits-list">
              <li><strong>Verified Profiles:</strong> We collect and verify hospital data to ensure accuracy.</li>
              <li><strong>Expert Content:</strong> Our medical blog is written by healthcare professionals and researchers.</li>
              <li><strong>Unbiased Information:</strong> We do not endorse any specific hospital or treatment.</li>
              <li><strong>Patient-Centric:</strong> Every feature is designed with the patient's needs in mind.</li>
            </ul>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Hospitals Profiled</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Medical Research Topics</p>
            </div>
            <div className="stat-card">
              <h3>1M+</h3>
              <p>Annual Readers</p>
            </div>
          </div>
        </div>
      </div>

      <section className="cta-section">
        <div className="container">
          <h2>Have questions or need assistance?</h2>
          <p>Our team is here to help you navigate your healthcare journey.</p>
          <Link href="/contact-us" className="btn btn-primary">Contact Us Now</Link>
        </div>
      </section>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(rgba(0, 86, 179, 0.9), rgba(0, 86, 179, 0.9)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000') center/cover;
          color: white;
          padding: 6rem 0;
          text-align: center;
        }
        .hero-section h1 {
          font-size: 3rem;
          color: white;
          margin-bottom: 1.5rem;
        }
        .hero-section p {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 4rem;
          margin-top: 2rem;
        }
        .about-text h2 {
          font-size: 2rem;
          margin-top: 2.5rem;
          color: var(--primary);
        }
        .about-text p {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }
        .benefits-list {
          list-style: none;
          margin-top: 1.5rem;
        }
        .benefits-list li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          position: relative;
        }
        .benefits-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--secondary);
          font-weight: bold;
        }
        .about-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .stat-card {
          background: var(--accent);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }
        .stat-card h3 {
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }
        .stat-card p {
          font-weight: 600;
          color: #4a5568;
          margin: 0;
        }
        .cta-section {
          background: #f8fafc;
          padding: 5rem 0;
          text-align: center;
          border-top: 1px solid var(--border-color);
        }
        .cta-section h2 {
          font-size: 2.25rem;
          margin-bottom: 1rem;
        }
        .cta-section p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }
        .py-16 { padding: 4rem 0; }
        
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-stats {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }
          .stat-card {
            flex: 1;
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
