'use client';

import { useState } from 'react';
import styles from './admin.module.css';

const MOCK_REPORTS = [
  { id: '1', date: '2026-05-01', orders: 1250, revenue: 85000, signups: 150 },
  { id: '2', date: '2026-05-02', orders: 1100, revenue: 72000, signups: 120 },
  { id: '3', date: '2026-05-03', orders: 1400, revenue: 98000, signups: 210 }
];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          Hostel<span>Mart</span>
          <small>Admin Panel</small>
        </div>
        <nav className={styles.nav}>
          <button className={styles.navItemActive}>Overview</button>
          <button className={styles.navItem}>Users</button>
          <button className={styles.navItem}>Vendors</button>
          <button className={styles.navItem}>Deliveries</button>
          <button className={styles.navItem}>Revenue</button>
          <button className={styles.navItem}>Moderation</button>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Super Dashboard</h1>
          <div className={styles.adminProfile}>
            <span>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <section className={styles.stats}>
          <div className={`${styles.statCard} card`}>
            <span>Total Signups</span>
            <h2>12,450</h2>
            <small className={styles.trendUp}>+5% this week</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Active Deliveries</span>
            <h2>85</h2>
            <small>Currently live</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Monthly Revenue</span>
            <h2>₹8,45,000</h2>
            <small className={styles.trendUp}>+15% growth</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Pending Verifications</span>
            <h2>12</h2>
            <small className={styles.alertText}>Action needed</small>
          </div>
        </section>

        <section className={`${styles.chartSection} card`}>
          <div className={styles.sectionHeader}>
            <h2>Revenue Growth</h2>
            <select className={styles.filter}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className={styles.placeholderChart}>
            {/* Simulation of a bar chart */}
            <div className={styles.bars}>
              {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className={styles.bar} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className={styles.barLabels}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </section>

        <section className={`${styles.recentActivity} card`}>
          <h2>Recent Signups</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>College</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ankit Sharma</td>
                <td>Student</td>
                <td>BITS Pilani</td>
                <td><span className={styles.badgeGreen}>Active</span></td>
              </tr>
              <tr>
                <td>Priya Singh</td>
                <td>Vendor</td>
                <td>N/A</td>
                <td><span className={styles.badgeOrange}>Pending</span></td>
              </tr>
              <tr>
                <td>Rohan Verma</td>
                <td>Delivery</td>
                <td>N/A</td>
                <td><span className={styles.badgeBlue}>Verified</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
