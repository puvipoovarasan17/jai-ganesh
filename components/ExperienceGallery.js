"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Real event photos from Jai Ganesh Catering & Service
const STATIC_PHOTOS = [
  { id: 's1', url: '/images/experience/exp1.jpg', altText: 'Event Gathering — Jai Ganesh Catering' },
  { id: 's2', url: '/images/experience/exp2.png', altText: 'Jai Ganesh Catering Services — Jai Ganesh Catering' },
  { id: 's3', url: '/images/experience/exp3.png', altText: 'Catering Setup — Jai Ganesh Catering' },
  { id: 's4', url: '/images/experience/exp4.jpg', altText: 'Event Guest — Jai Ganesh Catering' },
  { id: 's5', url: '/images/experience/exp5.png', altText: 'Happy Marriage Life — Jai Ganesh Catering' },
];

export default function ExperienceGallery() {
  const [photos, setPhotos] = useState(STATIC_PHOTOS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      if (!db) return;
      try {
        const q = query(collection(db, "experience_photos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPhotos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // If Firebase has photos, show them first, then static photos
        if (fetchedPhotos.length > 0) {
          setPhotos([...fetchedPhotos, ...STATIC_PHOTOS]);
        }
      } catch (err) {
        // Silently fall back to static photos — no error shown to user
        console.log("Using static photos.");
      }
    }
    fetchPhotos();
  }, []);

  return (
    <div className="experience-gallery-wrapper">
      <div className="masonry-gallery">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="gallery-item fade-in" 
            style={{ animationDelay: `${(index % 6) * 0.1}s` }}
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt={photo.altText || "Jai Ganesh Event"} loading="lazy" />
            <div className="gallery-hover-label">
              <span>{photo.altText?.split('—')[0]?.trim() || 'Jai Ganesh Event'}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>✕</button>
          <img src={selectedPhoto.url} alt={selectedPhoto.altText || "Jai Ganesh Event"} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <style jsx>{`
        .experience-gallery-wrapper {
          margin-top: 40px;
        }

        .gallery-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--warm-ivory-dim);
          font-size: 1.2rem;
        }

        .gallery-state.error {
          color: #ff6b6b;
        }

        .masonry-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          grid-auto-rows: 250px;
        }

        .gallery-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .gallery-item:nth-child(even) {
          grid-row: span 2;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          border: 1px solid rgba(194, 155, 87, 0.4);
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .gallery-hover-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(10, 5, 20, 0.9) 0%, transparent 100%);
          padding: 20px 16px 14px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .gallery-hover-label span {
          color: var(--warm-ivory);
          font-family: var(--font-serif);
          font-size: 1rem;
          letter-spacing: 0.3px;
        }

        .gallery-item:hover .gallery-hover-label {
          opacity: 1;
        }

        .lightbox {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(10, 5, 15, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(5px);
        }

        .lightbox-close {
          position: absolute;
          top: 30px;
          right: 40px;
          background: none;
          border: none;
          color: var(--warm-ivory);
          font-size: 2rem;
          cursor: pointer;
          z-index: 10000;
          transition: color 0.3s ease;
        }

        .lightbox-close:hover {
          color: var(--accent-gold);
        }

        .lightbox-img {
          max-width: 90%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 0 0 40px rgba(0,0,0,0.8);
        }

        @media (max-width: 768px) {
          .masonry-gallery {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            grid-auto-rows: 200px;
          }
        }
        
        @media (max-width: 480px) {
          .masonry-gallery {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
          }
          .gallery-item:nth-child(even) {
            grid-row: span 1;
          }
        }
      `}</style>
    </div>
  );
}
