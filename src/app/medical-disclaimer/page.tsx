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

    </div>
  );
}
