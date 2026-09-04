import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const URL = 'https://jai-ganesh-platform.vercel.app';

export default async function sitemap() {
  const routes = [
    '',
    '/plan',
    '/menu',
    '/events',
    '/catering-chennai',
    '/wedding-catering-chennai',
    '/catering-saidapet',
    '/catering-kanchipuram',
    '/wedding-catering-kanchipuram',
    '/veg-catering-chennai',
    '/non-veg-catering-chennai',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let eventRoutes = [];
  try {
    if (db) {
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      
      eventRoutes = snapshot.docs.map((doc) => ({
        url: `${URL}/events/story?id=${doc.id}`,
        lastModified: new Date(doc.data().createdAt || Date.now()).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
  }

  return [...routes, ...eventRoutes];
}
