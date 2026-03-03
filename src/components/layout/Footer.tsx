import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-info">
          <Link href="/" className="logo footer-logo">
            <span className="logo-med">mediportal</span>247
          </Link>
          <p className="footer-desc">
            Your trustworthy medical information portal for India. Providing detailed hospital profiles and high-quality medical awareness content at mediportal247.online.
          </p>
        </div>

        <div className="footer-links">
          <h4>Top Cities</h4>
          <Link href="/cities/delhi">Hospitals in Delhi</Link>
          <Link href="/cities/mumbai">Hospitals in Mumbai</Link>
          <Link href="/cities/bangalore">Hospitals in Bangalore</Link>
        </div>

        <div className="footer-links">
          <h4>Medical Blog</h4>
          <Link href="/blog/health-tips">Health Tips</Link>
          <Link href="/blog/disease-awareness">Disease Awareness</Link>
          <Link href="/blog/medical-news">Medical News</Link>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <Link href="/about-us">About Us</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
          <Link href="/medical-disclaimer">Medical Disclaimer</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} mediportal247. All rights reserved.</p>
          <p className="medical-warning">
            Disclaimer: Information provided is for educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
