'use client';

import { useState } from 'react';
import styles from './vendor.module.css';

const MOCK_INVENTORY = [
  { id: '1', name: 'Maggi Noodles', stock: 150, price: 14, status: 'Normal' },
  { id: '2', name: 'Amul Milk 1L', stock: 20, price: 72, status: 'Expiring Soon' },
  { id: '3', name: 'Dairy Milk', stock: 5, price: 160, status: 'Low Stock' },
  { id: '4', name: 'Classmate Notebook', stock: 85, price: 65, status: 'Normal' }
];

export default function VendorDashboard() {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          Hostel<span>Mart</span>
          <small>Vendor Portal</small>
        </div>
        <nav className={styles.nav}>
          <button className={styles.navItemActive}>Dashboard</button>
          <button className={styles.navItem}>Inventory</button>
          <button className={styles.navItem}>Orders</button>
          <button className={styles.navItem}>Analytics</button>
          <button className={styles.navItem}>Reviews</button>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Welcome back, <span>City Store</span></h1>
          <div className={styles.headerActions}>
            <button className="btn-primary">+ Add Product</button>
          </div>
        </header>

        <section className={styles.stats}>
          <div className={`${styles.statCard} card`}>
            <span>Today's Orders</span>
            <h2>42</h2>
            <small className={styles.trendUp}>↑ 12% vs yesterday</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Revenue (May)</span>
            <h2>₹24,500</h2>
            <small className={styles.trendUp}>↑ 8% vs last month</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Low Stock Items</span>
            <h2>3</h2>
            <small className={styles.trendDown}>Action required</small>
          </div>
          <div className={`${styles.statCard} card`}>
            <span>Rating</span>
            <h2>4.8/5</h2>
            <small>95% helpful reviews</small>
          </div>
        </section>

        <section className={`${styles.inventory} card`}>
          <div className={styles.sectionHeader}>
            <h2>Inventory Management</h2>
            <input type="text" placeholder="Search products..." className={styles.search} />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td className={styles.itemName}>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[item.status.replace(' ', '')]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.editBtn}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
