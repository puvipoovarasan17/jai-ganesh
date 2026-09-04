"use client";

import Navbar from '../components/Navbar';
import Link from 'next/link';
import ExperienceGallery from '../components/ExperienceGallery';
export default function SEOLanding({
  title,
  subtitle,
  serviceHighlight,
  location,
  description,
}) {
  return (
    <main>
      <Navbar />
      
      {/* 01. CINEMATIC HERO */}
      <section className="hero">
        <div className="animated-bg-wrapper">
          <div className="animated-bg-image"></div>
          <div className="animated-particles"></div>
        </div>
        <div className="hero-overlay"></div>
        
        <div className="container hero-content">
          <div className="hero-text-wrapper fade-in">
            <div className="hero-logo-box">
              <img src="/brand-logo.jpg" alt="Jai Ganesh Logo" className="hero-brand-logo" />
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              {title.split('|')[0]}<br />
              <span className="hero-highlight">{title.split('|')[1] || location}</span>
            </h1>
            <p className="hero-subtitle">
              We Serve... You Celebrate...<br />
              <span className="hero-subtext">{serviceHighlight}</span>
            </p>
            <div className="hero-actions">
              <Link href="/plan" className="btn-primary">Plan Your {location} Event</Link>
              <Link href="/events" className="btn-outline">Explore Our Events</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. UNIQUE SEO TEXT SECTION */}
      <section id="experience" className="section-padding premium-bg-section">
        <div className="container">
          <div className="section-header text-center fade-in">
            <span className="section-subtitle">Why Choose Jai Ganesh in {location}?</span>
            <h2 className="section-title">{subtitle}</h2>
            <div className="gold-divider"></div>
            <p className="section-desc">
              {description} We bring traditional roots, professional hospitality, and modern service to your most important celebrations in {location}.
            </p>
          </div>

          <ExperienceGallery />
        </div>
      </section>



      {/* 04. FINAL CTA */}
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container text-center cta-content fade-in">
          <h2 className="cta-title">WE SERVE. YOU CELEBRATE.</h2>
          <p className="cta-desc">Let us craft the perfect feast for your special day in {location}.</p>
          <div className="cta-actions">
            <Link href="/plan" className="btn-primary">Request a Quote</Link>
            <a href="https://wa.me/919941813565" target="_blank" rel="noopener noreferrer" className="btn-outline btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* HERO */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(22, 10, 33, 0.6) 0%, rgba(22, 10, 33, 0.95) 100%);
          z-index: 2;
        }

        .animated-bg-wrapper {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 1;
        }

        .animated-bg-image {
          width: 100%;
          height: 100%;
          background-image: url('/images/hero_bg.jpg'); /* Premium event setup */
          background-size: cover;
          background-position: center;
          animation: slowZoom 20s infinite alternate;
        }

        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        .hero-content {
          position: relative;
          z-index: 3;
          padding-top: 60px;
        }

        .hero-logo-box {
          margin-bottom: 30px;
          display: flex;
          justify-content: center;
        }

        .hero-brand-logo {
          width: 80px;
          height: 80px;
          object-fit: cover;
          object-position: 10% 50%;
          border-radius: 8px;
          border: 2px solid var(--accent-gold);
          box-shadow: 0 0 30px rgba(194, 155, 87, 0.3);
        }

        .hero-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .hero-highlight {
          color: var(--accent-gold);
          font-style: italic;
          font-weight: 500;
        }

        .hero-subtitle {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          color: var(--warm-ivory);
          margin-bottom: 40px;
          letter-spacing: 1px;
        }

        .hero-subtext {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-muted);
          display: block;
          margin-top: 10px;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        /* SECTION UTILS */
        .premium-bg-section {
          background: linear-gradient(135deg, rgba(35, 17, 53, 0.9) 0%, rgba(22, 10, 33, 0.95) 100%);
          position: relative;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }

        .section-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 20px;
        }

        .section-desc {
          max-width: 600px;
          margin: 0 auto;
        }

        .gold-divider {
          height: 2px;
          width: 60px;
          background-color: var(--accent-gold);
          margin: 0 auto 30px;
        }

        /* EXPERIENCE GRID */
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .exp-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(194, 155, 87, 0.15);
          border-radius: 12px;
          transition: all 0.4s ease;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }

        .exp-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .exp-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .exp-card:hover .exp-img {
          transform: scale(1.08);
        }

        .exp-num-badge {
          position: absolute;
          bottom: -15px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: var(--accent-gold);
          color: var(--bg-deep);
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          z-index: 2;
        }

        .exp-content {
          padding: 30px 25px;
          flex-grow: 1;
        }

        .exp-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
          border-color: rgba(194, 155, 87, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        .exp-title {
          color: var(--accent-gold);
          font-size: 1.5rem;
          margin-bottom: 15px;
          font-family: var(--font-serif);
        }

        /* CTA SECTION */
        .cta-section {
          position: relative;
          padding: 120px 20px;
          background-image: url('/images/events/event_3.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .cta-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(92, 47, 130, 0.85);
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          color: var(--accent-gold);
          margin-bottom: 20px;
        }

        .cta-desc {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: var(--warm-ivory);
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-whatsapp {
          border-color: #25D366;
          color: #25D366;
        }

        .btn-whatsapp:hover {
          background-color: #25D366;
          color: var(--bg-deep);
        }

        @media (max-width: 768px) {
          .experience-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
