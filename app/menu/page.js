"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

const DEFAULT_MENU = [
  // Breakfast
  { id: '1', name: 'Traditional Ghee Pongal', description: 'Served with sambar, coconut chutney, and medu vada.', category: 'Breakfast', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1626082895617-2c6af4b439c3?auto=format&fit=crop&q=80&w=600' },
  { id: '1b', name: 'Crispy Masala Dosa', description: 'Golden roasted dosa stuffed with potato masala.', category: 'Breakfast', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=600' },
  
  // Lunch
  { id: '2', name: 'South Indian Kalyana Virundhu', description: 'Authentic full meals on banana leaf with 3 poriyals, sambar, rasam.', category: 'Lunch', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600' },
  
  // Dinner
  { id: '3', name: 'Malabar Parotta & Kurma', description: 'Flaky layered bread served with spicy vegetable kurma.', category: 'Dinner', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600' },
  
  // Starters
  { id: '4', name: 'Crispy Chicken 65', description: 'Spicy, deep-fried chicken bites marinated in traditional spices.', category: 'Starters', type: 'Non-Veg', price: '', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=600' },
  { id: '4b', name: 'Gobi Manchurian', description: 'Cauliflower florets tossed in sweet and tangy Chinese sauce.', category: 'Starters', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1625398407796-a1145214be23?auto=format&fit=crop&q=80&w=600' },
  
  // Main Course
  { id: '5', name: 'Mutton Biryani (Seeraga Samba)', description: 'Authentic Dindigul style mutton biryani served with raita & brinjal.', category: 'Main Course', type: 'Non-Veg', price: '', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600' },
  { id: '6', name: 'Paneer Butter Masala', description: 'Rich and creamy curry made with fresh cottage cheese.', category: 'Main Course', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600' },
  
  // Rice
  { id: '7', name: 'Tangy Lemon Rice', description: 'Tempered rice infused with fresh lemon juice and roasted peanuts.', category: 'Rice', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=600' },
  { id: '7b', name: 'Creamy Curd Rice', description: 'Soothing yogurt rice tempered with mustard seeds and curry leaves.', category: 'Rice', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&q=80&w=600' },
  
  // Sweets
  { id: '8', name: 'Elaneer Payasam', description: 'Tender coconut kheer served chilled.', category: 'Sweets', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1563805042-7684c8e9e533?auto=format&fit=crop&q=80&w=600' },
  { id: '8b', name: 'Hot Gulab Jamun', description: 'Soft milk solids soaked in cardamom flavored sugar syrup.', category: 'Sweets', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600' },
  
  // Snacks
  { id: '9', name: 'Onion Samosa', description: 'Crispy pastry triangles stuffed with spiced onions.', category: 'Snacks', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600' },
  
  // Beverages
  { id: '10', name: 'Kumbakonam Degree Coffee', description: 'Authentic South Indian filter coffee brewed to perfection.', category: 'Beverages', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&q=80&w=600' },
  { id: '11', name: 'Chilled Rose Milk', description: 'Refreshing milk flavored with rose syrup and sabja seeds.', category: 'Beverages', type: 'Veg', price: '', image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb69c?auto=format&fit=crop&q=80&w=600' }
];

export default function DigitalMenu() {
  const [activeTab, setActiveTab] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Starters', 'Main Course', 'Rice', 'Sweets', 'Snacks', 'Beverages'];

  useEffect(() => {
    async function fetchMenu() {
      if (!db) {
        setLoading(false);
        setMenuItems(DEFAULT_MENU);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const DEFAULT_MENU = [
          // Breakfast
          { id: '1', name: 'Traditional Ghee Pongal', description: 'Served with sambar, coconut chutney, and medu vada.', category: 'Breakfast', type: 'Veg', price: '', image: '/images/menu/pongal.jpg' },
          { id: '1b', name: 'Crispy Masala Dosa', description: 'Golden roasted dosa stuffed with potato masala.', category: 'Breakfast', type: 'Veg', price: '', image: '/images/menu/dosa.jpg' },
          
          // Lunch
          { id: '2', name: 'South Indian Kalyana Virundhu', description: 'Authentic full meals on banana leaf with 3 poriyals, sambar, rasam.', category: 'Lunch', type: 'Veg', price: '', image: '/images/menu/meals.jpg' },
          
          // Dinner
          { id: '3', name: 'Malabar Parotta & Kurma', description: 'Flaky layered bread served with spicy vegetable kurma.', category: 'Dinner', type: 'Veg', price: '', image: '/images/menu/parotta.jpg' },
          
          // Starters
          { id: '4', name: 'Crispy Chicken 65', description: 'Spicy, deep-fried chicken bites marinated in traditional spices.', category: 'Starters', type: 'Non-Veg', price: '', image: '/images/menu/chicken65.jpg' },
          { id: '4b', name: 'Gobi Manchurian', description: 'Cauliflower florets tossed in sweet and tangy Chinese sauce.', category: 'Starters', type: 'Veg', price: '', image: '/images/menu/gobi.jpg' },
          
          // Main Course
          { id: '5', name: 'Mutton Biryani (Seeraga Samba)', description: 'Authentic Dindigul style mutton biryani served with raita & brinjal.', category: 'Main Course', type: 'Non-Veg', price: '', image: '/images/menu/biryani.jpg' },
          { id: '6', name: 'Paneer Butter Masala', description: 'Rich and creamy curry made with fresh cottage cheese.', category: 'Main Course', type: 'Veg', price: '', image: '/images/menu/paneer.jpg' },
          
          // Rice
          { id: '7', name: 'Tangy Lemon Rice', description: 'Tempered rice infused with fresh lemon juice and roasted peanuts.', category: 'Rice', type: 'Veg', price: '', image: '/images/menu/lemon_rice.jpg' },
          { id: '7b', name: 'Creamy Curd Rice', description: 'Soothing yogurt rice tempered with mustard seeds and curry leaves.', category: 'Rice', type: 'Veg', price: '', image: '/images/menu/curd_rice.jpg' },
          
          // Sweets
          { id: '8', name: 'Elaneer Payasam', description: 'Tender coconut kheer served chilled.', category: 'Sweets', type: 'Veg', price: '', image: '/images/menu/payasam.jpg' },
          { id: '8b', name: 'Hot Gulab Jamun', description: 'Soft milk solids soaked in cardamom flavored sugar syrup.', category: 'Sweets', type: 'Veg', price: '', image: '/images/menu/payasam.jpg' },
          
          // Snacks
          { id: '9', name: 'Onion Samosa', description: 'Crispy pastry triangles stuffed with spiced onions.', category: 'Snacks', type: 'Veg', price: '', image: '/images/menu/gobi.jpg' },
          
          // Beverages
          { id: '10', name: 'Kumbakonam Degree Coffee', description: 'Authentic South Indian filter coffee brewed to perfection.', category: 'Beverages', type: 'Veg', price: '', image: '/images/menu/coffee.jpg' },
          { id: '11', name: 'Chilled Rose Milk', description: 'Refreshing milk flavored with rose syrup and sabja seeds.', category: 'Beverages', type: 'Veg', price: '', image: '/images/menu/curd_rice.jpg' }
        ];

        // Merge Firestore items with DEFAULT_MENU to ensure all categories look rich for the demo
        const mergedItems = [...items];
        DEFAULT_MENU.forEach(defaultItem => {
          if (!items.find(item => item.name === defaultItem.name)) {
            mergedItems.push(defaultItem);
          }
        });
        setMenuItems(mergedItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const filteredMenu = activeTab === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <main className="menu-page">
      <Navbar />
      
      <div className="menu-header">
        <div className="container center fade-in">
          <span className="section-subtitle">Build Your Feast</span>
          <h1 className="page-title">Digital Menu</h1>
          <div className="gold-divider" style={{ margin: '0 auto 20px' }}></div>
          <p className="page-desc">Explore our authentic traditional and modern culinary offerings.</p>
        </div>
      </div>

      <section className="menu-section bg-texture">
        <div className="container">
          
          <div className="category-tabs fade-in" style={{ animationDelay: '0.2s' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">Curating the menu...</div>
          ) : (
            <div className="menu-grid">
              {filteredMenu.map((item, idx) => (
                <div key={item.id} className="menu-card fade-in" style={{ animationDelay: `${(idx % 6) * 0.1}s` }}>
                  {item.image ? (
                    <div className="menu-image-container">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="menu-image-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/brand-logo.jpg';
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="menu-image-container placeholder">
                      <img src="/brand-logo.jpg" alt="Jai Ganesh Logo" className="menu-placeholder" />
                    </div>
                  )}
                  <div className="menu-content">
                    <div className="menu-card-header">
                      <h3>{item.name}</h3>
                      <span className={`type-badge ${item.type === 'Non-Veg' ? 'non-veg' : 'veg'}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="menu-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredMenu.length === 0 && !loading && (
            <div className="empty-state fade-in">
              <h3>Menu updates coming soon.</h3>
            </div>
          )}
          
          <div className="menu-cta center fade-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="cta-heading">Ready to plan your menu?</h3>
            <Link href="/plan" className="btn-primary">Request a Quote</Link>
          </div>

        </div>
      </section>

      <style jsx>{`
        .menu-page {
          background-color: transparent;
          min-height: 100vh;
        }

        .menu-header {
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

        .menu-section {
          padding: 80px 0;
          min-height: 600px;
        }

        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin-bottom: 60px;
        }

        .tab-btn {
          background: transparent;
          border: 1px solid rgba(194, 155, 87, 0.3);
          padding: 10px 24px;
          border-radius: 2px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover, .tab-btn.active {
          background-color: var(--accent-gold);
          color: var(--bg-deep);
          border-color: var(--accent-gold);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 40px;
        }

        .menu-card {
          background: var(--bg-primary);
          border-radius: 2px;
          border: 1px solid rgba(194, 155, 87, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .menu-image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-bottom: 1px solid rgba(194, 155, 87, 0.1);
        }
        
        .menu-image-container.placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-secondary);
        }
        
        .menu-placeholder {
          width: 80px;
          height: 80px;
          opacity: 0.5;
          border-radius: 8px;
        }

        .menu-image-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .menu-card:hover .menu-image-img {
          transform: scale(1.05);
        }

        .menu-content {
          padding: 25px;
          position: relative;
          z-index: 2;
          background: var(--bg-primary);
          flex: 1;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          border-color: rgba(194, 155, 87, 0.4);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .menu-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
          gap: 15px;
        }

        .menu-card h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--warm-ivory);
          margin: 0;
          line-height: 1.3;
        }

        .type-badge {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 2px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex-shrink: 0;
        }

        .type-badge.veg {
          background-color: rgba(67, 160, 71, 0.1);
          color: #81c784;
          border: 1px solid rgba(129, 199, 132, 0.3);
        }

        .type-badge.non-veg {
          background-color: rgba(229, 57, 53, 0.1);
          color: #e57373;
          border: 1px solid rgba(229, 115, 115, 0.3);
        }

        .menu-desc {
          color: var(--warm-ivory-dim);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 50px;
          color: var(--text-muted);
          font-family: var(--font-serif);
          font-size: 1.5rem;
        }
        
        .menu-cta {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid rgba(194, 155, 87, 0.1);
        }

        .cta-heading {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--accent-gold);
          margin-bottom: 30px;
        }
      `}</style>
    </main>
  );
}
