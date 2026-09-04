"use client";

import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthContext';
import Image from 'next/image';

export default function AdminExperience() {
  const { currentUser } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const q = query(collection(db, "experience_photos"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPhotos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPhotos(fetchedPhotos);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    let completed = 0;
    const totalFiles = files.length;

    try {
      for (const file of files) {
        // Validate file
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} is larger than 5MB.`);
        }
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`);
        }

        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `experience_photos/${fileName}`);
        
        // Upload to storage
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              // We could track individual file progress here if we wanted
            }, 
            (err) => reject(err), 
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                // Save metadata to Firestore
                await addDoc(collection(db, "experience_photos"), {
                  url: downloadURL,
                  storagePath: `experience_photos/${fileName}`,
                  altText: file.name,
                  createdAt: new Date().toISOString(),
                  uploadedBy: currentUser.uid
                });
                completed++;
                setUploadProgress(Math.round((completed / totalFiles) * 100));
                resolve();
              } catch (err) {
                reject(err);
              }
            }
          );
        });
      }
      // Refresh list
      await fetchPhotos();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload photos. Check file size and type.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleDelete = async (photoId, storagePath) => {
    if (!window.confirm("Are you sure you want to delete this photo from the public gallery?")) return;

    try {
      // Delete from storage
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
      // Delete from firestore
      await deleteDoc(doc(db, "experience_photos", photoId));
      // Refresh UI
      setPhotos(photos.filter(p => p.id !== photoId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete photo.");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading gallery...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Experience Gallery</h1>
        <p>These photos appear in the "Jai Ganesh Experience" section on the public homepage.</p>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="upload-section card">
        <h3>Upload New Photos</h3>
        <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG, WebP. Max size: 5MB per image.</p>
        
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
          disabled={uploading}
          className="file-input"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className={`btn-primary ${uploading ? 'disabled' : ''}`}>
          {uploading ? `Uploading... ${uploadProgress}%` : '+ Select & Upload Photos'}
        </label>

        {uploading && (
          <div className="progress-bar-container mt-4">
            <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>

      <div className="gallery-section">
        <h3>Current Gallery ({photos.length} photos)</h3>
        {photos.length === 0 ? (
          <p className="text-gray-500 mt-4">No photos in the gallery yet.</p>
        ) : (
          <div className="admin-masonry">
            {photos.map(photo => (
              <div key={photo.id} className="admin-gallery-item">
                <div className="img-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.altText || "Gallery image"} loading="lazy" />
                </div>
                <div className="item-actions">
                  <button onClick={() => handleDelete(photo.id, photo.storagePath)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-header {
          margin-bottom: 30px;
        }
        .admin-header h1 {
          font-family: var(--font-serif);
          color: var(--charcoal);
          font-size: 2.2rem;
          margin-bottom: 5px;
        }
        .admin-header p {
          color: #6b7280;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
          border: 1px solid #e5e7eb;
        }
        .upload-section h3 {
          margin-bottom: 10px;
          color: var(--charcoal);
        }
        .file-input {
          display: none;
        }
        .btn-primary {
          display: inline-block;
          background-color: var(--royal-purple-dark);
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        .btn-primary:hover:not(.disabled) {
          background-color: var(--royal-purple);
        }
        .btn-primary.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .progress-bar-container {
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          max-width: 400px;
        }
        .progress-bar-fill {
          height: 100%;
          background-color: var(--accent-gold);
          transition: width 0.3s ease;
        }
        .error-alert {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid #fecaca;
        }
        .gallery-section h3 {
          color: var(--charcoal);
          margin-bottom: 20px;
          font-size: 1.5rem;
        }
        .admin-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .admin-gallery-item {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .img-container {
          height: 200px;
          width: 100%;
          overflow: hidden;
        }
        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-actions {
          padding: 15px;
          display: flex;
          justify-content: flex-end;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }
        .btn-delete {
          background-color: transparent;
          color: #dc2626;
          border: 1px solid #dc2626;
          padding: 6px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .btn-delete:hover {
          background-color: #dc2626;
          color: white;
        }
        .mt-4 { margin-top: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        .text-sm { font-size: 0.875rem; }
        .text-gray-500 { color: #6b7280; }
      `}</style>
    </div>
  );
}
