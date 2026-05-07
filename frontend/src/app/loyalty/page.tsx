'use client';

import Navbar from '@/components/Navbar';
import styles from './loyalty.module.css';

const TIERS = [
  { name: 'Starter', range: '0-499', color: '#888', badge: 'starter' },
  { name: 'Silver', range: '500-1499', color: '#C0C0C0', badge: 'silver' },
  { name: 'Gold', range: '1500-3999', color: '#D4AF37', badge: 'gold', perk: 'Free delivery above ₹150' },
  { name: 'Platinum', range: '4000+', color: '#9370DB', badge: 'platinum', perk: 'Platinum-only exclusive deals' }
];

const HISTORY = [
  { id: 'h1', date: 'Yesterday', reason: 'Order #ORD-101 (Eco Packaging)', points: 15, type: 'earn' },
  { id: 'h2', date: '05 May', reason: 'Product Review - Maggi Noodles', points: 5, type: 'earn' },
  { id: 'h3', date: '01 May', reason: 'Redeemed for Discount', points: -100, type: 'spend' },
  { id: 'h4', date: '28 April', reason: 'Welcome Bonus', points: 100, type: 'earn' }
];

export default function LoyaltyPage() {
  const currentPoints = 1250;
  const currentTier = TIERS[1]; // Silver

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.hero}>
          <div className={styles.pointsDisplay}>
            <span className={styles.label}>Total Balance</span>
            <div className={styles.value}>
              ⭐ <span>{currentPoints}</span> Pts
            </div>
            <p>100 pts = ₹10 discount</p>
          </div>
          
          <div className={`${styles.tierCard} card`}>
            <div className={styles.tierHeader}>
              <div className={`${styles.badge} ${styles[currentTier.badge]}`}>
                {currentTier.name}
              </div>
              <div className={styles.tierProgress}>
                <div className={styles.progressLabel}>
                  <span>Progress to Gold</span>
                  <span>{currentPoints}/1500</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${(currentPoints/1500)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <section className={`${styles.earningRules} card`}>
            <h3>How to Earn</h3>
            <div className={styles.rulesGrid}>
              <div className={styles.rule}>
                <strong>🛒 Spending</strong>
                <p>₹10 = 1 Pt (2 Pts for Prime)</p>
              </div>
              <div className={styles.rule}>
                <strong>✍️ Reviews</strong>
                <p>5 Pts per product review</p>
              </div>
              <div className={styles.rule}>
                <strong>🤝 Referrals</strong>
                <p>50 Pts per successful referral</p>
              </div>
              <div className={styles.rule}>
                <strong>🕒 Off-Peak</strong>
                <p>1.5X Points (2 PM – 5 PM)</p>
              </div>
              <div className={styles.rule}>
                <strong>🌱 Eco Bonus</strong>
                <p>2 Pts for Eco Packaging</p>
              </div>
              <div className={styles.rule}>
                <strong>⭐ Ratings</strong>
                <p>3 Pts per delivery rating</p>
              </div>
            </div>
          </section>

          <section className={`${styles.history} card`}>
            <h3>Points History</h3>
            <div className={styles.historyList}>
              {HISTORY.map(item => (
                <div key={item.id} className={styles.historyItem}>
                  <div className={styles.historyInfo}>
                    <strong>{item.reason}</strong>
                    <small>{item.date}</small>
                  </div>
                  <div className={`${styles.points} ${item.type === 'earn' ? styles.plus : styles.minus}`}>
                    {item.points > 0 ? '+' : ''}{item.points}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.tiersSection}>
          <h2>Loyalty Tiers</h2>
          <div className={styles.tiersGrid}>
            {TIERS.map(tier => (
              <div key={tier.name} className={`${styles.tierInfoCard} card`}>
                <div className={`${styles.badge} ${styles[tier.badge]}`}>{tier.name}</div>
                <p className={styles.range}>{tier.range} Points</p>
                {tier.perk && <p className={styles.perk}>★ {tier.perk}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
