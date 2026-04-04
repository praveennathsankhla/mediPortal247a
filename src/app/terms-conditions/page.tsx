import Breadcrumbs from "@/components/common/Breadcrumbs";


export default function TermsConditions() {
  return (
    <div className="legal-page">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <div className="container py-12">
        <div className="legal-content">
          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last Updated: March 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using mediportal247 (mediportal247.online), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              mediportal247 provides users with access to a rich collection of healthcare-related resources, including hospital profiles, medical news, and health tips. You understand and agree that the Service is provided &quot;AS-IS&quot; and that mediportal247 assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
            </p>
          </section>

          <section>
            <h2>3. Medical Disclaimer</h2>
            <p>
              All information provided on mediportal247 is for educational and informational purposes only. It is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2>4. User Conduct</h2>
            <p>
              You agree to use the website only for lawful purposes. You are prohibited from posting or transmitting through the website any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              The content, arrangement, and layout of this site, including but not limited to the text, graphics, and images, are the property of mediportal247 and are protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall mediportal247 or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on mediportal247&apos;s website.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}
