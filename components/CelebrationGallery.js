"use client";

import { useState, useEffect, useCallback } from 'react';

export const CELEBRATION_PHOTOS = [
  ,
  {
    id: 9,
    url: '/images/celebrations/celebration-09.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0020.jpg',
    title: 'With Political Leader Seeman',
    category: 'VIP Guests',
    categoryKey: 'vip',
    tag: 'Dignitary Visit',
    description: 'Welcoming esteemed Tamil political leader Seeman at a high-profile banquet celebration.',
    gridSpan: 'tall',
    alt: 'Jai Ganesh Catering founder M. Balaji with political leader Seeman'
  },
  ,
  {
    id: 13,
    url: '/images/celebrations/celebration-13.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0019.jpg',
    title: 'Night Outdoor Shamiana Catering Service',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Outdoor Service',
    description: 'Flawless night outdoor catering operation with shamiana canopies and live food stations.',
    gridSpan: 'tall',
    alt: 'Night outdoor catering setup with shamiana tents and food counters'
  },
  ,
  {
    id: 17,
    url: '/images/celebrations/celebration-17.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0021.jpg',
    title: 'Festive Mandapam Service Moments',
    category: 'Weddings',
    categoryKey: 'weddings',
    tag: 'Festive Mandapam',
    description: 'Celebrating timeless wedding moments against traditional yellow and red draped backdrops.',
    gridSpan: 'tall',
    alt: 'Traditional wedding mandapam catering service'
  },
  ,
  {
    id: 15,
    url: '/images/celebrations/celebration-15.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0019.jpg',
    title: 'Warm Client Smile & Lasting Relations',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Client Delight',
    description: 'Genuine warmth and client appreciation following our delicious vegetarian feast.',
    gridSpan: 'standard',
    alt: 'Joyful moment with satisfied client at catered event'
  },
  {
    id: 1,
    url: '/images/celebrations/celebration-01.jpg',
    fallbackUrl: '/images/experience/exp1.jpg',
    title: 'Grand Wedding Stage Celebration',
    category: 'Weddings',
    categoryKey: 'weddings',
    tag: 'Grand Stage',
    description: 'Auspicious wedding ceremony with bride, groom, and family on the decorated floral stage.',
    gridSpan: 'featured',
    alt: 'Grand wedding stage group celebration catered by Jai Ganesh Catering and Service'
  },
  ,
  {
    id: 2,
    url: '/images/celebrations/celebration-02.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0027.jpg',
    title: 'Happy Marriage Life — Hariharan & Meenakshi',
    category: 'Weddings',
    categoryKey: 'weddings',
    tag: 'Wedding Album',
    description: 'Heartfelt wedding memories and couple portrait catered with devotion and authentic taste.',
    gridSpan: 'tall',
    alt: 'Happy Marriage Life celebration album - Jai Ganesh Catering'
  },
  ,
  {
    id: 3,
    url: '/images/celebrations/celebration-03.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0023.jpg',
    title: 'Auspicious Navadhanyam & Ganesha Welcome',
    category: 'Tradition & Decor',
    categoryKey: 'decor',
    tag: 'Auspicious Welcome',
    description: 'Sacred Navadhanyam pots with Lord Ganesha idol and traditional couple welcome setting.',
    gridSpan: 'standard',
    alt: 'Traditional Navadhanyam welcome pots and Lord Ganesha idol'
  },
  ,
  {
    id: 4,
    url: '/images/celebrations/celebration-04.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0021.jpg',
    title: 'Royal Illuminated Buffet Counter Setup',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Royal Buffet',
    description: 'Gleaming golden buffet warmers with decorative green LED illumination and luxury urns.',
    gridSpan: 'wide',
    alt: 'Royal illuminated banquet buffet counters by Jai Ganesh Catering'
  },
  ,
  {
    id: 5,
    url: '/images/celebrations/celebration-05.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0018.jpg',
    title: 'Fresh Rose & Jasmine Floral Welcome Tray',
    category: 'Tradition & Decor',
    categoryKey: 'decor',
    tag: 'Floral Welcome',
    description: 'Fragrant South Indian jasmine and rose petal welcome tray featuring Jai Ganesh Catering cards.',
    gridSpan: 'standard',
    alt: 'Auspicious jasmine and rose petal welcome tray with Jai Ganesh Catering cards'
  },
  ,
  {
    id: 6,
    url: '/images/celebrations/celebration-06.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0022.jpg',
    title: 'Evening Outdoor Lawn Celebration',
    category: 'Celebrations',
    categoryKey: 'weddings',
    tag: 'Lawn Celebration',
    description: 'Grand evening lawn celebration under glittering fairy lights with gracious event hosts.',
    gridSpan: 'wide',
    alt: 'Evening outdoor lawn celebration with event hosts and Jai Ganesh team'
  },
  ,
  {
    id: 7,
    url: '/images/celebrations/celebration-07.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0025.jpg',
    title: 'Tamil Nadu Catering Association Honors',
    category: 'Awards & Honors',
    categoryKey: 'awards',
    tag: 'Association Honor',
    description: 'Distinguished presence on stage during the Tamil Nadu Catering Owners Association festival.',
    gridSpan: 'wide',
    alt: 'Tamil Nadu Catering Owners Association festival stage honor'
  },
  ,
  {
    id: 8,
    url: '/images/celebrations/celebration-08.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0026.jpg',
    title: 'Excellence & Volunteer Award Presentation',
    category: 'Awards & Honors',
    categoryKey: 'awards',
    tag: 'Excellence Award',
    description: 'Founder M. Balaji receiving prestigious award plaque and ceremonial red silk shawl on stage.',
    gridSpan: 'tall',
    alt: 'Award and recognition presentation to Jai Ganesh Catering founder M. Balaji'
  },
  ,
  {
    id: 10,
    url: '/images/celebrations/celebration-10.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0016.jpg',
    title: 'With Former Minister D. Jayakumar',
    category: 'VIP Guests',
    categoryKey: 'vip',
    tag: 'Dignitary Visit',
    description: 'Warm reception with former Tamil Nadu minister D. Jayakumar at a grand wedding ceremony.',
    gridSpan: 'tall',
    alt: 'M. Balaji with former Tamil Nadu minister D. Jayakumar'
  },
  ,
  {
    id: 11,
    url: '/images/celebrations/celebration-11.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0018.jpg',
    title: 'With Renowned Director Pa. Ranjith',
    category: 'VIP Guests',
    categoryKey: 'vip',
    tag: 'Special Guest',
    description: 'Memorable moment with acclaimed film director Pa. Ranjith during an event catering assignment.',
    gridSpan: 'tall',
    alt: 'Jai Ganesh Catering team with film director Pa. Ranjith'
  },
  ,
  {
    id: 12,
    url: '/images/celebrations/celebration-12.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0022.jpg',
    title: 'Banquet Hospitality with Respected Dignitary',
    category: 'VIP Guests',
    categoryKey: 'vip',
    tag: 'Banquet Service',
    description: 'Professional hospitality service in uniform alongside respected VIP guest in golden silk.',
    gridSpan: 'tall',
    alt: 'Distinguished VIP guest at luxury banquet catered by Jai Ganesh'
  },
  ,
  {
    id: 14,
    url: '/images/celebrations/celebration-14.jpg',
    fallbackUrl: '/images/celebrations/IMG-20261002-WA0017.jpg',
    title: 'Traditional Wedding Mandapam Hospitality',
    category: 'Weddings',
    categoryKey: 'weddings',
    tag: 'Mandapam Reception',
    description: 'Delivering warm, personalized hospitality to wedding guests and family elders in silk attire.',
    gridSpan: 'tall',
    alt: 'Wedding reception hospitality by Jai Ganesh Catering'
  },
  ,
  {
    id: 16,
    url: '/images/celebrations/celebration-16.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0024.jpg',
    title: 'Modern Banquet Hall Guest Hospitality',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Hall Hospitality',
    description: 'Personal greeting and guest care in premier AC banquet dining hall in Chennai.',
    gridSpan: 'standard',
    alt: 'Banquet hall guest hospitality by Jai Ganesh service team'
  },
  ,
  {
    id: 18,
    url: '/images/celebrations/celebration-18.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0020.jpg',
    title: 'Event Consultation & Menu Planning',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Menu Planning',
    description: 'In-depth consultation tailoring customized wedding menus to match family traditions.',
    gridSpan: 'standard',
    alt: 'Catering event planning and consultation with client'
  },
  ,
  {
    id: 19,
    url: '/images/celebrations/celebration-19.jpg',
    fallbackUrl: '/images/celebrations/IMG-20260904-WA0023.jpg',
    title: 'Dedicated Hospitality Team Ready to Serve',
    category: 'Buffet & Hospitality',
    categoryKey: 'buffet',
    tag: 'Service Team',
    description: 'Our disciplined, punctual, and courteous service team ready for duty at every celebration.',
    gridSpan: 'standard',
    alt: 'Dedicated Jai Ganesh Catering and Service team members'
  }
];

