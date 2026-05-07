'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './sos.module.css';

const SOS_CATALOG = [
  { id: 'sos1', name: 'Whisper Ultra Sanitary Pads (Pack of 7)', price: 95, originalPrice: 105, image: 'https://images.unsplash.com/photo-1627384113743-6bd5a474fffd?q=80&w=1000', category: 'Hygiene', stock: 50 },
  { id: 'sos2', name: 'Dolo 650 - Strip of 15', price: 32, originalPrice: 35, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000', category: 'Medicines', stock: 30 },
  { id: 'sos4', name: 'Maggi Cup Noodles - Masala', price: 50, originalPrice: 50, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1000', category: 'Food', stock: 100 },
  { id: 'sos5', name: 'Red Bull Energy Drink (250ml)', price: 115, originalPrice: 125, image: 'https://images.unsplash.com/photo-1622543953490-3b7bc4b39c65?q=80&w=1000', category: 'Drinks', stock: 45 }
];

export default function SOSPage() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [safetyCheck, setSafetyCheck] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      setIsAvailable(hours >= 22 || hours < 6);
    };
    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.hero}>
          <div className={styles.sosPulsingIcon}>🚨</div>
          <h1>Midnight SOS</h1>
          <p>Delivery in <strong>45 Mins</strong>. Bypasses all standard orders.</p>
          {!isAvailable && (
            <div className={styles.timeWarning}>
              ⚠️ SOS is active between 10 PM - 6 AM. Currently inactive.
            </div>
          )}
        </div>

        <section className={styles.catalogSection}>
          <div className={styles.catalogHeader}>
            <h2>Urgent Catalog</h2>
            <div className={styles.feeInfo}>
              <span className={styles.feeBadge}>Fee: ₹25</span>
              <span className={styles.primeFree}>Free for Prime</span>
            </div>
          </div>
          
          <div className={styles.productGrid}>
            {SOS_CATALOG.map(product => (
              <div key={product.id} className={styles.productWrapper}>
                <ProductCard product={product} />
                <button 
                  className={styles.quickAdd}
                  onClick={() => setShowConfirm(true)}
                >
                  Urgent Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Room/Gate Confirmation Modal */}
        {showConfirm && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.confirmModal} card`}>
              <h3>Confirm Delivery Details</h3>
              <p>For SOS orders, please re-verify your location for maximum speed.</p>
              <div className={styles.inputGroup}>
                <label>Hostel Gate Details / Room #</label>
                <input type="text" placeholder="e.g., Gate 2, Room B-304" />
              </div>
              <div className={styles.modalActions}>
                <button className={styles.btnCancel} onClick={() => setShowConfirm(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => { setShowConfirm(false); setSafetyCheck(true); }}>
                  Place SOS Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Safety Confirmation Popup (Simulated post-delivery) */}
        {safetyCheck && (
          <div className={styles.safetyOverlay}>
            <div className={`${styles.safetyPopup} card`}>
              <h2>Order Arrived?</h2>
              <p>Did your SOS order arrive safely?</p>
              <div className={styles.safetyButtons}>
                <button className={styles.btnSafe} onClick={() => setSafetyCheck(false)}>Yes, Safely</button>
                <button className={styles.btnIssue} onClick={() => setSafetyCheck(false)}>Report Issue</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
