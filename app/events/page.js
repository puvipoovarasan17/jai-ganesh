"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function EventsPortfolio() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!db) {
        setError("Database configuration missing.");
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, "events"), where("isPublished", "==", true));
        const querySnapshot = await getDocs(q);
        
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort in memory to avoid needing a composite index in Firestore
        fetchedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <main className="events-page">
      <Navbar />
      
      <div className="events-header">
        <div className="container center">
          <span className="section-subtitle fade-in">Our Portfolio</span>
          <h1 className="page-title fade-in" style={{ animationDelay: '0.1s' }}>Recent Celebrations</h1>
          <div className="gold-divider" style={{ margin: '0 auto 20px' }}></div>
          <p className="page-desc fade-in" style={{ animationDelay: '0.2s' }}>
            Every event is a unique story. Explore our premium portfolio of memorable celebrations.
          </p>
        </div>
      </div>

      <section className="editorial-portfolio">
        <div className="container">
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading stories...</p>
            </div>
          ) : error ? (
            <div className="empty-state fade-in" style={{ backgroundImage: 'none', backgroundColor: 'var(--bg-primary)' }}>
              <div className="empty-state-content">
                <h2 style={{ color: '#ff6b6b' }}>Oops, something went wrong.</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn-outline" style={{ marginTop: '20px' }}>Retry</button>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state fade-in">
              <div className="empty-state-overlay"></div>
              <div className="empty-state-content">
                <h2>New celebrations are coming soon.</h2>
                <p>We are currently updating our portfolio with our latest events.</p>
              </div>
            </div>
          ) : (
            <div className="masonry-grid">
              {events.map((evt, idx) => (
                <Link href={`/events/story?id=${evt.id}`} key={evt.id} className={`event-story-card ${idx % 3 === 0 ? 'large' : 'standard'} fade-in`} style={{ animationDelay: `${(idx % 4) * 0.1}s`, display: 'block' }}>
                  {evt.coverImage ? (
                    <div className="event-cover" style={{ backgroundImage: `url(${evt.coverImage})` }}></div>
                  ) : (
                    <div className="event-cover placeholder"></div>
                  )}
                  <div className="event-story-overlay">
                    <div className="event-meta">
                      <span className="event-date">
                        {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="event-location">{evt.location}</span>
                    </div>
                    <h3 className="event-title">{evt.title}</h3>
                    <div className="event-category">{evt.type}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Real Experience Gallery Section */}
      <section className="real-gallery-section">
        <div className="container">
          <div className="center" style={{ marginBottom: '60px' }}>
            <span className="section-subtitle">Our Real Work</span>
            <h2 className="gallery-heading">Moments We've Served With Love</h2>
            <div className="gold-divider" style={{ margin: '0 auto 20px' }}></div>
            <p style={{ color: 'var(--warm-ivory-dim)', maxWidth: '600px', margin: '0 auto' }}>
              Real weddings and celebrations catered by Jai Ganesh Catering & Service — memories we are proud to be part of.
            </p>
          </div>

          <div className="real-gallery-grid">
            <div className="rg-item rg-large">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/experience/exp1.jpg" alt="Event Gathering catered by Jai Ganesh" loading="lazy" />
              <div className="rg-overlay">
                <span>Event Gathering</span>
              </div>
            </div>
            <div className="rg-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/experience/exp2.png" alt="Jai Ganesh Catering Services" loading="lazy" />
              <div className="rg-overlay">
                <span>Jai Ganesh Catering Services</span>
              </div>
            </div>
            <div className="rg-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/experience/exp3.png" alt="Catering Setup by Jai Ganesh" loading="lazy" />
              <div className="rg-overlay">
                <span>Catering Setup</span>
              </div>
            </div>
            <div className="rg-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/experience/exp4.jpg" alt="Event Guest" loading="lazy" />
              <div className="rg-overlay">
                <span>Event Guest</span>
              </div>
            </div>
            <div className="rg-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/experience/exp5.png" alt="Happy Marriage Life catered by Jai Ganesh" loading="lazy" />
              <div className="rg-overlay">
                <span>Happy Marriage Life</span>
              </div>
            </div>
          </div>

          <div className="center" style={{ marginTop: '60px' }}>
            <a href="tel:9941813565" className="btn-outline" style={{ display: 'inline-block', padding: '16px 48px', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', borderRadius: '2px', letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}>
              Book Your Event — 9941813565
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .events-page {
          background-color: transparent;
          min-height: 100vh;
        }

        .events-header {
          padding: 180px 20px 80px;
          background-color: var(--bg-primary);
          text-align: center;
          border-bottom: 1px solid rgba(194, 155, 87, 0.1);
        }

        .page-title {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 5vw, 4.5rem);
          color: var(--warm-ivory);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .page-desc {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          color: var(--warm-ivory-dim);
        }

        .editorial-portfolio {
          padding: 100px 0;
          background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
        }

        .loading-state {
          text-align: center;
          padding: 100px 20px;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(194, 155, 87, 0.3);
          border-radius: 50%;
          border-top-color: var(--accent-gold);
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .real-gallery-section {
          padding: 100px 0;
          background-color: var(--bg-deep);
        }

        .gallery-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--warm-ivory);
          margin-bottom: 20px;
        }

        .real-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 16px;
        }

        .rg-item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          aspect-ratio: 4/3;
          cursor: pointer;
        }

        .rg-item.rg-large {
          grid-column: span 3;
          aspect-ratio: 16/7;
        }

        .rg-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .rg-item:hover img {
          transform: scale(1.07);
        }

        .rg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 8, 12, 0.85) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .rg-item:hover .rg-overlay {
          opacity: 1;
        }

        .rg-overlay span {
          color: var(--warm-ivory);
          font-family: var(--font-serif);
          font-size: 1.4rem;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .real-gallery-grid {
            grid-template-columns: 1fr;
          }
          .rg-item.rg-large {
            grid-column: span 1;
            aspect-ratio: 4/3;
          }
        }

        .empty-state {
          position: relative;
          text-align: center;
          padding: 150px 20px;
          border-radius: 4px;
          overflow: hidden;
          background-image: url('/images/events/event_5.jpg');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(194, 155, 87, 0.2);
          box-shadow: var(--shadow-lg);
        }


        .empty-state-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(20, 17, 21, 0.85);
          z-index: 1;
        }

        .empty-state-content {
          position: relative;
          z-index: 2;
        }

        .empty-state h2 {
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin-bottom: 15px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .empty-state p {
          color: var(--warm-ivory);
          font-size: 1.1rem;
        }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 40px;
        }

        .event-story-card {
          position: relative;
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          background-color: var(--bg-primary);
          border: 1px solid rgba(194, 155, 87, 0.1);
        }

        .event-story-card.large {
          grid-column: span 12;
          height: 500px;
        }

        .event-story-card.standard {
          grid-column: span 6;
          height: 400px;
        }

        .event-cover {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .event-cover.placeholder {
          background-color: var(--bg-secondary);
        }

        .event-story-card:hover .event-cover {
          transform: scale(1.05);
        }

        .event-story-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 40px;
          background: linear-gradient(to top, rgba(20, 17, 21, 0.95) 0%, rgba(20, 17, 21, 0) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          pointer-events: none;
        }

        .event-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent-gold);
        }

        .event-location {
          color: var(--warm-ivory-dim);
        }

        .event-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3vw, 2.8rem);
          color: var(--warm-ivory);
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .event-category {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 992px) {
          .event-story-card.standard {
            grid-column: span 12;
            height: 350px;
          }
          .event-story-overlay {
            padding: 30px;
          }
        }
      `}</style>
    </main>
  );
}
