'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import styles from './kit-builder.module.css';

interface KitItem {
  id: string;
  name: string;
  price: number;
  mandatory: boolean;
  category: string;
  brands?: string[];
  image?: string;
}

interface Kit {
  id: string;
  name: string;
  tagline: string;
  discount: number;
  discreetPackaging?: boolean;
  items: KitItem[];
}

const KITS: Kit[] = [
  {
    id: 'exam',
    name: 'Exam Kit',
    tagline: 'Gear up for your exams. Everything in one box.',
    discount: 0.10,
    items: [
      { id: 'e1', name: 'Ballpoint Pens (5 pack)', price: 60, mandatory: true, category: 'Stationery' },
      { id: 'e2', name: 'Highlighters (4 colors)', price: 145, mandatory: false, category: 'Stationery' },
      { id: 'e3', name: 'Sticky Notes (2 pads)', price: 95, mandatory: false, category: 'Stationery' },
      { id: 'e4', name: 'A4 Ruled Notebook', price: 75, mandatory: true, category: 'Stationery' },
      { id: 'e5', name: 'Geometry Box / Calculator', price: 299, mandatory: false, category: 'Stationery' },
      { id: 'e6', name: 'Instant Coffee (5 pack)', price: 55, mandatory: true, category: 'Food' },
      { id: 'e7', name: 'Dark Chocolate Bar', price: 120, mandatory: false, category: 'Food' },
      { id: 'e8', name: 'Throat Lozenges', price: 35, mandatory: false, category: 'Health' },
      { id: 'e9', name: 'Paracetamol Strip', price: 30, mandatory: false, category: 'Health' },
      { id: 'e10', name: 'Ear Plugs', price: 175, mandatory: false, category: 'Health' }
    ]
  },
  {
    id: 'women',
    name: "Women's Essentials Kit",
    tagline: 'Your comfort kit, delivered with care.',
    discount: 0.12,
    discreetPackaging: true,
    items: [
      { id: 'w1', name: 'Sanitary Pads (10 pack)', price: 199, mandatory: true, category: 'Hygiene', brands: ['Whisper', 'Stayfree', 'Sofy'], image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=60' },
      { id: 'w2', name: 'Pantyliners (20 pack)', price: 145, mandatory: false, category: 'Hygiene' },
      { id: 'w3', name: 'Pain Relief Roll-on', price: 110, mandatory: false, category: 'Health' },
      { id: 'w4', name: 'Dark Chocolate (Comfort)', price: 185, mandatory: true, category: 'Food' },
      { id: 'w5', name: 'Herbal Tea Bags (5 pack)', price: 85, mandatory: false, category: 'Food' },
      { id: 'w6', name: 'Face Wash (Travel Size)', price: 65, mandatory: false, category: 'Hygiene' },
      { id: 'w7', name: 'Moisturizer (Travel Size)', price: 75, mandatory: false, category: 'Hygiene' },
      { id: 'w8', name: 'Period Underwear (3 pack)', price: 499, mandatory: false, category: 'Hygiene' },
      { id: 'w9', name: 'Wet Wipes (20 pack)', price: 95, mandatory: true, category: 'Hygiene' },
      { id: 'w10', name: 'Hair Ties (10 pack)', price: 45, mandatory: false, category: 'Accessories' }
    ]
  },
  {
    id: 'starter',
    name: 'New Student Starter Kit',
    tagline: 'Move in ready. Everything a first-year needs.',
    discount: 0.15,
    items: [
      { id: 's1', name: 'Bedsheet (Single)', price: 499, mandatory: true, category: 'Home' },
      { id: 's2', name: 'Pillow Cover', price: 99, mandatory: true, category: 'Home' },
      { id: 's3', name: 'Laundry Bag', price: 175, mandatory: false, category: 'Home' },
      { id: 's4', name: 'Detergent Sachet (5 pack)', price: 60, mandatory: true, category: 'Home' },
      { id: 's5', name: 'Bathroom Slippers', price: 225, mandatory: true, category: 'Apparel' },
      { id: 's6', name: 'Towel (Medium)', price: 299, mandatory: false, category: 'Home' },
      { id: 's7', name: 'Shampoo (Travel Size)', price: 55, mandatory: true, category: 'Hygiene' },
      { id: 's8', name: 'Body Wash (Travel Size)', price: 65, mandatory: true, category: 'Hygiene' },
      { id: 's9', name: 'Toothbrush + Paste Combo', price: 135, mandatory: true, category: 'Hygiene' },
      { id: 's10', name: 'Extension Cord (1.5m)', price: 399, mandatory: false, category: 'Electronics' },
      { id: 's11', name: 'Stationery Pack', price: 175, mandatory: false, category: 'Stationery' },
      { id: 's12', name: 'Clothes Hangers (5 pack)', price: 95, mandatory: false, category: 'Home' },
      { id: 's13', name: 'Combination Padlock', price: 329, mandatory: true, category: 'Hardware' }
    ]
  }
];

export default function KitBuilderPage() {
  const [activeKitId, setActiveKitId] = useState(KITS[0].id);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { selected: boolean, qty: number, brand?: string } }>(() => {
    const initial: { [key: string]: { selected: boolean, qty: number, brand?: string } } = {};
    KITS.forEach(kit => {
      kit.items.forEach(item => {
        initial[item.id] = { selected: item.mandatory, qty: 1, brand: item.brands ? item.brands[0] : undefined };
      });
    });
    return initial;
  });

  const activeKit = useMemo(() => KITS.find(k => k.id === activeKitId)!, [activeKitId]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id].selected }
    }));
  };

  const updateQty = (id: string, delta: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], qty: Math.max(1, prev[id].qty + delta) }
    }));
  };

  const updateBrand = (id: string, brand: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], brand }
    }));
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    activeKit.items.forEach(item => {
      const config = selectedItems[item.id];
      if (config.selected) {
        subtotal += item.price * config.qty;
      }
    });
    const discount = subtotal * activeKit.discount;
    return { subtotal, discount, total: subtotal - discount };
  }, [activeKit, selectedItems]);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <header className={styles.header}>
          <h1>Essential Kit Builder</h1>
          <p>Customize your survival bundles with exclusive discounts.</p>
        </header>

        <div className={styles.kitSelector}>
          {KITS.map(kit => (
            <button 
              key={kit.id} 
              className={`${styles.kitTab} ${activeKitId === kit.id ? styles.activeTab : ''}`}
              onClick={() => setActiveKitId(kit.id)}
            >
              {kit.name}
            </button>
          ))}
        </div>

        <div className={styles.builderGrid}>
          <section className={styles.checklistSection}>
            <h3>Customize {activeKit.name}</h3>
            <p className={styles.tagline}>"{activeKit.tagline}"</p>
            
            <div className={styles.itemsList}>
              {activeKit.items.map(item => (
                <div key={item.id} className={`${styles.itemRow} ${selectedItems[item.id].selected ? styles.rowSelected : ''}`}>
                  <div className={styles.itemMain}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems[item.id].selected}
                      disabled={item.mandatory}
                      onChange={() => toggleItem(item.id)}
                    />
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      {item.mandatory && <span className={styles.mandatoryBadge}>Mandatory</span>}
                      {item.brands && selectedItems[item.id].selected && (
                        <select 
                          className={styles.brandSelect}
                          value={selectedItems[item.id].brand}
                          onChange={(e) => updateBrand(item.id, e.target.value)}
                        >
                          {item.brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.itemActions}>
                    {selectedItems[item.id].selected && (
                      <div className={styles.qtyControl}>
                        <button onClick={() => updateQty(item.id, -1)}>-</button>
                        <span>{selectedItems[item.id].qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    )}
                    <span className={styles.itemPrice}>₹{item.price * selectedItems[item.id].qty}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className={styles.previewSection}>
            <div className={`${styles.previewCard} card`}>
              <h3>Bundle Summary</h3>
              {activeKit.discreetPackaging && (
                <div className={styles.discreetToggle}>
                  <label>📦 Discreet Packaging</label>
                  <input type="checkbox" defaultChecked />
                </div>
              )}
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(0)}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Bundle Discount ({(activeKit.discount * 100).toFixed(0)}%)</span>
                  <span>-₹{totals.discount.toFixed(0)}</span>
                </div>
                <hr />
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Final Price</span>
                  <span>₹{totals.total.toFixed(0)}</span>
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Add Kit to Cart
              </button>
              <button className={styles.btnSaveKit}>
                💾 Save as "My Kit"
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
