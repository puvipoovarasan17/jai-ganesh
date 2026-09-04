"use client";

import { useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        // Verify admin role in Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          router.push('/admin');
        } else {
          // Sign out immediately if not admin
          await firebaseSignOut(auth);
          throw new Error('Unauthorized account.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or unauthorized owner access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card fade-in">
        <div className="login-header">
          <div className="logo-placeholder">JG</div>
          <h2>JAI GANESH</h2>
          <p>Secure Owner Portal</p>
        </div>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              className="form-control"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="admin@jaiganeshcatering.com"
            />
          </div>
          
          <div className="form-group">
            <label>Master Password</label>
            <input 
              type="password"
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'AUTHENTICATING...' : 'SIGN IN SECURELY'}
          </button>
        </form>
        
        <div className="login-footer">
          <Link href="/">← Return to Public Website</Link>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          z-index: 10;
        }

        .login-glass-card {
          background: rgba(29, 24, 32, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          width: 100%;
          max-width: 450px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(194, 155, 87, 0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          padding: 50px 40px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-placeholder {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--bg-deep);
          box-shadow: 0 0 20px rgba(194, 155, 87, 0.3);
        }

        .login-header h2 {
          color: var(--accent-gold);
          font-size: 2rem;
          margin-bottom: 5px;
        }

        .login-header p {
          color: var(--text-muted);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 0;
        }

        .error-alert {
          background-color: rgba(220, 38, 38, 0.1);
          color: #ef4444;
          padding: 15px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(239, 68, 68, 0.2);
          margin-bottom: 25px;
          font-size: 0.9rem;
          text-align: center;
        }

        .login-footer {
          margin-top: 30px;
          text-align: center;
        }

        .login-footer a {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-footer a:hover {
          color: var(--accent-gold);
        }
      `}</style>
    </div>
  );
}
