'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const HERO_SLIDES = [
  { id: 1, title: "Midnight Cravings?", subtitle: "SOS Delivery — 10 PM to 6 AM.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070", cta: "Order SOS Now", color: "#FF2D2D" },
  { id: 2, title: "Exam Week Survival", subtitle: "Coffee, notes & snacks in 15 mins.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070", cta: "Shop Study Fuel", color: "#3D2C8D" },
  { id: 3, title: "Forgot Something?", subtitle: "Toothbrush, snacks, or noodles — we got you.", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070", cta: "Shop Essentials", color: "#FF6B2C" },
];

const MOCK_USUALS = [
  { id: 'u1', name: 'Maggi Cup', orders: 24, price: 35, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=60' },
  { id: 'u2', name: 'Nescafe Sachet', orders: 18, price: 10, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=60' },
  { id: 'u3', name: 'Oreo Pack', orders: 15, price: 40, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=60' },
  { id: 'u4', name: 'Dark Chocolate', orders: 12, price: 65, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&auto=format&fit=crop&q=60' },
  { id: 'u5', name: 'Energy Drink', orders: 10, price: 125, image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&auto=format&fit=crop&q=60' },
  { id: 'u6', name: 'Pen Pack', orders: 9, price: 30, image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=60' },
  { id: 'u8', name: 'Cup Noodles', orders: 6, price: 40, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=60' },
];

const FORGOT_ITEMS = [
  { id: 'f1', name: 'Toothbrush', emoji: '🪥', price: 45 },
  { id: 'f2', name: 'Toothpaste', emoji: '🦷', price: 65 },
  { id: 'f4', name: 'Pen', emoji: '✏️', price: 15 },
  { id: 'f5', name: 'Notebook', emoji: '📓', price: 50 },
  { id: 'f6', name: 'Deodorant', emoji: '💨', price: 110 },
  { id: 'f7', name: 'Soap', emoji: '🧼', price: 40 },
  { id: 'f8', name: 'Razor', emoji: '🪒', price: 85 },
  { id: 'f9', name: 'Cup Noodles', emoji: '🍜', price: 40 },
  { id: 'f10', name: 'Coffee', emoji: '☕', price: 10 },
];

const COMBOS = [
  { id: 'c1', name: 'Study Survival Combo', items: 'Coffee + Maggi + Dark Chocolate + Pen', price: 125, badge: '🎓', color: '#3D2C8D' },
  { id: 'c2', name: 'Midnight Rescue Combo', items: 'Noodles + Coffee + Chips + Energy Drink', price: 185, badge: '🌙', color: '#FF2D2D' },
  { id: 'c3', name: 'Exam Rush Combo', items: 'Pen Pack + Sticky Notes + Coffee + Chocolate', price: 145, badge: '📝', color: '#FF6B2C' },
  { id: 'c4', name: 'Freshers Essentials Combo', items: 'Bucket + Mug + Lock + Hangers', price: 399, badge: '🎒', color: '#4CAF50' },
];

const CATEGORIES = [
  { name: 'Emergency SOS', emoji: '🚨', color: '#FF2D2D' },
  { name: 'Medical', emoji: '🏥', color: '#E53935' },
  { name: 'Quick Meals', emoji: '🍜', color: '#FF6B2C' },
  { name: 'Study Fuel', emoji: '☕', color: '#3D2C8D' },
  { name: 'Stationery', emoji: '✏️', color: '#2196F3' },
  { name: 'Personal Care', emoji: '🧼', color: '#00BCD4' },
  { name: 'Room Essentials', emoji: '🏠', color: '#4CAF50' },
  { name: "Women's Essentials", emoji: '💜', color: '#E91E63' },
];

const SOS_PRODUCTS = [
  { id: 's4', name: 'Instant Coffee', price: 10, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 50 },
  { id: 's6', name: 'Toothbrush', price: 45, image: 'https://images.unsplash.com/photo-1607619056574-7b4d1937de81?w=400&auto=format&fit=crop&q=60', category: 'Personal Care', stock: 20 },
  { id: 's7', name: 'Sanitary Pads (XL)', price: 95, image: 'https://images.unsplash.com/photo-1605649487212-47bdab064f73?w=400&auto=format&fit=crop&q=60', category: "Women's Essentials", stock: 30 },
  { id: 's8', name: 'Bathing Soap', price: 40, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60', category: 'Personal Care', stock: 40 },
];

const QUICK_MEALS = [
  { id: 'm1', name: 'Cup Noodles', price: 40, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 25, isTrending: true },
  { id: 'm2', name: 'Ready Pasta Cup', price: 65, originalPrice: 80, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 15 },
  { id: 'm3', name: 'Frozen Momos (8pc)', price: 99, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 10, isTrending: true },
  { id: 'm4', name: 'Instant Oats Cup', price: 55, originalPrice: 70, image: 'https://images.unsplash.com/photo-1574282565770-7a618b08b1a8?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 20 },
];

const STUDY_FUEL = [
  { id: 'sf1', name: 'Red Bull Energy', price: 125, image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 20, isTrending: true },
  { id: 'sf2', name: 'Dark Chocolate Bar', price: 65, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 30 },
  { id: 'sf3', name: 'Nescafe Sachet 5pk', price: 45, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 50 },
  { id: 'sf4', name: 'Protein Bar', price: 95, originalPrice: 120, image: 'https://images.unsplash.com/photo-1517093602195-b40af9688466?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 15 },
];

const EXPIRING_SOON = [
  { id: 'e1', name: 'Yogurt Cup', price: 25, originalPrice: 50, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 8, daysToExpiry: 1, expiryDate: '09 May 2026', discount: 50 },
  { id: 'e2', name: 'Fresh Sandwich', price: 45, originalPrice: 90, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 5, daysToExpiry: 1, expiryDate: '09 May 2026', discount: 50 },
  { id: 'e3', name: 'Cold Coffee', price: 35, originalPrice: 75, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=60', category: 'Study Fuel', stock: 6, daysToExpiry: 2, expiryDate: '10 May 2026', discount: 53 },
  { id: 'e4', name: 'Pastry Box', price: 45, originalPrice: 100, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&auto=format&fit=crop&q=60', category: 'Quick Meals', stock: 4, daysToExpiry: 2, expiryDate: '10 May 2026', discount: 55 },
];

const PAST_ORDERS = [
  { id: 'ord1', date: '2 days ago', items: ['Maggi Cup x2', 'Coffee x3'], total: 84 },
  { id: 'ord2', date: '5 days ago', items: ['Stationery Kit x1', 'Energy Drink x2'], total: 690 },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handleForgotAdd = (id: string) => {
    setAddedItems(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>

        {/* Exam Banner */}
        <section className={styles.calendarBanner}>
          <div className="container">
            <div className={styles.bannerContent}>
              <div className={styles.bannerInfo}>
                <span className={styles.calendarIcon}>📅</span>
                <div>
                  <strong>Exams start in 5 days</strong>
                  <p>Get your study essentials and energy kits ready.</p>
                </div>
              </div>
              <Link href="/kit-builder" className={styles.bannerCta}>Shop Exam Essentials →</Link>
            </div>
          </div>
        </section>

        {/* Hero Carousel */}
        <section className={styles.hero}>
          <div className={styles.carousel}>
            {HERO_SLIDES.map((slide, index) => (
              <div key={slide.id} className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${slide.image})` }}>
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                  <button className={styles.heroCta} style={{ backgroundColor: slide.color }}>{slide.cta}</button>
                </div>
              </div>
            ))}
            <div className={styles.carouselDots}>
              {HERO_SLIDES.map((_, index) => (
                <div key={index} className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`} onClick={() => setCurrentSlide(index)} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="container">
          <div className={styles.quickActions}>
            <Link href="/sos" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF2D2D15', color: '#FF2D2D' }}>🚨</div>
              <h3>SOS Delivery</h3><p>Midnight essentials</p>
            </Link>
            <Link href="/group-order/new" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#3D2C8D15', color: '#3D2C8D' }}>👥</div>
              <h3>Group Order</h3><p>Order with roommates</p>
            </Link>
            <Link href="/kit-builder" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF6B2C15', color: '#FF6B2C' }}>📦</div>
              <h3>My Kits</h3><p>Survival kits</p>
            </Link>
            <Link href="/orders" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#4CAF5015', color: '#4CAF50' }}>🔄</div>
              <h3>Reorder</h3><p>Quick usuals</p>
            </Link>
          </div>
        </section>

        {/* My Usuals */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>My Usuals</h2>
              <span className={styles.badgeBlue}>Hostel Favorites</span>
            </div>
          </div>
          <div className={styles.usualsRow}>
            {MOCK_USUALS.map((item) => (
              <div key={item.id} className={`${styles.usualCard} card`}>
                <img src={item.image} alt={item.name} onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = `https://placehold.co/200x200/1e1b4b/ffffff?text=${encodeURIComponent(item.name.slice(0,10))}`; }} />
                <h4>{item.name}</h4>
                <p>₹{item.price} · {item.orders}x ordered</p>
                <button className={styles.reorderBtnSmall}>+ Add</button>
              </div>
            ))}
          </div>
        </section>

        {/* Forgot Something Strip */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Forgot Something? 🤔</h2>
              <span className={styles.badgeBlue}>One-tap Add</span>
            </div>
          </div>
          <div className={styles.forgotStrip}>
            {FORGOT_ITEMS.map(item => (
              <button key={item.id} className={`${styles.forgotChip} ${addedItems.includes(item.id) ? styles.forgotAdded : ''}`}
                onClick={() => handleForgotAdd(item.id)}>
                <span className={styles.forgotEmoji}>{item.emoji}</span>
                <span>{item.name}</span>
                <span className={styles.forgotPrice}>₹{item.price}</span>
                {addedItems.includes(item.id) && <span className={styles.checkmark}>✓</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Emergency SOS Essentials */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>🚨 Emergency SOS Essentials</h2>
              <span className={styles.badgeRed}>Delivered in 15 mins</span>
            </div>
            <Link href="/sos" className={styles.viewAll}>View All</Link>
          </div>
          <div className={styles.productGrid}>
            {SOS_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Quick Meals */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>🍜 Quick Meals</h2>
              <span className={styles.badgeBlue}>Ready in minutes</span>
            </div>
          </div>
          <div className={styles.productGrid}>
            {QUICK_MEALS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Combo Packs */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <h2>🎁 Combo Packs — Save More</h2>
          </div>
          <div className={styles.comboGrid}>
            {COMBOS.map(combo => (
              <div key={combo.id} className={styles.comboCard} style={{ borderLeft: `4px solid ${combo.color}` }}>
                <div className={styles.comboBadge} style={{ background: combo.color }}>{combo.badge}</div>
                <h3>{combo.name}</h3>
                <p>{combo.items}</p>
                <div className={styles.comboFooter}>
                  <strong>₹{combo.price}</strong>
                  <button className="btn-primary" style={{ background: combo.color }}>Add Combo</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Fuel */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>☕ Study Fuel</h2>
              <span className={styles.badgeBlue}>Exam season picks</span>
            </div>
          </div>
          <div className={styles.productGrid}>
            {STUDY_FUEL.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Categories */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}><h2>Explore Categories</h2></div>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map(cat => {
              // Route to /sos for Emergency SOS, /medical for Medical, otherwise dynamic category page
              const href = cat.name === 'Emergency SOS' ? '/sos' 
                        : cat.name === 'Medical' ? '/medical' 
                        : `/category/${cat.name.toLowerCase().replace(/ /g, '-')}`;
              
              return (
                <Link 
                  href={href} 
                  key={cat.name} 
                  className={styles.categoryCard} 
                  style={{ borderBottom: `3px solid ${cat.color}`, textDecoration: 'none' }}
                >
                  <div className={styles.catEmoji}>{cat.emoji}</div>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Order Again */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <h2>Order Again</h2>
            <Link href="/orders" className={styles.viewAll}>View History</Link>
          </div>
          <div className={styles.orderAgainGrid}>
            {PAST_ORDERS.map(order => (
              <div key={order.id} className={`${styles.recentOrderCard} card`}>
                <div className={styles.orderMeta}><strong>{order.date}</strong><span>₹{order.total}</span></div>
                <p>{order.items.join(', ')}</p>
                <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Reorder All</button>
              </div>
            ))}
          </div>
        </section>

        {/* Expiring Soon */}
        <section className="container" style={{ marginTop: '50px', marginBottom: '80px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Expiring Soon — Heavy Discounts 🌿</h2>
              <span className={styles.badgeGreen}>Eco-Saver Mode</span>
            </div>
            <span className={styles.incentiveText}>Earn 1.5X Loyalty Points!</span>
          </div>
          <div className={styles.productGrid}>
            {EXPIRING_SOON.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

      </main>

      <Link href="/sos" className={styles.floatingSos}>
        <div className={styles.sosRipple}></div>
        <span>SOS</span>
      </Link>
    </div>
  );
}
