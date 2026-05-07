'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className={styles.loading}>
        <Navbar />
        <div className="container">
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <h1>My Profile</h1>
          <span className={styles.editBtn}>Edit Profile</span>
        </div>

        <div className={styles.profileGrid}>
          <div className={styles.mainCard}>
            <div className={styles.studentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarLarge}>{user.name?.charAt(0) || 'U'}</div>
                <div className={styles.nameInfo}>
                  <h2>{user.name || 'Student Name'}</h2>
                  <p>{user.phone || '+91 00000 00000'}</p>
                </div>
                <div className={styles.primeBadge}>Prime Member</div>
              </div>

              <div className={styles.cardDetails}>
                <div className={styles.detailItem}>
                  <label>College</label>
                  <p>{user.college?.name || 'SJBIT'}</p>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <label>Hostel</label>
                    <p>{user.hostelName || 'Block B'}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Room #</label>
                    <p>{user.roomNumber || '304'}</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <span className={styles.memberSince}>Student ID: #{user.id?.slice(0, 8)}</span>
              </div>
            </div>

            <div className={styles.loyaltyStats}>
              <div className={styles.statBox}>
                <h3>1,250</h3>
                <p>Loyalty Points</p>
              </div>
              <div className={styles.statBox}>
                <h3>Silver</h3>
                <p>Tier Level</p>
              </div>
              <div className={styles.statBox}>
                <h3>₹420</h3>
                <p>Total Savings</p>
              </div>
            </div>
          </div>

          <aside className={styles.actionsSide}>
            <div className={`${styles.actionCard} card`}>
              <h3>Quick Actions</h3>
              <div className={styles.actionLinks}>
                <div className={styles.actionLink}>
                  <span>📦</span> My Orders
                </div>
                <div className={styles.actionLink}>
                  <span>❤️</span> My Wishlist
                </div>
                <div className={styles.actionLink}>
                  <span>📍</span> Delivery Addresses
                </div>
                <div className={styles.actionLink}>
                  <span>💳</span> Payment Methods
                </div>
                <div className={styles.actionLink} style={{ color: '#EF4444' }} onClick={() => { localStorage.removeItem('user'); window.location.href='/login'; }}>
                  <span>🚪</span> Logout
                </div>
              </div>
            </div>
            
            <div className={styles.promoCard}>
              <h4>Refer a Friend</h4>
              <p>Get 500 points when they place their first order.</p>
              <button className={styles.referBtn}>Invite Now</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
