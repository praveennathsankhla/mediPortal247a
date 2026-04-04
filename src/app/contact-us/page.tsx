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
              Have questions about a hospital profile? Or want to suggest a health topic for our blog? We&apos;d love to hear from you.
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

    </div>
  );
}
