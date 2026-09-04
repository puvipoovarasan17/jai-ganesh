"use client";
import { useState, useEffect, Suspense } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

function EventStoryContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ isOpen: false, url: '', type: '' });

  useEffect(() => {
    async function fetchEvent() {
      if (!db || !eventId) return;
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <main className="story-page">
        <Navbar />
        <div className="loading-state">Loading celebration story...</div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="story-page">
        <Navbar />
        <div className="not-found">
          <h2>Story Not Found</h2>
          <Link href="/events" className="btn-outline">Back to Portfolio</Link>
        </div>
      </main>
    );
  }

  const openLightbox = (media) => setLightbox({ isOpen: true, url: media.url, type: media.type });
  const closeLightbox = () => setLightbox({ isOpen: false, url: '', type: '' });

  return (
    <main className="story-page">
      <Navbar />

      {/* Hero Section */}
      <section className="story-hero" style={{ backgroundImage: `url(${event.coverImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80'})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content fade-in">
          <Link href="/events" className="back-btn">← Back to Portfolio</Link>
          <div className="event-meta-top">
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="dot">•</span>
            <span>{event.location}</span>
          </div>
          <h1 className="event-title">{event.title}</h1>
          <div className="event-type">{event.type}</div>
        </div>
      </section>

      {/* Details & Description */}
      <section className="story-details">
        <div className="container">
          <div className="details-grid">
            <div className="description fade-in">
              <h2>About this Celebration</h2>
              <div className="gold-divider left"></div>
              <p>{event.description}</p>
            </div>
            
            <div className="stats-box fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="stat-item">
                <span className="stat-label">Guest Count</span>
                <span className="stat-value">{event.guestCount || 'Not specified'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Food Preference</span>
                <span className="stat-value">{event.foodType || 'Veg'}</span>
              </div>
              <div className="stat-item cta">
                <p>Want a similar experience?</p>
                <Link href="/plan" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>Plan Yours Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="story-gallery bg-texture">
          <div className="container">
            <div className="section-header text-center fade-in">
              <span className="section-subtitle">Event Memories</span>
              <h2 className="section-title" style={{ color: 'var(--warm-ivory)' }}>Photo & Video Gallery</h2>
              <div className="gold-divider"></div>
            </div>

            <div className="media-masonry">
              {event.gallery.map((media, index) => (
                <div key={index} className="media-item fade-in" style={{ animationDelay: `${(index % 4) * 0.1}s` }} onClick={() => media.type !== 'video_link' && openLightbox(media)}>
                  
                  {media.type === 'video_link' ? (
                    <div className="video-embed-wrapper">
                      {/* Very basic embed detection for YouTube. In a real app, use a dedicated embed parser */}
                      {media.url.includes('youtube.com') || media.url.includes('youtu.be') ? (
                        <iframe 
                          src={`https://www.youtube.com/embed/${media.url.includes('v=') ? media.url.split('v=')[1].split('&')[0] : media.url.split('youtu.be/')[1]}`} 
                          title="YouTube video player" frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        ></iframe>
                      ) : (
                         <a href={media.url} target="_blank" rel="noreferrer" className="external-link-card">
                           <span className="play-icon">▶</span>
                           Watch Video
                         </a>
                      )}
                    </div>
                  ) : media.type === 'video' ? (
                    <div className="video-wrapper">
                      <video src={media.url} muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}></video>
                      <div className="play-overlay">▶</div>
                    </div>
                  ) : (
                    <div className="image-wrapper">
                      <img src={media.url} alt={`Gallery ${index}`} loading="lazy" />
                      <div className="zoom-overlay">🔍</div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="close-btn" onClick={closeLightbox}>×</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.url} controls autoPlay className="lightbox-media"></video>
            ) : (
              <img src={lightbox.url} alt="Enlarged" className="lightbox-media" />
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .story-page {
          background-color: transparent;
          min-height: 100vh;
        }

        .loading-state, .not-found {
          padding: 150px 20px;
          text-align: center;
          color: var(--charcoal);
          font-family: var(--font-sans);
        }
        
        .not-found h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        /* HERO */
        .story-hero {
          position: relative;
          min-height: 60vh;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          display: flex;
          align-items: flex-end;
          padding-bottom: 60px;
        }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(20, 17, 21, 0.2) 0%, rgba(20, 17, 21, 0.95) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }
        .back-btn {
          display: inline-block;
          color: var(--accent-gold);
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.85rem;
        }
        .event-meta-top {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--warm-ivory-dim);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .dot { color: var(--accent-gold); }
        .event-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--warm-ivory);
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .event-type {
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
        }

        /* DETAILS */
        .story-details {
          padding: 80px 0;
          background-color: var(--bg-primary);
        }
        .details-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 60px;
        }
        .description h2 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--charcoal);
          margin-bottom: 20px;
        }
        .description p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--charcoal-light);
          white-space: pre-wrap;
        }
        .gold-divider.left {
          height: 2px; width: 60px; background-color: var(--accent-gold); margin-bottom: 30px;
        }
        
        .stats-box {
          background: #f9fafb;
          border: 1px solid rgba(194, 155, 87, 0.3);
          padding: 30px;
          border-radius: 4px;
        }
        .stat-item {
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .stat-item:last-child {
          border-bottom: none;
          margin-bottom: 0; padding-bottom: 0;
        }
        .stat-label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--charcoal-light);
          margin-bottom: 5px;
        }
        .stat-value {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--royal-purple-dark);
        }
        .stat-item.cta p {
          margin-bottom: 15px;
          font-weight: 600;
          color: var(--charcoal);
        }

        /* GALLERY */
        .story-gallery {
          padding: 100px 0;
          background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
          background-color: var(--bg-deep);
        }
        .section-subtitle {
          color: var(--accent-gold); text-transform: uppercase; letter-spacing: 3px; font-weight: 600; font-size: 0.9rem;
        }
        .gold-divider {
          height: 2px; width: 60px; background-color: var(--accent-gold); margin: 20px auto 40px;
        }
        
        .media-masonry {
          column-count: 3;
          column-gap: 20px;
        }
        .media-item {
          break-inside: avoid;
          margin-bottom: 20px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          background: #2a2a2a;
          cursor: pointer;
        }
        .image-wrapper img, .video-wrapper video {
          width: 100%;
          display: block;
          transition: transform 0.4s ease;
        }
        .media-item:hover img, .media-item:hover video {
          transform: scale(1.03);
        }
        
        .zoom-overlay, .play-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(20,17,21,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; color: white;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .media-item:hover .zoom-overlay, .media-item:hover .play-overlay {
          opacity: 1;
        }
        
        .video-embed-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
        }
        .video-embed-wrapper iframe {
          width: 100%; height: 100%; display: block;
        }
        .external-link-card {
          width: 100%; height: 200px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #1a1a1a; color: white; text-decoration: none;
          font-weight: 600; letter-spacing: 1px; transition: background 0.3s;
        }
        .external-link-card:hover { background: #333; color: var(--accent-gold); }
        .play-icon { font-size: 2rem; margin-bottom: 10px; color: var(--accent-gold); }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.95);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 40px;
        }
        .close-btn {
          position: absolute; top: 20px; right: 30px;
          background: transparent; border: none;
          color: white; font-size: 3rem; cursor: pointer;
        }
        .lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
        }
        .lightbox-media {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }

        @media (max-width: 992px) {
          .details-grid { grid-template-columns: 1fr; }
          .media-masonry { column-count: 2; }
        }
        @media (max-width: 576px) {
          .media-masonry { column-count: 1; }
          .event-title { font-size: 2.2rem; }
        }
      `}</style>
    </main>
  );
}

export default function EventStory() {
  return (
    <Suspense fallback={<div>Loading story...</div>}>
      <EventStoryContent />
    </Suspense>
  );
}
