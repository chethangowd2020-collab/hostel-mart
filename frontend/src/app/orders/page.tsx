'use client';

import Navbar from '@/components/Navbar';
import styles from './orders.module.css';

const ORDERS = [
  { id: 'ORD-101', date: '05 May 2026', itemsCount: 3, total: 245, status: 'Delivered', items: ['Maggi Masala x2', 'Coke 500ml x1', 'Oreo Pack x1'] },
  { id: 'ORD-098', date: '01 May 2026', itemsCount: 1, total: 850, status: 'Delivered', items: ['Scientific Calculator x1'] },
  { id: 'ORD-095', date: '25 April 2026', itemsCount: 5, total: 1200, status: 'Delivered', items: ['Essential Exam Kit x1', 'Red Bull x2', 'Blue Pens x2'] }
];

export default function OrderHistory() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <h1>Order History</h1>
          <p>Manage and reorder your past purchases.</p>
        </div>

        <section className={styles.orderList}>
          {ORDERS.map(order => (
            <div key={order.id} className={`${styles.orderCard} card`}>
              <div className={styles.orderHeader}>
                <div>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.orderDate}>{order.date}</span>
                </div>
                <span className={styles.statusBadge}>{order.status}</span>
              </div>
              
              <div className={styles.orderContent}>
                <div className={styles.itemsSummary}>
                  <h4>{order.itemsCount} Items</h4>
                  <p>{order.items.join(', ')}</p>
                </div>
                <div className={styles.orderTotal}>
                  <small>Total Paid</small>
                  <strong>₹{order.total}</strong>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.btnSecondary}>View Details</button>
                <button className="btn-primary">One-Tap Reorder</button>
              </div>
            </div>
          ))}
        </section>

        {/* Feature 2 - My Usuals in Order History */}
        <section className={styles.usualsSection}>
          <h2>My Usuals</h2>
          <div className={styles.usualsGrid}>
            {['Maggi', 'Coke', 'Pens', 'Notebooks', 'Milk'].map((item, idx) => (
              <div key={idx} className={styles.usualItem}>
                <div className={styles.usualIcon}>📦</div>
                <span>{item}</span>
                <button className={styles.addBtn}>+ Add</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
