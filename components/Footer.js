"use client";
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <h2 className="brand-primary">JAI GANESH</h2>
            <p className="brand-secondary">CATERING & SERVICE</p>
            <p className="brand-tagline">Good Food. Great Memories.</p>
            <p className="brand-tagline2">We Serve... You Celebrate...</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="WhatsApp">WA</a>
            </div>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><strong>M. Balaji</strong></p>
            <div className="contact-item">
              <span>📞</span>
              <div>
                <a href="tel:+919941813565">9941813565</a>
              </div>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <a href="mailto:jaiganeshcatering88@gmail.com">jaiganeshcatering88@gmail.com</a>
            </div>
          </div>

          <div className="footer-locations">
            <h3>Our Locations</h3>
            <div className="location-item">
              <strong>Head Office:</strong>
              <p>No. 4/15, Elaiyalwar Koil Street,<br/>West Saidapet, Chennai - 600 015.</p>
            </div>
            <div className="location-item" style={{ marginTop: '15px' }}>
              <strong>Branch:</strong>
              <p>Orikkai,<br/>Kanchipuram - 631502.</p>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/menu">Digital Menu</Link></li>
              <li><Link href="/events">Recent Celebrations</Link></li>
              <li><Link href="/plan">Request a Quote</Link></li>
              <li><Link href="/admin/login">Admin Login</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {year} Jai Ganesh Catering & Service. All rights reserved.</p>
          <div className="bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--charcoal);
          color: var(--ivory);
          padding: 80px 0 30px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .brand-primary {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--rich-gold);
          margin-bottom: 5px;
        }

        .brand-secondary {
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .brand-tagline {
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
        }

        .brand-tagline2 {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        h3 {
          font-family: var(--font-sans);
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
        }

        h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--rich-gold);
        }

        .contact-item {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.8);
        }

        .contact-item a {
          color: rgba(255, 255, 255, 0.8);
        }

        .contact-item a:hover {
          color: var(--rich-gold);
        }

        .location-item p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin-top: 5px;
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-links a:hover {
          color: var(--rich-gold);
          padding-left: 5px;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          font-size: 0.9rem;
        }

        .social-links a:hover {
          background-color: var(--rich-gold);
          color: var(--royal-purple-dark);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .bottom-links {
          display: flex;
          gap: 20px;
        }

        .bottom-links a {
          color: rgba(255, 255, 255, 0.6);
        }

        .bottom-links a:hover {
          color: #fff;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
