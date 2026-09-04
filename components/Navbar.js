"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <div className="brand-logo-container">
            <img src="/brand-logo.jpg" alt="Jai Ganesh Catering" className="brand-logo-img" />
          </div>
          <div className="brand-text">
            <span className="brand-title">JAI GANESH</span>
            <span className="brand-subtitle">CATERING & SERVICE</span>
            <span 
              className="brand-phone" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = "tel:9941813565";
              }}
              style={{ cursor: 'pointer' }}
            >
              📞 <span className="brand-phone-text">9941813565</span>
            </span>
          </div>
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</Link>
          <Link href="/events" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Events</Link>
          <Link href="/menu" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
          <Link href="/plan" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Plan Event</Link>
        </div>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 80px;
          background-color: transparent;
          transition: all 0.4s ease;
          z-index: 1000;
        }

        .navbar.scrolled {
          background-color: rgba(20, 17, 21, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(194, 155, 87, 0.2);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40px;
          height: 100%;
          max-width: 1440px;
          margin: 0 auto;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 15px;
        }

        .brand-logo-img {
          width: 55px;
          height: 55px;
          object-fit: contain;
          object-position: center;
          border-radius: 4px;
          background-color: white; /* Added white background in case it's transparent */
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(194, 155, 87, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 1.4rem;
          color: var(--warm-ivory);
          line-height: 1.1;
          letter-spacing: 0.5px;
        }

        .brand-subtitle {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.65rem;
          color: var(--accent-gold);
          letter-spacing: 2px;
        }

        .brand-phone {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.75rem;
          color: var(--warm-ivory);
          margin-top: 2px;
        }
        
        .brand-phone .brand-phone-text {
          transition: color 0.3s ease;
        }
        
        .brand-phone:hover .brand-phone-text {
          color: var(--accent-gold);
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          color: var(--warm-ivory-dim);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--accent-gold);
        }

        .nav-btn {
          background-color: var(--accent-gold);
          color: var(--bg-deep);
          padding: 10px 24px;
          border-radius: 2px;
          font-weight: 600;
          font-size: 0.85rem;
          border: 1px solid var(--accent-gold);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background-color: transparent;
          color: var(--accent-gold);
        }

        .mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: var(--warm-ivory);
  cursor: pointer;
}
       @media (max-width: 992px) {
  .nav-container {
    padding: 0 20px;
  }

  .nav-links {
    position: fixed;
    top: 80px;
    right: -100%;
    width: 100%;
    height: calc(100dvh - 80px);

    background: var(--bg-deep);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 28px;
    padding: 30px 20px;

    overflow-y: auto;

    transition: right 0.35s ease;

    z-index: 999;
  }

  .nav-links.open {
    right: 0;
  }

  .nav-links .nav-link {
    color: var(--warm-ivory) !important;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .nav-links .nav-link:hover {
    color: var(--accent-gold) !important;
  }

  .nav-links .nav-btn {
    background: var(--accent-gold);
    color: var(--bg-deep) !important;
    padding: 14px 28px;
    font-size: 0.9rem;
    margin-top: 10px;
  }

  .mobile-toggle {
    display: block;
    position: relative;
    z-index: 1001;
    background: transparent;
    border: none;
    color: var(--warm-ivory);
    font-size: 2rem;
    line-height: 1;
    padding: 8px;
    cursor: pointer;
  }
      }
    `}</style>
    </nav>
  );
}