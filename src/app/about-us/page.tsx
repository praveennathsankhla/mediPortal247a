import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";


export default function AboutUs() {
  return (
    <div className="about-page">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="hero-section">
        <div className="container">
          <h1>Dedicated to Your Health Awareness</h1>
          <p>We understand that navigating the healthcare system can be daunting. That&apos;s why we&apos;ve built a platform that brings transparency and accessibility to medical information in India.</p>
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
              <li><strong>Patient-Centric:</strong> Every feature is designed with the patient&apos;s needs in mind.</li>
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

    </div>
  );
}
