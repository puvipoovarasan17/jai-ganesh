"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CelebrationGallery from '../../components/CelebrationGallery';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function EventsPortfolio() {
  const [publishedStories, setPublishedStories] = useState([]);

  // Graceful database check: If firestore is configured and has custom stories, load them.
  // NEVER throw, block, or display database errors to customers.
  useEffect(() => {
    async function fetchCustomStories() {
      if (!db) {
        // Database not configured - silently proceed with static portfolio
        return;
      }
      try {
        const q = query(collection(db, "events"), where("isPublished", "==", true));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        fetched.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setPublishedStories(fetched);
      } catch (err) {
        // Silently catch error - never expose technical / database error UI to visitors
        console.warn("Notice: Custom stories offline, using static celebration portfolio.");
      }
    }
    fetchCustomStories();
  }, []);

  return (
    <main className="events-page">
      <Navbar />

      {/* Hero Header */}
      <div className="events-header">
        <div className="container text-center">
          <span className="section-subtitle fade-in">Our Portfolio</span>
          <h1 className="page-title fade-in" style={{ animationDelay: '0.1s' }}>
            Recent Celebrations
          </h1>
          <div className="gold-divider" style={{ margin: '0 auto 24px' }}></div>
          <p className="page-desc fade-in" style={{ animationDelay: '0.2s' }}>
            Every event is a unique story. Explore our authentic portfolio of memorable celebrations, weddings, and prestigious banquets.
          </p>
        </div>
      </div>

      {/* Main Section: OUR REAL WORK */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-heading-box text-center fade-in">
            <span className="section-badge">OUR REAL WORK</span>
            <h2 className="section-heading">Moments We've Served With Love</h2>
            <div className="gold-divider" style={{ margin: '0 auto 20px' }}></div>
            <p className="section-subtitle-text">
              Real weddings, celebrations and special occasions catered by Jai Ganesh Catering &amp; Service — memories we are proud to be part of.
            </p>
          </div>

          {/* Dynamic Event Stories (if available from CMS) */}
          {publishedStories.length > 0 && (
            <div className="custom-stories-wrapper fade-in">
              <h3 className="custom-stories-title">Featured Event Stories</h3>
              <div className="custom-stories-grid">
                {publishedStories.map((evt) => (
                  <Link href={`/events/story?id=${evt.id}`} key={evt.id} className="custom-story-card">
                    {evt.coverImage ? (
                      <div className="custom-story-cover" style={{ backgroundImage: `url(${evt.coverImage})` }}></div>
                    ) : (
                      <div className="custom-story-cover placeholder"></div>
                    )}
                    <div className="custom-story-overlay">
                      <div className="story-meta">
                        <span>{new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{evt.location || 'Chennai'}</span>
                      </div>
                      <h4 className="story-title">{evt.title}</h4>
                      <span className="story-type">{evt.type || 'Wedding Catering'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Real Celebrations Masonry Gallery (All 19 Uploaded Photos) */}
          <CelebrationGallery />

          {/* Bottom Booking Banner */}
          <div className="booking-cta-banner fade-in">
            <div className="cta-banner-content text-center">
              <h3 className="cta-banner-title">Crafting Unforgettable Feasts For Your Big Day</h3>
              <p className="cta-banner-desc">
                From traditional South Indian wedding thalis to grand contemporary evening banquets, Jai Ganesh Catering &amp; Service is honored to serve your guests with genuine love and top-tier hospitality.
              </p>
              <div className="cta-banner-buttons">
                <Link href="/plan" className="btn-primary">
                  Plan Your Celebration
                </Link>
                <a href="tel:9941813565" className="btn-outline-gold">
                  Direct Line: 9941813565
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .events-page {
          background-color: transparent;
          min-height: 100vh;
        }

        .events-header {
          padding: 170px 20px 70px;
          background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-primary) 100%);
          text-align: center;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
        }

        .page-title {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          color: var(--warm-ivory);
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .page-desc {
          font-size: 1.15rem;
          max-width: 650px;
          margin: 0 auto;
          color: var(--warm-ivory-dim);
          line-height: 1.6;
        }

        .portfolio-section {
          padding: 80px 0 120px;
          background: radial-gradient(circle at 50% 20%, rgba(92, 47, 130, 0.12) 0%, transparent 70%);
        }

        .section-heading-box {
          margin-bottom: 50px;
        }

        .section-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--accent-gold);
          margin-bottom: 12px;
          padding: 4px 16px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 20px;
          border: 1px solid rgba(212, 175, 55, 0.25);
        }

        .section-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          color: var(--warm-ivory);
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .section-subtitle-text {
          color: var(--warm-ivory-dim);
          font-size: 1.15rem;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.65;
          font-style: italic;
        }

        .gold-divider {
          height: 2px;
          width: 70px;
          background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
        }

        /* Dynamic Stories (CMS) */
        .custom-stories-wrapper {
          margin-bottom: 70px;
          padding: 30px;
          background: rgba(35, 17, 53, 0.5);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 12px;
        }

        .custom-stories-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--accent-gold);
          margin-bottom: 24px;
          text-align: center;
        }

        .custom-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .custom-story-card {
          position: relative;
          height: 320px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.2);
          text-decoration: none;
          display: block;
        }

        .custom-story-cover {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .custom-story-card:hover .custom-story-cover {
          transform: scale(1.06);
        }

        .custom-story-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(16, 7, 26, 0.95) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
        }

        .story-meta {
          display: flex;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .story-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--warm-ivory);
          margin-bottom: 4px;
        }

        .story-type {
          font-size: 0.8rem;
          color: var(--warm-ivory-dim);
        }

        /* Bottom Booking Banner */
        .booking-cta-banner {
          margin-top: 80px;
          padding: 60px 40px;
          background: linear-gradient(135deg, rgba(45, 22, 69, 0.85) 0%, rgba(22, 10, 33, 0.95) 100%);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .booking-cta-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
        }

        .cta-banner-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-banner-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          color: var(--accent-gold);
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .cta-banner-desc {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          color: var(--warm-ivory-dim);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .cta-banner-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
          color: var(--bg-deep);
          padding: 14px 34px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.5);
        }

        .btn-outline-gold {
          display: inline-block;
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          padding: 14px 34px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-outline-gold:hover {
          background: rgba(212, 175, 55, 0.15);
          color: var(--warm-ivory);
        }

        @media (max-width: 768px) {
          .events-header {
            padding: 130px 20px 50px;
          }
          .portfolio-section {
            padding: 50px 0 80px;
          }
          .booking-cta-banner {
            padding: 40px 20px;
            margin-top: 50px;
          }
        }
      `}</style>
    </main>
  );
}
