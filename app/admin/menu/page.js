"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Link from 'next/link';

export default function ManageMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      if (!db) return setLoading(false);
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      await deleteDoc(doc(db, "menu", id));
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 className="dash-title">Manage Menu</h1>
        <button className="btn-primary" onClick={() => alert("Add Menu coming soon!")}>+ Add Item</button>
      </div>

      <div className="section-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {menuItems.length === 0 && <tr><td colSpan="4">No items found in database.</td></tr>}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .dash-title {
          font-family: var(--font-serif);
          color: var(--royal-purple-dark);
          font-size: 2rem;
        }
        .section-card {
          background: white;
          padding: 20px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th, .admin-table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
