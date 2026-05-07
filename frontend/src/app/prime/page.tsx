'use client';

import Navbar from '@/components/Navbar';
import styles from './prime.module.css';

const PLANS = [
  { id: 'monthly', name: 'Monthly Plan', price: 99, duration: '/month', popular: false },
  { id: 'semester', name: 'Semester Plan', price: 249, duration: '/6 months', popular: true, savings: 'Best Value' },
  { id: 'annual', name: 'Annual Plan', price: 399, duration: '/year', popular: false }
];

const FEATURES = [
  { name: 'Unlimited Free Delivery', prime: true, standard: false, description: 'No minimum order value' },
  { name: 'Priority Order Processing', prime: true, standard: false, description: 'Top of delivery queue' },
  { name: 'Double Loyalty Points', prime: '2X', standard: '1X' },
  { name: 'Exclusive Prime Deals', prime: true, standard: false },
  { name: 'Full SOS Midnight Access', prime: 'Unlimited', standard: 'Limited' },
  { name: 'Discounted Essential Kits', prime: true, standard: false }
];

export default function PrimePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.hero}>
          <div className={styles.primeBadgeLarge}>PRIME</div>
          <h1>Unlock the Ultimate <span>Hostel Experience</span></h1>
          <p>Get free deliveries, priority service, and exclusive savings.</p>
        </div>

        <section className={styles.plansGrid}>
          {PLANS.map(plan => (
            <div key={plan.id} className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''}`}>
              {plan.popular && <span className={styles.popularBadge}>Best Value</span>}
              <h3>{plan.name}</h3>
              <div className={styles.priceGroup}>
                <span className={styles.currency}>₹</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.duration}>{plan.duration}</span>
              </div>
              <ul className={styles.planBrief}>
                <li>✓ Free Delivery</li>
                <li>✓ 2X Points</li>
              </ul>
              <button className={plan.popular ? 'btn-secondary' : 'btn-primary'}>
                Subscribe Now
              </button>
            </div>
          ))}
        </section>

        <section className={styles.management}>
          <div className={`${styles.manageCard} card`}>
            <h3>Manage Subscription</h3>
            <div className={styles.manageRow}>
              <div className={styles.manageInfo}>
                <strong>Current Plan: None</strong>
                <p>Subscribe to start saving.</p>
              </div>
              <div className={styles.manageActions}>
                <button className={styles.btnOutline}>Pause for Breaks</button>
                <button className={styles.btnOutline}>Cancel Anytime</button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.comparison}>
          <h2>Prime vs Standard</h2>
          <div className={`${styles.tableWrapper} card`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Benefits</th>
                  <th>Standard</th>
                  <th>Prime</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{feature.name}</strong>
                      {feature.description && <p>{feature.description}</p>}
                    </td>
                    <td>{typeof feature.standard === 'boolean' ? (feature.standard ? '✓' : '✕') : feature.standard}</td>
                    <td className={styles.primeCol}>{typeof feature.prime === 'boolean' ? (feature.prime ? '✓' : '✕') : feature.prime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