const CATEGORIES = [
  { key: 'all', label: 'All Celebrations (19)' },
  { key: 'weddings', label: 'Weddings & Stage' },
  { key: 'vip', label: 'VIP & Dignitaries' },
  { key: 'buffet', label: 'Buffet & Hospitality' },
  { key: 'awards', label: 'Awards & Honors' },
  { key: 'decor', label: 'Tradition & Decor' }
];

export default function CelebrationGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const filteredPhotos = activeCategory === 'all'
    ? CELEBRATION_PHOTOS
    : CELEBRATION_PHOTOS.filter(p => p.categoryKey === activeCategory);

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextPhoto();
    if (isRightSwipe) prevPhoto();
  };

  const scrollToGallery = () => {
    const el = document.getElementById('portfolio-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="celebration-gallery-container" id="portfolio-gallery">
      {/* Category Filter Tabs */}
      <div className="gallery-filters fade-in">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
            aria-pressed={activeCategory === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry-Style Gallery Grid */}
      <div className="portfolio-grid">
        {filteredPhotos.map((photo, index) => {
          const isFeatured = photo.gridSpan === 'featured' && activeCategory === 'all';
          const isTall = photo.gridSpan === 'tall';
          const isWide = photo.gridSpan === 'wide';

          let itemClass = 'gallery-card standard';
          if (isFeatured) itemClass = 'gallery-card featured';
          else if (isTall) itemClass = 'gallery-card tall';
          else if (isWide) itemClass = 'gallery-card wide';

          return (
            <div
              key={photo.id}
              className={`${itemClass} fade-in`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
              aria-label={`View ${photo.title}`}
            >
              <div className="image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => {
                    if (photo.fallbackUrl && e.target.src !== photo.fallbackUrl) {
                      e.target.src = photo.fallbackUrl;
                    }
                  }}
                  className="gallery-img"
                />
                
                {/* Subtle Hover Overlay */}
                <div className="hover-overlay">
                  <div className="hover-top">
                    <span className="category-badge">{photo.tag}</span>
                    <span className="photo-num">#{photo.id}</span>
                  </div>
                  
                  <div className="hover-action">
                    <span className="action-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                    <span className="action-text">
                      {isFeatured ? 'View Celebration' : 'View Celebration'}
                    </span>
                  </div>

                  <div className="hover-bottom">
                    <h3 className="hover-title">{photo.title}</h3>
                    <p className="hover-desc">{photo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gallery Action Footer */}
      <div className="gallery-footer-actions text-center fade-in">
        <button
          onClick={scrollToGallery}
          className="btn-primary gallery-cta-btn"
        >
          Explore Our Celebrations
        </button>
        <div className="gallery-cta-links">
          <a href="tel:9941813565" className="btn-outline-gold">
            Call 9941813565
          </a>
          <a
            href="https://wa.me/919941813565?text=Hi%20Jai%20Ganesh%20Catering%2C%20I%20saw%20your%20celebrations%20gallery%20and%20would%20like%20to%20inquire%20for%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-cta"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Celebration Image Lightbox"
        >
          {/* Lightbox Header / Controls */}
          <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-counter">
              <span className="counter-current">{lightboxIndex + 1}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">{filteredPhotos.length}</span>
            </div>

            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            className="lightbox-nav-btn prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="lightbox-nav-btn next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next image"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Lightbox Content */}
          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.url}
                alt={currentPhoto.alt}
                className="lightbox-image"
                onError={(e) => {
                  if (currentPhoto.fallbackUrl && e.target.src !== currentPhoto.fallbackUrl) {
                    e.target.src = currentPhoto.fallbackUrl;
                  }
                }}
              />
            </div>

            <div className="lightbox-caption">
              <div className="caption-meta">
                <span className="caption-category">{currentPhoto.category}</span>
                <span className="caption-tag">{currentPhoto.tag}</span>
              </div>
              <h3 className="caption-title">{currentPhoto.title}</h3>
              <p className="caption-desc">{currentPhoto.description}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .celebration-gallery-container {
          width: 100%;
          position: relative;
        }

        /* Filter Tabs */
        .gallery-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 45px;
          padding: 0 10px;
        }

        .filter-btn {
          background: rgba(45, 22, 69, 0.6);
          color: var(--warm-ivory-dim);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 30px;
          padding: 10px 22px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .filter-btn:hover {
          background: rgba(92, 47, 130, 0.5);
          color: var(--warm-ivory);
          border-color: var(--accent-gold);
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
          color: var(--bg-deep);
          border-color: var(--accent-gold-light);
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
        }

        /* Masonry Grid (4 columns desktop) */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 240px;
          grid-auto-flow: dense;
          gap: 20px;
          margin-bottom: 50px;
        }

        /* Gallery Cards */
        .gallery-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-primary);
          border: 1px solid rgba(212, 175, 55, 0.18);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      border-color 0.35s ease;
        }

        .gallery-card.featured {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-card.tall {
          grid-row: span 2;
        }

        .gallery-card.wide {
          grid-column: span 2;
        }

        .gallery-card.standard {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.65);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(212, 175, 55, 0.18);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.03);
        }

        /* Hover Overlay */
        .hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(18, 8, 28, 0.94) 0%,
            rgba(26, 12, 40, 0.6) 45%,
            rgba(26, 12, 40, 0.15) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .gallery-card:hover .hover-overlay {
          opacity: 1;
        }

        .hover-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-badge {
          background: rgba(212, 175, 55, 0.22);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--accent-gold-light);
          padding: 4px 12px;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .photo-num {
          color: rgba(255, 255, 255, 0.5);
          font-family: var(--font-serif);
          font-size: 0.85rem;
          font-style: italic;
        }

        .hover-action {
          align-self: center;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(22, 10, 33, 0.82);
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold-light);
          padding: 8px 18px;
          border-radius: 30px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          transform: translateY(10px);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gallery-card:hover .hover-action {
          transform: translateY(0);
        }

        .action-icon {
          display: flex;
          align-items: center;
        }

        .hover-bottom {
          transform: translateY(6px);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gallery-card:hover .hover-bottom {
          transform: translateY(0);
        }

        .hover-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--warm-ivory);
          line-height: 1.3;
          margin-bottom: 6px;
        }

        .featured .hover-title {
          font-size: 1.5rem;
        }

        .hover-desc {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--warm-ivory-dim);
          line-height: 1.4;
          margin-bottom: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Gallery Footer Actions */
        .gallery-footer-actions {
          margin-top: 20px;
          padding-top: 30px;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .gallery-cta-btn {
          display: inline-block;
          padding: 16px 40px;
          font-size: 0.95rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
          color: var(--bg-deep);
          border: 1px solid var(--accent-gold-light);
          border-radius: 4px;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }

        .gallery-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(212, 175, 55, 0.45);
        }

        .gallery-cta-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .btn-outline-gold {
          display: inline-block;
          padding: 12px 30px;
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          border-radius: 4px;
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-outline-gold:hover {
          background: rgba(212, 175, 55, 0.15);
          color: var(--warm-ivory);
        }

        .btn-whatsapp-cta {
          display: inline-block;
          padding: 12px 30px;
          border: 1px solid #25D366;
          color: #25D366;
          border-radius: 4px;
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-whatsapp-cta:hover {
          background: #25D366;
          color: var(--bg-deep);
        }

        /* Lightbox Modal */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 4, 18, 0.96);
          backdrop-filter: blur(14px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: lightboxFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-header {
          position: absolute;
          top: 20px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100001;
        }

        .lightbox-counter {
          background: rgba(35, 17, 53, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 6px 16px;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--warm-ivory);
          letter-spacing: 1px;
        }

        .counter-current {
          color: var(--accent-gold);
          font-weight: 700;
        }

        .counter-sep {
          margin: 0 5px;
          color: var(--text-muted);
        }

        .counter-total {
          color: var(--warm-ivory-dim);
        }

        .lightbox-close-btn {
          width: 44px;
          height: 44px;
          background: rgba(35, 17, 53, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--warm-ivory);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .lightbox-close-btn:hover {
          background: var(--accent-gold);
          color: var(--bg-deep);
          border-color: var(--accent-gold-light);
          transform: rotate(90deg);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          background: rgba(35, 17, 53, 0.75);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: var(--warm-ivory);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100001;
          transition: all 0.25s ease;
        }

        .lightbox-nav-btn:hover {
          background: var(--accent-gold);
          color: var(--bg-deep);
          border-color: var(--accent-gold-light);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .lightbox-nav-btn.prev {
          left: 20px;
        }

        .lightbox-nav-btn.next {
          right: 20px;
        }

        .lightbox-body {
          position: relative;
          max-width: 1080px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 100000;
          animation: lightboxScaleUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes lightboxScaleUp {
          from { transform: scale(0.94); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-image-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 90vw;
          max-height: 72vh;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(92, 47, 130, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .lightbox-image {
          max-width: 90vw;
          max-height: 72vh;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .lightbox-caption {
          margin-top: 16px;
          text-align: center;
          max-width: 750px;
          padding: 0 16px;
        }

        .caption-meta {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .caption-category {
          color: var(--accent-gold);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .caption-tag {
          color: var(--warm-ivory-dim);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .caption-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--warm-ivory);
          margin-bottom: 6px;
          line-height: 1.25;
        }

        .caption-desc {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--warm-ivory-dim);
          line-height: 1.45;
          margin-bottom: 0;
        }

        /* Responsive Layouts */
        @media (max-width: 1100px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 220px;
            gap: 16px;
          }
          .gallery-card.featured {
            grid-column: span 2;
            grid-row: span 2;
          }
          .gallery-card.wide {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 210px;
            gap: 14px;
          }
          .gallery-card.featured {
            grid-column: span 2;
            grid-row: span 2;
          }
          .gallery-card.wide {
            grid-column: span 2;
          }
          .gallery-card.tall {
            grid-row: span 2;
          }
          .lightbox-nav-btn {
            width: 42px;
            height: 42px;
          }
          .lightbox-nav-btn.prev {
            left: 10px;
          }
          .lightbox-nav-btn.next {
            right: 10px;
          }
          .lightbox-image-box {
            max-height: 65vh;
          }
          .lightbox-image {
            max-height: 65vh;
          }
          .caption-title {
            font-size: 1.15rem;
          }
          .caption-desc {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 520px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 270px;
            gap: 16px;
          }
          .gallery-card.featured,
          .gallery-card.tall,
          .gallery-card.wide,
          .gallery-card.standard {
            grid-column: span 1;
            grid-row: span 1;
          }
          .gallery-card.featured {
            height: 330px;
          }
          .hover-overlay {
            opacity: 1;
            background: linear-gradient(
              to top,
              rgba(18, 8, 28, 0.94) 0%,
              rgba(26, 12, 40, 0.4) 50%,
              transparent 100%
            );
          }
          .hover-action {
            transform: translateY(0);
            padding: 6px 14px;
            font-size: 0.72rem;
          }
          .gallery-filters {
            gap: 8px;
          }
          .filter-btn {
            padding: 8px 16px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </div>
  );
}
