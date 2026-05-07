'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './sos.module.css';

const SOS_PRODUCTS = [
  {
    id: 's1',
    name: 'Sanitary Pads - Ultra Thin (Pack of 10)',
    price: 145,
    originalPrice: 160,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=1000',
    category: 'Essentials',
    isSOS: true
  },
  {
    id: 's2',
    name: 'Crocin Pain Relief - 15 Tablets',
    price: 35,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000',
    category: 'Medicines',
    isSOS: true
  },
  {
    id: 's3',
    name: 'Instant Noodles Party Pack (5+1)',
    price: 75,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1000',
    category: 'Food',
    isSOS: true
  },
  {
    id: 's4',
    name: 'Charge-N-Go Universal Cable',
    price: 299,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1588503080517-8e7c10b7b137?q=80&w=1000',
    category: 'Electronics',
    isSOS: true
  }
];

export default function SOSPage() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      const hours = new Date().getHours();
      // Available 10 PM (22) to 6 AM (6)
      setIsAvailable(hours >= 22 || hours < 6);
    };
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <div className={styles.sosTitleGroup}>
            <div className={styles.sosPulse}></div>
            <h1>SOS Midnight Delivery</h1>
          </div>
          <p>Available 10 PM – 6 AM for your urgent needs.</p>
          {!isAvailable && (
            <div className={styles.alert}>
              ⚠️ Currently outside SOS hours. Orders will be processed as standard delivery.
            </div>
          )}
        </div>

        <section className={styles.emergencyCatalog}>
          <div className={styles.catalogHeader}>
            <h2>Emergency Catalog</h2>
            <span className={styles.deliveryEta}>🚀 Delivery in 10-15 mins</span>
          </div>
          
          <div className={styles.productGrid}>
            {SOS_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={{...product, isExpiringSoon: false}} />
            ))}
          </div>
        </section>

        <section className={styles.safetyInfo}>
          <div className={styles.safetyCard}>
            <h3>Safety First</h3>
            <p>Our delivery partners are verified and follow strict safety protocols during late-night deliveries.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
