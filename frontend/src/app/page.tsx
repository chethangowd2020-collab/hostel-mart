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

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Maggi 2-Minute Noodles Masala, 70g',
    price: 14,
    originalPrice: 15,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1000',
    category: 'Quick Food',
    isExpiringSoon: true
  },
  {
    id: '2',
    name: 'Amul Taaza Homogenised Toned Milk, 1L',
    price: 72,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?q=80&w=1000',
    category: 'Dairy',
    isExpiringSoon: false
  },
  {
    id: '3',
    name: 'Classmate Notebook - A4, Single Line',
    price: 65,
    originalPrice: 70,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000',
    category: 'Stationery'
  },
  {
    id: '4',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    price: 160,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000',
    category: 'Snacks'
  },
  {
    id: '5',
    name: 'Red Bull Energy Drink, 250ml',
    price: 115,
    originalPrice: 125,
    image: 'https://images.unsplash.com/photo-1622543953490-3b7bc4b39c65?q=80&w=1000',
    category: 'Beverages',
    isLowStock: true
  }
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

        {/* Quick Actions Section */}
        <section className="container">
          <div className={styles.sectionHeader}>
            <h2>Quick Actions</h2>
          </div>
          <div className={styles.quickActions}>
            <Link href="/sos" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF2D2D15', color: '#FF2D2D' }}>🚨</div>
              <h3>SOS Delivery</h3>
              <p>Midnight essentials</p>
            </Link>
            <div className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#3D2C8D15', color: '#3D2C8D' }}>👥</div>
              <h3>Group Order</h3>
              <p>Order with roommates</p>
            </div>
            <Link href="/kit-builder" className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#FF6B2C15', color: '#FF6B2C' }}>📦</div>
              <h3>My Kits</h3>
              <p>Essential survival kits</p>
            </Link>
            <div className={`${styles.actionCard} card`}>
              <div className={styles.actionIcon} style={{ background: '#4CAF5015', color: '#4CAF50' }}>🔄</div>
              <h3>Reorder</h3>
              <p>Quick usuals</p>
            </div>
          </div>
        </section>

        {/* Expiring Soon Section */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2>Expiring Soon</h2>
              <span className={styles.badgeGreen}>Up to 50% OFF</span>
            </div>
            <button className={styles.viewAll}>View All</button>
          </div>
          <div className={styles.productGrid}>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container" style={{ marginTop: '50px' }}>
          <div className={styles.sectionHeader}>
            <h2>Categories</h2>
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
      </main>

      {/* Floating SOS Button */}
      <Link href="/sos" className={styles.floatingSos}>
        <div className={styles.sosRipple}></div>
        <span>SOS</span>
      </Link>
    </div>
  );
}
