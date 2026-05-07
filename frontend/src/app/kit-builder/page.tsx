'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './kit-builder.module.css';

const KITS = [
  {
    id: 'exam',
    name: 'Exam Survival Kit',
    basePrice: 249,
    items: [
      { id: 'k1', name: 'Transparent Pouch', price: 45, optional: false },
      { id: 'k2', name: 'Blue Pens (Pack of 3)', price: 30, optional: false },
      { id: 'k3', name: 'Mechanical Pencil', price: 60, optional: true },
      { id: 'k4', name: 'Scientific Calculator', price: 850, optional: true },
      { id: 'k5', name: 'Energy Drink', price: 110, optional: true }
    ]
  },
  {
    id: 'starter',
    name: 'New Student Starter Kit',
    basePrice: 1299,
    items: [
      { id: 's1', name: 'Bucket & Mug Set', price: 250, optional: false },
      { id: 's2', name: 'Broom & Dustpan', price: 120, optional: false },
      { id: 's3', name: 'Mattress Protector', price: 450, optional: false },
      { id: 's4', name: 'Door Mat', price: 90, optional: true },
      { id: 's5', name: 'Multi-plug Extension', price: 350, optional: true }
    ]
  }
];

export default function KitBuilder() {
  const [selectedKit, setSelectedKit] = useState(KITS[0]);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    KITS[0].items.filter(i => !i.optional).map(i => i.id)
  );

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const currentTotal = selectedKit.items
    .filter(i => selectedItems.includes(i.id))
    .reduce((sum, i) => sum + i.price, 0);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <h1>Essential Kit Builder</h1>
          <p>Customize your survival kit and save up to 15% on bundles.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.kitSelector}>
            {KITS.map(kit => (
              <button 
                key={kit.id}
                className={`${styles.kitTab} ${selectedKit.id === kit.id ? styles.activeTab : ''}`}
                onClick={() => {
                  setSelectedKit(kit);
                  setSelectedItems(kit.items.filter(i => !i.optional).map(i => i.id));
                }}
              >
                {kit.name}
              </button>
            ))}
          </div>

          <div className={styles.builderGrid}>
            <div className={`${styles.checklist} card`}>
              <h3>Customize Checklist</h3>
              <div className={styles.itemsList}>
                {selectedKit.items.map(item => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.itemInfo}>
                      <input 
                        type="checkbox" 
                        id={item.id}
                        checked={selectedItems.includes(item.id)}
                        disabled={!item.optional}
                        onChange={() => toggleItem(item.id)}
                      />
                      <label htmlFor={item.id}>
                        {item.name}
                        {!item.optional && <span className={styles.mandatory}>Mandatory</span>}
                      </label>
                    </div>
                    <span className={styles.itemPrice}>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.previewSection}>
              <div className={`${styles.previewCard} card`}>
                <div className={styles.previewImage}>
                  <div className={styles.kitIcon}>🎒</div>
                </div>
                <h3>{selectedKit.name}</h3>
                <p>{selectedItems.length} items selected</p>
                
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>₹{currentTotal}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Bundle Discount (10%)</span>
                    <span className={styles.discount}>-₹{Math.round(currentTotal * 0.1)}</span>
                  </div>
                  <hr />
                  <div className={`${styles.summaryRow} ${styles.total}`}>
                    <span>Total Price</span>
                    <span>₹{currentTotal - Math.round(currentTotal * 0.1)}</span>
                  </div>
                </div>
                
                <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  Add Kit to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
