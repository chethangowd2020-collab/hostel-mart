'use client';

import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './medical.module.css';

const MEDICAL_CATEGORIES = [
  {
    title: "Fever & Pain Relief",
    badge: "Essential",
    products: [
      { id: 'm1', name: 'Dolo 650', price: 35, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 50 },
      { id: 'm2', name: 'Crocin Advance', price: 30, image: 'https://images.unsplash.com/photo-1559187359-3e9ef8c96a44?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 40 },
      { id: 'm3', name: 'Combiflam', price: 40, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 30 },
      { id: 'm4', name: 'Saridon', price: 45, image: 'https://images.unsplash.com/photo-1559187359-3e9ef8c96a44?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 25 },
      { id: 'm5', name: 'Paracetamol', price: 25, image: 'https://images.unsplash.com/photo-1559187359-3e9ef8c96a44?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 60 },
    ]
  },
  {
    title: "Cold & Cough",
    badge: "Quick Relief",
    products: [
      { id: 'm6', name: 'Vicks VapoRub', price: 95, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 20 },
      { id: 'm7', name: 'Strepsils (Pack of 8)', price: 40, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 100 },
      { id: 'm8', name: 'Benadryl Syrup', price: 135, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 15 },
      { id: 'm9', name: 'Sinarest', price: 75, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 30 },
      { id: 'm10', name: 'Cough Lozenges', price: 30, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 40 },
    ]
  },
  {
    title: "First Aid",
    badge: "Emergency",
    products: [
      { id: 'm11', name: 'Band-aids (Pack of 10)', price: 25, image: 'https://images.unsplash.com/photo-1559187359-3e9ef8c96a44?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 80 },
      { id: 'm12', name: 'Antiseptic Cream', price: 65, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 25 },
      { id: 'm13', name: 'Cotton Roll', price: 35, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 40 },
      { id: 'm14', name: 'Gauze Pads', price: 50, image: 'https://images.unsplash.com/photo-1559187359-3e9ef8c96a44?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 35 },
      { id: 'm15', name: 'Medical Tape', price: 30, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 50 },
      { id: 'm16', name: 'Burn Relief Cream', price: 95, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 15 },
    ]
  },
  {
    title: "Body Pain / Physical Strain",
    badge: "Recovery",
    products: [
      { id: 'm17', name: 'Volini Spray', price: 155, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 20 },
      { id: 'm18', name: 'Moov Ointment', price: 105, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 30 },
      { id: 'm19', name: 'Pain Relief Patches', price: 70, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 40 },
      { id: 'm20', name: 'Hot Gel Pack', price: 220, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Medical', stock: 10 },
    ]
  }
];

export default function Medical() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className="container">
            <h1>Hostel Medical Essentials 🏥</h1>
            <p>Fast delivery for fever, cold, minor injuries, and body pain.</p>
          </div>
        </div>

        <div className="container">
          {MEDICAL_CATEGORIES.map((category) => (
            <section key={category.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>{category.title}</h2>
                <span className={styles.badge}>{category.badge}</span>
              </div>
              <div className={styles.productGrid}>
                {category.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
