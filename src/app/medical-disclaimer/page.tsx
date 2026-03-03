"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";


export default function MedicalDisclaimer() {
  return (
    <div className="legal-page">
      <Breadcrumbs items={[{ label: "Medical Disclaimer" }]} />
      <div className="container py-12">
        <div className="legal-content">
          <h1>Medical Disclaimer</h1>
          <p className="last-updated">Last Updated: March 2026</p>

          <div className="disclaimer-alert">
            <p>
              <strong>IMPORTANT:</strong> The content on mediportal247 is for informational and educational purposes only and is not intended as professional medical advice, diagnosis, or treatment.
            </p>
          </div>

          <section>
            <h2>No Doctor-Patient Relationship</h2>
            <p>
              Use of mediportal247 does not create a doctor-patient relationship. The information provided on this website is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2>Seek Professional Advice</h2>
            <p>
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
          </section>

          <section>
            <h2>Emergency Situations</h2>
            <p>
              If you think you may have a medical emergency, call your doctor or emergency services (such as 102 or 108 in India) immediately. mediportal247 does NOT recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the website.
            </p>
          </section>

          <section>
            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, medical knowledge is constantly evolving. mediportal247 makes no representations or warranties in relation to the medical information on this website and does not guarantee that the info is complete, true, accurate, up-to-date, or non-misleading.
            </p>
          </section>

          <section>
            <h2>Hospital Profiles</h2>
            <p>
              Hospital profiles and ratings provided on mediportal247 are based on available public data and user feedback. They are intended to assist in research and should not be the sole basis for choosing a healthcare provider.
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .legal-page {
          min-height: 80vh;
        }
        .container {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .disclaimer-alert {
          background-color: #fff5f5;
          border-left: 4px solid #f56565;
          padding: 1.5rem;
          margin-bottom: 2rem;
          color: #c53030;
        }
        .last-updated {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }
        h2 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--foreground);
          border-bottom: 2px solid var(--accent);
          padding-bottom: 0.5rem;
        }
        p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 1rem;
        }
        section {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
