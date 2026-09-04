"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function PlanCelebration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guests: '50-100',
    location: '',
    foodPreference: 'Veg',
    requirements: '',
    name: '',
    phone: '',
    email: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    if (step === 1 && !formData.eventType) return alert("Please select an event type");
    if (step === 2 && !formData.eventDate) return alert("Please select an event date");
    if (step === 4 && !formData.location) return alert("Please enter a location");
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert("Please provide contact details");
    
    setSubmitting(true);
    
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      
      if (!db) {
        throw new Error("Firebase is not initialized. Check your environment variables.");
      }

      await addDoc(collection(db, "enquiries"), {
        ...formData,
        status: "NEW",
        createdAt: new Date().toISOString()
      });
      console.log("Enquiry saved to database.");
    } catch (error) {
      console.error("Database submission failed (Check Firebase Rules/Env Vars):", error);
      // We don't alert here. We gracefully degrade and still send them to WhatsApp!
    } finally {
      // Always redirect to WhatsApp so the business doesn't lose the lead!
      const text = `Hello Jai Ganesh Catering,\nI would like to enquire about catering.\n\nEvent: ${formData.eventType}\nDate: ${formData.eventDate}\nGuests: ${formData.guests}\nLocation: ${formData.location}\nFood: ${formData.foodPreference}\n\nContact me at: ${formData.phone}\nMy name is: ${formData.name}.`;
      const waLink = `https://wa.me/919941813565?text=${encodeURIComponent(text)}`;
      
      // Attempt to automatically open WhatsApp
      try {
        window.open(waLink, '_blank');
      } catch (e) {
        console.error("Popup blocker prevented WhatsApp redirect", e);
      }
      
      setSuccess(true);
      setSubmitting(false);
    }
  };

  return (
    <main className="plan-page">
      <Navbar />
      
      <div className="plan-header fade-in">
        <div className="container center">
          <span className="section-subtitle">Your Vision, Our Expertise</span>
          <h1 className="page-title">Plan Your Celebration</h1>
          <div className="gold-divider" style={{ margin: '0 auto 20px' }}></div>
          <p className="page-desc">Tell us about your event, and we will craft the perfect catering experience for you.</p>
        </div>
      </div>

      <section className="form-section bg-texture">
        <div className="container">
          
          {success ? (
            <div className="success-card fade-in">
              <div className="success-icon">✓</div>
              <h2>Enquiry Prepared!</h2>
              <p>Thank you, {formData.name}. We have prepared your request.</p>
              <p>To finalize, please send the prepared message via WhatsApp.</p>
              <div className="success-actions" style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href={`https://wa.me/919941813565?text=${encodeURIComponent(`Hello Jai Ganesh Catering,\nI would like to enquire about catering.\n\nEvent: ${formData.eventType}\nDate: ${formData.eventDate}\nGuests: ${formData.guests}\nLocation: ${formData.location}\nFood: ${formData.foodPreference}\n\nPlease contact me for a quotation. My name is ${formData.name}.`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                >
                  Open WhatsApp Now
                </a>
                <a href="tel:+919941813565" className="btn-outline">
                  Or Call Us Directly
                </a>
              </div>
              <div style={{ marginTop: '30px' }}>
                <Link href="/" className="btn-outline" style={{ border: 'none', textDecoration: 'underline' }}>Return to Home</Link>
              </div>
            </div>
          ) : (
            <div className="form-card fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(step / 7) * 100}%` }}></div>
              </div>
              
              <div className="step-indicator">Step {step} of 7</div>

              <form onSubmit={handleSubmit}>
                
                {step === 1 && (
                  <div className="form-step">
                    <h2>What are you celebrating?</h2>
                    <select name="eventType" value={formData.eventType} onChange={handleChange} required>
                      <option value="">Select Event Type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement & Reception">Engagement & Reception</option>
                      <option value="Birthday Function">Birthday Function</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Family Function">Family Function</option>
                      <option value="Temple / Community Event">Temple / Community Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-step">
                    <h2>When is the celebration?</h2>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                  </div>
                )}

                {step === 3 && (
                  <div className="form-step">
                    <h2>How many guests are you expecting?</h2>
                    <select name="guests" value={formData.guests} onChange={handleChange}>
                      <option value="Less than 50">Less than 50</option>
                      <option value="50-100">50 - 100</option>
                      <option value="100-300">100 - 300</option>
                      <option value="300-500">300 - 500</option>
                      <option value="500-1000">500 - 1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                )}

                {step === 4 && (
                  <div className="form-step">
                    <h2>Where is the event located?</h2>
                    <input type="text" name="location" placeholder="e.g., Saidapet, Chennai" value={formData.location} onChange={handleChange} required />
                  </div>
                )}

                {step === 5 && (
                  <div className="form-step">
                    <h2>What is your food preference?</h2>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="foodPreference" value="Veg" checked={formData.foodPreference === 'Veg'} onChange={handleChange} />
                        Pure Veg
                      </label>
                      <label>
                        <input type="radio" name="foodPreference" value="Non-Veg" checked={formData.foodPreference === 'Non-Veg'} onChange={handleChange} />
                        Non-Veg
                      </label>
                      <label>
                        <input type="radio" name="foodPreference" value="Both Veg & Non-Veg" checked={formData.foodPreference === 'Both Veg & Non-Veg'} onChange={handleChange} />
                        Both Veg & Non-Veg
                      </label>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="form-step">
                    <h2>Any special requirements?</h2>
                    <textarea name="requirements" rows="4" placeholder="e.g., Need live dosa counter, specific sweets..." value={formData.requirements} onChange={handleChange}></textarea>
                  </div>
                )}

                {step === 7 && (
                  <div className="form-step">
                    <h2>Your Contact Details</h2>
                    <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address (Optional)" value={formData.email} onChange={handleChange} />
                  </div>
                )}

                <div className="form-actions">
                  {step > 1 && <button type="button" className="btn-outline" onClick={handlePrev}>Back</button>}
                  {step < 7 && <button type="button" className="btn-primary" onClick={handleNext}>Continue</button>}
                  {step === 7 && (
                    <button type="submit" className="btn-primary" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Request a Quote'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .plan-page {
          background-color: transparent;
          min-height: 100vh;
        }

        .plan-header {
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

        .form-section {
          padding: 80px 0;
          min-height: 600px;
        }

        .form-card {
          max-width: 700px;
          margin: 0 auto;
          background: var(--bg-primary);
          padding: 60px 50px;
          border-radius: 2px;
          border: 1px solid rgba(194, 155, 87, 0.2);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .progress-bar {
          height: 4px;
          background-color: rgba(194, 155, 87, 0.2);
          border-radius: 2px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--accent-gold);
          transition: width 0.4s ease;
        }

        .step-indicator {
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--accent-gold);
          margin-bottom: 40px;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .form-step h2 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          margin-bottom: 30px;
          color: var(--warm-ivory);
        }

        input, select, textarea {
          width: 100%;
          padding: 16px 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(194, 155, 87, 0.3);
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 1.1rem;
          background-color: rgba(255, 255, 255, 0.02);
          color: var(--warm-ivory);
          outline: none;
          transition: all 0.3s ease;
        }

        input:focus, select:focus, textarea:focus {
          border-color: var(--accent-gold);
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        option {
          background-color: var(--bg-primary);
          color: var(--warm-ivory);
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .radio-group label {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 18px 20px;
          border: 1px solid rgba(194, 155, 87, 0.3);
          border-radius: 2px;
          transition: all 0.2s ease;
          color: var(--warm-ivory-dim);
        }

        .radio-group label:hover {
          border-color: var(--accent-gold);
          background-color: rgba(194, 155, 87, 0.05);
        }

        .radio-group input[type="radio"] {
          width: auto;
          margin: 0;
          accent-color: var(--accent-gold);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid rgba(194, 155, 87, 0.1);
        }

        .success-card {
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg-primary);
          padding: 80px 40px;
          border-radius: 2px;
          border: 1px solid rgba(194, 155, 87, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background-color: var(--accent-gold);
          color: var(--bg-deep);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin: 0 auto 30px;
        }

        .success-card h2 {
          font-family: var(--font-serif);
          color: var(--warm-ivory);
          margin-bottom: 20px;
        }
        
        .success-card p {
          color: var(--warm-ivory-dim);
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 40px 25px;
          }
          .form-step h2 {
            font-size: 1.8rem;
          }
          .form-actions {
            flex-direction: column-reverse;
            gap: 20px;
          }
          .form-actions button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
