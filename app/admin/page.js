"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    enquiries: 0,
    events: 0,
    menuItems: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        // Fetch quick counts (Ideally use count() aggregation in production, but getDocs is fine for small scale)
        const enquiriesSnap = await getDocs(collection(db, "enquiries"));
        const eventsSnap = await getDocs(collection(db, "events"));
        const menuSnap = await getDocs(collection(db, "menu"));
        
        setStats({
          enquiries: enquiriesSnap.size,
          events: eventsSnap.size,
          menuItems: menuSnap.size
        });

        // Fetch 5 most recent enquiries
        const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"), limit(5));
        const recentSnap = await getDocs(q);
        const fetchedEnquiries = recentSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentEnquiries(fetchedEnquiries);

        // Fetch recent events
        const qEvents = query(collection(db, "events"), orderBy("createdAt", "desc"), limit(5));
        const eventsSnap2 = await getDocs(qEvents);
        const fetchedEvents = eventsSnap2.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard data...</div>;

  return (
    <div>
      <h1 className="dash-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.enquiries}</div>
          <div className="stat-label">Total Enquiries</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.events}</div>
          <div className="stat-label">Published Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-label">Menu Items</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <div className="section-header">
            <h2>Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="view-all">View All →</Link>
          </div>
          
          {recentEnquiries.length === 0 ? (
            <p className="empty-text">No recent enquiries found.</p>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Event Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map(enq => (
                    <tr key={enq.id}>
                      <td>{new Date(enq.createdAt).toLocaleDateString()}</td>
                      <td>{enq.name}</td>
                      <td>{enq.eventType}</td>
                      <td>
                        <span className={`status-badge ${enq.status.toLowerCase()}`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="section-card">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link href="/admin/events/new" className="action-btn">
              <span className="icon">📸</span>
              <span>Add New Event Story</span>
            </Link>
            <Link href="/admin/menu/new" className="action-btn">
              <span className="icon">🍲</span>
              <span>Add Menu Item</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-sections" style={{ marginTop: '30px', gridTemplateColumns: '1fr' }}>
        <div className="section-card">
          <div className="section-header">
            <h2>Manage Events (Portfolio)</h2>
          </div>
          
          {recentEvents.length === 0 ? (
            <p className="empty-text">No events found. Start by adding one!</p>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event Title</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map(evt => (
                    <tr key={evt.id}>
                      <td>{new Date(evt.date).toLocaleDateString()}</td>
                      <td><strong>{evt.title}</strong></td>
                      <td>{evt.location}</td>
                      <td>
                        <span className={`status-badge ${evt.isPublished ? 'published' : 'draft'}`}>
                          {evt.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <Link href={`/admin/events/edit?id=${evt.id}`} className="edit-btn">
                          Edit Media / Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .dash-title {
          font-family: var(--font-serif);
          color: var(--royal-purple-dark);
          font-size: 2rem;
          margin-bottom: 30px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--royal-purple);
          margin-bottom: 5px;
        }

        .stat-label {
          color: var(--charcoal-light);
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 1px;
        }

        .dashboard-sections {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .section-card {
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid #e5e7eb;
          padding: 25px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 15px;
        }

        .section-header h2 {
          font-size: 1.2rem;
          font-family: var(--font-sans);
          color: var(--charcoal);
        }

        .view-all {
          font-size: 0.9rem;
          color: var(--royal-purple);
          font-weight: 600;
        }

        .empty-text {
          color: var(--charcoal-light);
          font-style: italic;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          text-align: left;
          padding: 12px;
          border-bottom: 2px solid #e5e7eb;
          color: var(--charcoal-light);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f3f4f6;
          color: var(--charcoal);
          font-size: 0.95rem;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .status-badge.new {
          background: #dbeafe;
          color: #1e3a8a;
        }

        .status-badge.published {
          background: #dcfce7;
          color: #166534;
        }
        
        .status-badge.draft {
          background: #fef9c3;
          color: #854d0e;
        }

        .edit-btn {
          padding: 6px 12px;
          background: var(--royal-purple);
          color: white;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        
        .edit-btn:hover {
          background: var(--royal-purple-dark);
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: var(--charcoal);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          border-color: var(--royal-purple);
          background-color: rgba(58, 11, 75, 0.02);
          color: var(--royal-purple);
        }

        .action-btn .icon {
          font-size: 1.5rem;
          margin-right: 15px;
        }

        @media (max-width: 1024px) {
          .dashboard-sections {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
