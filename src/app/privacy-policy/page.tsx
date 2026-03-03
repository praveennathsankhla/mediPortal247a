"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";


export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <div className="container py-12">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: March 2026</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to mediportal247 (mediportal247.online). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you use our contact form or subscribe to our newsletter. This may include:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Health-related queries (voluntarily submitted)</li>
              <li>Usage data and cookies</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the collected information for various purposes, including:
            </p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Protection and Security</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>5. Google AdSense and Cookies</h2>
            <p>
              We use Google AdSense to serve ads on our site. Google, as a third-party vendor, uses cookies to serve ads on your site. Google's use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at pnath6745@gmail.com.
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
        p, li {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 1rem;
        }
        ul {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        section {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
