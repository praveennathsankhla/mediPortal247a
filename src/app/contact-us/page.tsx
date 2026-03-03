"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs";


export default function ContactUs() {
  return (
    <div className="contact-page">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <div className="container py-16">
        <div className="contact-grid">
          <div className="contact-info">
            <h1>Get In Touch</h1>
            <p className="lead">
              Have questions about a hospital profile? Or want to suggest a health topic for our blog? We'd love to hear from you.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>pnath6745@gmail.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">📍</div>
                <div>
                  <h3>Office</h3>
                  <p>mediportal247 Healthcare Systems</p>
                  <p>Sector 44, Gurgaon, Haryana</p>
                  <p>India - 122003</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon">⏱️</div>
                <div>
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" required>
                  <option value="">Select a reason</option>
                  <option value="general">General Inquiry</option>
                  <option value="hospital">Hospital Information</option>
                  <option value="content">Content Feedback</option>
                  <option value="business">Business Collaboration</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          background: #f8fafc;
          min-height: 80vh;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-info h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        .lead {
          font-size: 1.2rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }
        .info-items {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .info-item {
          display: flex;
          gap: 1.5rem;
        }
        .info-item .icon {
          font-size: 2rem;
          background: white;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .info-item h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .info-item p {
          margin: 0;
          color: var(--text-muted);
        }
        .contact-form-container {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #4a5568;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--primary);
        }
        .w-full { width: 100%; }
        .py-16 { padding: 4rem 0; }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
