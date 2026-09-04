"use client";
import { useState, useEffect, Suspense } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../../lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EditEventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Wedding Celebration',
    date: '',
    location: '',
    guestCount: '',
    foodType: 'Veg',
    description: '',
    isPublished: true,
    coverImage: '',
    gallery: [] 
  });

  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      if (!db || !eventId) return;
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            type: data.type || 'Wedding Celebration',
            date: data.date || '',
            location: data.location || '',
            guestCount: data.guestCount || '',
            foodType: data.foodType || 'Veg',
            description: data.description || '',
            isPublished: data.isPublished !== false,
            coverImage: data.coverImage || '',
            gallery: data.gallery || []
          });
        } else {
          alert("Event not found!");
          router.push('/admin');
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [eventId, router]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docRef = doc(db, "events", eventId);
      await updateDoc(docRef, {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        location: formData.location,
        guestCount: formData.guestCount,
        foodType: formData.foodType,
        description: formData.description,
        isPublished: formData.isPublished,
      });
      alert('Event details updated!');
    } catch (error) {
      console.error("Error updating event:", error);
      alert('Error updating details.');
    } finally {
      setSaving(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setUploadingMedia(true);
    try {
      const newMedia = [];
      for (const file of files) {
        const fileType = file.type.startsWith('video') ? 'video' : 'image';
        const mediaRef = ref(storage, `events/${eventId}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(mediaRef, file);
        const url = await getDownloadURL(snapshot.ref);
        newMedia.push({ url, type: fileType });
      }

      const updatedGallery = [...formData.gallery, ...newMedia];
      const docRef = doc(db, "events", eventId);
      await updateDoc(docRef, { gallery: updatedGallery });
      
      setFormData({ ...formData, gallery: updatedGallery });
      alert('Media uploaded successfully!');
    } catch (error) {
      console.error("Error uploading media:", error);
      alert('Error uploading media. Check storage limits or rules.');
    } finally {
      setUploadingMedia(false);
      e.target.value = null;
    }
  };

  const handleAddVideoLink = async () => {
    if (!videoLink) return;
    setUploadingMedia(true);
    try {
      const newMedia = { url: videoLink, type: 'video_link' };
      const updatedGallery = [...formData.gallery, newMedia];
      const docRef = doc(db, "events", eventId);
      await updateDoc(docRef, { gallery: updatedGallery });
      setFormData({ ...formData, gallery: updatedGallery });
      setVideoLink('');
    } catch (error) {
      console.error("Error adding video link:", error);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleDeleteMedia = async (index, mediaUrl, isCover) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    
    try {
      if (mediaUrl.includes('firebasestorage')) {
        const fileRef = ref(storage, mediaUrl);
        await deleteObject(fileRef).catch(e => console.error("Could not delete from storage:", e));
      }

      const docRef = doc(db, "events", eventId);
      if (isCover) {
        await updateDoc(docRef, { coverImage: '' });
        setFormData({ ...formData, coverImage: '' });
      } else {
        const updatedGallery = [...formData.gallery];
        updatedGallery.splice(index, 1);
        await updateDoc(docRef, { gallery: updatedGallery });
        setFormData({ ...formData, gallery: updatedGallery });
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Error deleting media.");
    }
  };

  const handleSetCover = async (url) => {
    try {
      const docRef = doc(db, "events", eventId);
      await updateDoc(docRef, { coverImage: url });
      setFormData({ ...formData, coverImage: url });
      alert("Cover image updated!");
    } catch (error) {
      console.error("Error setting cover:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-form-container">
      <div className="header-flex">
        <div>
          <Link href="/admin" className="back-link">← Back to Dashboard</Link>
          <h1 className="dash-title">Edit Event: {formData.title}</h1>
        </div>
        <Link href={`/events/${eventId}`} target="_blank" className="btn-outline-small">Preview Event View</Link>
      </div>

      <div className="grid-layout">
        {/* Left Column: Details */}
        <div className="admin-card">
          <h2>Event Details</h2>
          <form onSubmit={handleSaveDetails}>
            <div className="form-group">
              <label>Event Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Event Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Wedding Celebration">Wedding Celebration</option>
                <option value="Engagement">Engagement</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Family Function">Family Function</option>
                <option value="Temple Event">Temple Event</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Event Description</label>
              <textarea name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
                Published (Visible on public website)
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Details'}
            </button>
          </form>
        </div>

        {/* Right Column: Media Manager */}
        <div className="admin-card media-manager">
          <h2>Media Gallery (Photos & Videos)</h2>
          <p className="help-text">Add photos and videos to showcase this event.</p>
          
          <div className="upload-section">
            <h3>Upload Files</h3>
            <input 
              type="file" 
              accept="image/*,video/mp4,video/quicktime" 
              multiple 
              onChange={handleMediaUpload} 
              className="file-input"
              disabled={uploadingMedia}
            />
            <p className="help-text text-small">You can select multiple photos/videos at once.</p>
          </div>

          <div className="upload-section link-section">
            <h3>Or Add YouTube / Video Link</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Paste YouTube or video link..." 
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              <button type="button" onClick={handleAddVideoLink} disabled={uploadingMedia || !videoLink} className="btn-secondary">Add</button>
            </div>
          </div>

          {uploadingMedia && <div className="uploading-state">Uploading... please wait...</div>}

          <div className="gallery-grid">
            {/* Cover Image First */}
            {formData.coverImage && (
              <div className="gallery-item cover-item">
                <span className="cover-badge">Main Cover</span>
                <img src={formData.coverImage} alt="Cover" />
                <button onClick={() => handleDeleteMedia(null, formData.coverImage, true)} className="delete-btn">×</button>
              </div>
            )}

            {/* Gallery Items */}
            {formData.gallery && formData.gallery.map((media, index) => (
              <div key={index} className="gallery-item">
                {media.type === 'video_link' ? (
                  <div className="video-link-preview">
                    <a href={media.url} target="_blank" rel="noreferrer">View Link</a>
                  </div>
                ) : media.type === 'video' ? (
                  <video src={media.url} muted className="media-preview" />
                ) : (
                  <img src={media.url} alt={`Gallery ${index}`} className="media-preview" />
                )}
                
                <div className="item-actions">
                  {media.type === 'image' && formData.coverImage !== media.url && (
                    <button onClick={() => handleSetCover(media.url)} className="set-cover-btn">Set as Cover</button>
                  )}
                  <button onClick={() => handleDeleteMedia(index, media.url, false)} className="delete-btn small">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-form-container {
          padding-bottom: 50px;
        }
        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 10px;
          color: var(--royal-purple);
          text-decoration: none;
          font-weight: 500;
        }
        .dash-title {
          font-family: var(--font-serif);
          color: var(--royal-purple-dark);
          font-size: 2rem;
          margin: 0;
        }
        .btn-outline-small {
          background: transparent;
          border: 1px solid var(--royal-purple);
          color: var(--royal-purple);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
        }
        .admin-card {
          background: white;
          padding: 30px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
        }
        .admin-card h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 25px;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 10px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--charcoal);
        }
        input[type="text"], input[type="date"], select, textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          outline: none;
        }
        .btn-primary {
          background-color: var(--royal-purple);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-secondary {
          background-color: #e5e7eb;
          color: var(--charcoal);
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        
        /* Media Manager Styles */
        .upload-section {
          padding: 20px;
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .upload-section h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
        }
        .help-text {
          color: var(--charcoal-light);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .text-small { font-size: 0.8rem; margin: 5px 0 0; }
        .uploading-state {
          padding: 15px;
          background: #dbeafe;
          color: #1e3a8a;
          text-align: center;
          border-radius: 6px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 15px;
          margin-top: 30px;
        }
        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          background: #f3f4f6;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .cover-item {
          border: 2px solid var(--accent-gold);
          grid-column: span 2;
          aspect-ratio: 2/1;
        }
        .cover-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: var(--accent-gold);
          color: white;
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 4px;
          z-index: 2;
        }
        .gallery-item img, .gallery-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .video-link-preview {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: #ffe4e6; color: #be123c;
          font-weight: bold; text-align: center;
        }
        
        .item-actions {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.7);
          padding: 8px;
          display: flex;
          justify-content: space-between;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .gallery-item:hover .item-actions { opacity: 1; }
        
        .set-cover-btn, .delete-btn.small {
          background: white; border: none; padding: 4px 8px;
          font-size: 0.7rem; border-radius: 4px; cursor: pointer;
        }
        .delete-btn.small { background: #ef4444; color: white; }
        
        .delete-btn {
          position: absolute; top: 10px; right: 10px;
          background: #ef4444; color: white; border: none;
          width: 25px; height: 25px; border-radius: 50%;
          cursor: pointer; z-index: 2;
        }

        @media (max-width: 1024px) {
          .grid-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default function EditEvent() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditEventContent />
    </Suspense>
  );
}
