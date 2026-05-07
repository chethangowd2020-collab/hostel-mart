'use client';

import { useState } from 'react';
import styles from './delivery.module.css';

const MOCK_TASKS = [
  { id: 't1', student: 'Amit Kumar', hostel: 'Hostel 7', room: 'A-210', items: 3, status: 'Active' },
  { id: 't2', student: 'Sneha Rao', hostel: 'Hostel 12', room: 'B-104', items: 1, status: 'Pending' }
];

export default function DeliveryPortal() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatar}>RD</div>
          <div>
            <h3>Ravi Das</h3>
            <span className={styles.onlineStatus}>Online</span>
          </div>
        </div>
        <div className={styles.earnings}>
          <small>Today's Earnings</small>
          <strong>₹450</strong>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.taskTabs}>
          <button className={styles.tabActive}>Active Tasks (1)</button>
          <button className={styles.tab}>History</button>
        </div>

        <section className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapOverlay}>
              <p>Map View: <span>Hostel 7 - Main Gate</span></p>
            </div>
            {/* Interactive map visualization simulation */}
            <div className={styles.routeLine}></div>
            <div className={styles.markerStudent}>🎓</div>
            <div className={styles.markerVendor}>🏪</div>
          </div>
        </section>

        <section className={styles.tasks}>
          {MOCK_TASKS.map(task => (
            <div key={task.id} className={`${styles.taskCard} card`}>
              <div className={styles.taskHeader}>
                <span className={styles.orderId}>Order #{task.id}</span>
                <span className={styles.taskStatus}>{task.status}</span>
              </div>
              <div className={styles.taskInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Student</span>
                  <span className={styles.value}>{task.student}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Location</span>
                  <span className={styles.value}>{task.hostel}, {task.room}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>Items</span>
                  <span className={styles.value}>{task.items} items</span>
                </div>
              </div>
              
              <div className={styles.actions}>
                <button className={styles.btnChat}>Chat with Student</button>
                <button className="btn-primary">Verify OTP & Deliver</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <nav className={styles.bottomNav}>
        <button className={styles.bottomNavItemActive}>Tasks</button>
        <button className={styles.bottomNavItem}>Earnings</button>
        <button className={styles.bottomNavItem}>Profile</button>
      </nav>
    </div>
  );
}
