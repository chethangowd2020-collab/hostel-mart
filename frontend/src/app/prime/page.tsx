'use client';

import Navbar from '@/components/Navbar';
import styles from './prime.module.css';

const PLANS = [
  { id: 'monthly', name: 'Monthly', price: 99, duration: 'per month', popular: false },
  { id: 'yearly', name: 'Yearly', price: 399, duration: 'per year', popular: true, savings: 'Save ₹789' },
  { id: 'semester', name: 'Semester', price: 249, duration: 'per 6 months', popular: false }
];

const FEATURES = [
  { name: 'Unlimited Free Delivery', free: false, prime: true },
  { name: 'SOS Priority Processing', free: false, prime: true },
  { name: 'Extra Loyalty Points (2X)', free: false, prime: true },
  { name: 'Early Access to Kits', free: false, prime: true },
  { name: 'Exclusive Flash Sales', free: false, prime: true },
  { name: 'Price Drop Alerts', free: true, prime: true }
];

export default function PrimePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.hero}>
          <span className={styles.badge}>Hostel Mart Prime</span>
          <h1>Upgrade to <span>Prime</span> for Unlimited Benefits</h1>
          <p>Join over 5,000+ students saving ₹500+ every month.</p>
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
              {plan.savings && <p className={styles.savings}>{plan.savings}</p>}
              <button className={plan.popular ? 'btn-secondary' : 'btn-primary'}>
                Get Prime
              </button>
            </div>
          ))}
        </section>

        <section className={styles.comparison}>
          <h2>Why go Prime?</h2>
          <div className={`${styles.tableWrapper} card`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Standard</th>
                  <th>Prime</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, idx) => (
                  <tr key={idx}>
                    <td>{feature.name}</td>
                    <td className={feature.free ? styles.check : styles.cross}>
                      {feature.free ? '✓' : '✕'}
                    </td>
                    <td className={styles.check}>✓</td>
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
