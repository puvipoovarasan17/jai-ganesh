"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function AddEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Wedding Celebration',
    date: '',
    location: '',
    guestCount: '',
    foodType: 'Veg',
    description: '',
    isPublished: true
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = '';

      if (imageFile) {
        const imageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        coverImageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "events"), {
        ...formData,
        coverImage: coverImageUrl,
        createdAt: new Date().toISOString()
      });

      alert('Event published successfully!');
      router.push('/admin');
    } catch (error) {
      console.error("Error adding event:", error);
      alert('Error publishing event. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <div className="header-flex">
        <h1 className="dash-title">Add New Event Story</h1>
        <button type="button" onClick={() => router.back()} className="btn-outline-small">Cancel</button>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Event Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Balaji & Priya Wedding" />
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
              <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Chennai" />
            </div>

            <div className="form-group">
              <label>Guest Count</label>
              <input type="text" name="guestCount" value={formData.guestCount} onChange={handleChange} placeholder="e.g., 500" />
            </div>

            <div className="form-group">
              <label>Food Type</label>
              <select name="foodType" value={formData.foodType} onChange={handleChange}>
                <option value="Pure Veg Catering">Pure Veg Catering</option>
                <option value="Non-Veg Catering">Non-Veg Catering</option>
                <option value="Veg & Non-Veg Catering">Veg & Non-Veg Catering</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Event Description</label>
            <textarea name="description" rows="5" value={formData.description} onChange={handleChange} required placeholder="Describe the celebration..."></textarea>
          </div>

          <div className="form-group full-width">
            <label>Cover Photo</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            <p className="help-text">Upload a high-quality image of the food or setup.</p>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
              Publish immediately on public website
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Save & Publish Event'}
            </button>
          </div>

        </form>
      </div>

      <style jsx>{`
        .dash-title {
          font-family: var(--font-serif);
          color: var(--royal-purple-dark);
          font-size: 2rem;
        }

        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .btn-outline-small {
          background: transparent;
          border: 1px solid #d1d5db;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .admin-card {
          background: white;
          padding: 40px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--charcoal);
          font-size: 0.95rem;
        }

        input[type="text"], input[type="date"], select, textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus, select:focus, textarea:focus {
          border-color: var(--royal-purple);
        }

        .file-input {
          padding: 10px 0;
        }

        .help-text {
          font-size: 0.8rem;
          color: var(--charcoal-light);
          margin-top: 5px;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 500;
        }

        .form-actions {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          justify-content: flex-end;
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
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
