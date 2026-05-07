'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Midnight Cravings?",
    subtitle: "SOS Delivery available from 10 PM to 6 AM.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070",
    cta: "Order SOS Now",
    color: "#FF2D2D"
  },
  {
    id: 2,
    title: "Exam Week Survival",
    subtitle: "Get your Exam Kits delivered in 15 mins.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
    cta: "Shop Kits",
    color: "#3D2C8D"
  },
  {
    id: 3,
    title: "Group Order Savings",
    subtitle: "Order with roommates and split the bill easily.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070",
    cta: "Start Group Order",
    color: "#FF6B2C"
  }
];

const MOCK_USUALS = [
  { id: 'u1', name: 'Maggi Noodles', orders: 12, price: 14, image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1000' },
  { id: 'u2', name: 'Nescafe Coffee Box', orders: 8, price: 180, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000' },
  { id: 'u3', name: 'Oreo Biscuits', orders: 6, price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000' },
  { id: 'u4', name: 'Amul Milk 1L', orders: 5, price: 72, image: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?q=80&w=1000' },
  { id: 'u5', name: 'Real Orange Juice', orders: 4, price: 95, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1000' }
];

const PAST_ORDERS = [
  { id: 'ord1', date: '2 days ago', items: ['Maggi x2', 'Coke x1'], total: 128 },
  { id: 'ord2', date: '5 days ago', items: ['Stationery Kit x1'], total: 450 }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        {/* FEATURE 9 — Semester Calendar Banner */}
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
              <Link href="/kit-builder" className={styles.bannerCta}>
                Shop Exam Essentials →
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Carousel */}
        <section className={styles.hero}>
          <div className={styles.carousel}>
            {HERO_SLIDES.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${slide.image})` }}
              >
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>{slide.title}</h1>
                  <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                  <button 
                    className={styles.heroCta} 
                    style={{ backgroundColor: slide.color }}
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.carouselDots}>
              {HERO_SLIDES.map((_, index) => (
                <div 
                  key={index} 
                  className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions Row */}
        <section className="container">
          <div className={styles.quickActions}>
            <Link href="/sos" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF2D2D15', color: '#FF2D2D' }}>🚨</div>
              <h3>SOS Delivery</h3>
              <p>Midnight essentials</p>
            </Link>
            <Link href="/group-order/new" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#3D2C8D15', color: '#3D2C8D' }}>👥</div>
              <h3>Group Order</h3>
              <p>Order with roommates</p>
            </Link>
            <Link href="/kit-builder" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF6B2C15', color: '#FF6B2C' }}>📦</div>
              <h3>My Kits</h3>
              <p>Essential survival kits</p>
            </Link>
            <Link href="/orders" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#4CAF5015', color: '#4CAF50' }}>🔄</div>
              <h3>Reorder</h3>
              <p>Quick usuals</p>
            </Link>
          </div>
        </section>

        {/* FEATURE 2 — My Usuals */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>My Usuals</h2>
              <span className={styles.badgeBlue}>Top 5 Favorites</span>
            </div>
          </div>
          <div className={styles.usualsRow}>
            {MOCK_USUALS.map((item) => (
              <div key={item.id} className={`${styles.usualCard} card`}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.onerror = null;
                    t.src = `https://placehold.co/200x200/1e1b4b/ffffff?text=${encodeURIComponent(item.name.slice(0,10))}`;
                  }}
                />
                <h4>{item.name}</h4>
                <p>{item.orders} times ordered</p>
                <button className={styles.reorderBtnSmall}>+ Add</button>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE 2 — Order Again (Recent Orders) */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <h2>Order Again</h2>
            <Link href="/orders" className={styles.viewAll}>View History</Link>
          </div>
          <div className={styles.orderAgainGrid}>
            {PAST_ORDERS.map((order) => (
              <div key={order.id} className={`${styles.recentOrderCard} card`}>
                <div className={styles.orderMeta}>
                  <strong>{order.date}</strong>
                  <span>₹{order.total}</span>
                </div>
                <p>{order.items.join(', ')}</p>
                <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Reorder All
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE 8 — Back in Stock (Bookmarked) */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Back in Stock</h2>
              <span className={styles.badgeGreen}>Bookmarked Items</span>
            </div>
          </div>
          <div className={styles.productGrid}>
            <ProductCard 
              product={{
                id: 'restock1',
                name: 'Scientific Calculator',
                price: 850,
                originalPrice: 999,
                image: 'https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?q=80&w=1000',
                category: 'Stationery',
                stock: 5,
                isTrending: true
              }} 
            />
            <ProductCard 
              product={{
                id: 'restock2',
                name: 'Nescafe Coffee Box',
                price: 180,
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000',
                category: 'Food',
                stock: 15
              }} 
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="container" style={{ marginTop: '50px', paddingBottom: '100px' }}>
          <div className={styles.sectionHeader}>
            <h2>Explore Categories</h2>
          </div>
          <div className={styles.categoriesGrid}>
            {['Food', 'Groceries', 'Stationery', 'Medicines', 'Women Essentials', 'Electronics'].map((cat) => (
              <div key={cat} className={styles.categoryCard}>
                <div className={styles.catImage}></div>
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </section>
        {/* FEATURE 10 — Expiring Soon (Sustainability) */}
        <section className="container" style={{ marginTop: '50px', marginBottom: '80px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Expiring Soon — Heavy Discounts 🌿</h2>
              <span className={styles.badgeGreen}>Eco-Saver Mode</span>
            </div>
            <span className={styles.incentiveText}>Earn 1.5X Loyalty Points!</span>
          </div>
          <div className={styles.productGrid}>
            <ProductCard 
              product={{
                id: 'exp1',
                name: 'Amul Milk 1L',
                price: 21,
                originalPrice: 72,
                image: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?q=80&w=1000',
                category: 'Groceries',
                stock: 8,
                daysToExpiry: 1,
                expiryDate: '09 May 2026',
                discount: 70
              }} 
            />
            <ProductCard 
              product={{
                id: 'exp2',
                name: 'Britannia Bread',
                price: 25,
                originalPrice: 50,
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000',
                category: 'Food',
                stock: 12,
                daysToExpiry: 3,
                expiryDate: '11 May 2026',
                discount: 50
              }} 
            />
          </div>
        </section>
      </main>

      {/* Floating SOS Button */}
      <Link href="/sos" className={styles.floatingSos}>
        <div className={styles.sosRipple}></div>
        <span>SOS</span>
      </Link>
    </div>
  );
}
