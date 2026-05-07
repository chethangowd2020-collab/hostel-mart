'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './wishlist.module.css';

const MOCK_WISHLIST = [
  {
    id: 'w1',
    name: 'Logitech G304 Wireless Mouse',
    currentPrice: 2495,
    addedPrice: 2999,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000',
    inStock: true,
    dropPercent: 17
  },
  {
    id: 'w2',
    name: 'Noise NoiseFit Smartwatch',
    currentPrice: 1599,
    addedPrice: 1599,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
    inStock: false,
    dropPercent: 0
  }
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <header className={styles.header}>
          <h1>My Wishlist</h1>
          <p>Monitoring prices for your favorite items.</p>
        </header>

        <div className={styles.wishlistGrid}>
          {wishlist.map(item => (
            <div key={item.id} className={`${styles.wishCard} card`}>
              <div className={styles.imageBox}>
                <img src={item.image} alt={item.name} />
                {item.dropPercent > 0 && (
                  <span className={styles.dropBadge}>
                    📉 {item.dropPercent}% Drop
                  </span>
                )}
                {!item.inStock && <span className={styles.oosOverlay}>Out of Stock</span>}
              </div>
              
              <div className={styles.details}>
                <h3>{item.name}</h3>
                <div className={styles.priceInfo}>
                  <span className={styles.currentPrice}>₹{item.currentPrice}</span>
                  {item.addedPrice > item.currentPrice && (
                    <span className={styles.oldPrice}>₹{item.addedPrice}</span>
                  )}
                </div>
                
                <div className={styles.actions}>
                  <button 
                    className="btn-primary" 
                    disabled={!item.inStock}
                    style={{ flex: 2 }}
                  >
                    {item.inStock ? 'Add to Cart' : 'Notify Restock'}
                  </button>
                  <button className={styles.btnShare} title="Share with roommates">
                    🔗
                  </button>
                  <button className={styles.btnRemove} onClick={() => setWishlist(wishlist.filter(i => i.id !== item.id))}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {wishlist.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>❤️</span>
            <h3>Your wishlist is empty</h3>
            <p>Add products to track price drops and restock alerts.</p>
          </div>
        )}

        <section className={styles.priceHistory}>
          <h3>Recent Price Drop Events</h3>
          <div className={styles.eventLog}>
            <div className={styles.event}>
              <span className={styles.eventDot}></span>
              <p><strong>Logitech G304</strong> price dropped by ₹504! (1 hour ago)</p>
            </div>
            <div className={styles.event}>
              <span className={styles.eventDot}></span>
              <p><strong>Realme Buds</strong> are back in stock at a lower price! (Yesterday)</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
