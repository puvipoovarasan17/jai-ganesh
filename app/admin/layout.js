"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import Link from 'next/link';

function AdminSidebarLayout({ children }) {
  const { currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    if (!loading && currentUser && pathname === '/admin/login') {
      router.push('/admin');
    }
  }, [currentUser, loading, pathname, router]);

  if (loading) {
    return <div className="admin-loading">Loading secure environment...</div>;
  }

  // If on login page, just render children without the admin sidebar
  if (pathname === '/admin/login') {
    return children;
  }

  if (!currentUser) return null;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>JAI GANESH</h2>
          <span>Admin Portal</span>
        </div>
        
        <nav className="admin-nav">
          <Link href="/admin" className={pathname === '/admin' ? 'active' : ''}>Dashboard</Link>
          <Link href="/admin/enquiries" className={pathname.includes('/enquiries') ? 'active' : ''}>Enquiries</Link>
          <Link href="/admin/events" className={pathname.includes('/events') ? 'active' : ''}>Events</Link>
          <Link href="/admin/menu" className={pathname.includes('/menu') ? 'active' : ''}>Menu</Link>
          <Link href="/admin/experience" className={pathname.includes('/experience') ? 'active' : ''}>Experience</Link>
          <Link href="/admin/reviews" className={pathname.includes('/reviews') ? 'active' : ''}>Reviews</Link>
          
          <button className="logout-btn" onClick={() => signOut()}>Sign Out</button>
        </nav>
      </aside>
      
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-welcome">Welcome, {currentUser.email}</div>
          <Link href="/" target="_blank" className="view-site-btn">View Public Site ↗</Link>
        </header>
        <div className="admin-content" id="admin-root">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          color: var(--charcoal);
          font-size: 1.2rem;
          background: #f3f4f6;
        }

        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: #f3f4f6;
          font-family: var(--font-sans);
        }

        .admin-sidebar {
          width: 260px;
          background-color: var(--royal-purple-dark);
          color: white;
          display: flex;
          flex-direction: column;
        }

        .admin-brand {
          padding: 30px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .admin-brand h2 {
          font-family: var(--font-serif);
          color: var(--rich-gold);
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .admin-brand span {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.6);
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          flex: 1;
        }

        .admin-nav a {
          padding: 15px 30px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 500;
          border-left: 4px solid transparent;
          transition: all 0.2s ease;
        }

        .admin-nav a:hover, .admin-nav a.active {
          background-color: rgba(255,255,255,0.05);
          color: white;
          border-left-color: var(--rich-gold);
        }

        .logout-btn {
          margin-top: auto;
          background: none;
          border: none;
          color: #ef4444;
          padding: 20px 30px;
          text-align: left;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.1);
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .admin-topbar {
          background: white;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          border-bottom: 1px solid #e5e7eb;
        }

        .topbar-welcome {
          font-weight: 500;
          color: var(--charcoal-light);
        }

        .view-site-btn {
          color: var(--royal-purple);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-content {
          padding: 40px;
          overflow-y: auto;
          flex: 1;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            left: -260px;
            height: 100vh;
            z-index: 1000;
            transition: left 0.3s ease;
          }
        }
      `}</style>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
