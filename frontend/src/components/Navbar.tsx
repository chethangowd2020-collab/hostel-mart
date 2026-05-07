import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            Hostel<span>Mart</span>
          </Link>
        </div>
        
        <div className={styles.center}>
          <Link href="/loyalty" className={styles.pointsPill}>
            <span className={styles.pointsIcon}>⭐</span>
            <span className={styles.pointsValue}>1,250 Pts</span>
          </Link>
        </div>

        <div className={styles.right}>
          <Link href="/wishlist" className={styles.navIcon} title="Wishlist">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </Link>
          <Link href="/notifications" className={styles.navIcon} title="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </Link>
          <Link href="/cart" className={styles.navIcon} title="Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className={styles.cartBadge}>3</span>
          </Link>
          <Link href="/login" className={styles.navLink}>Login</Link>
          <Link href="/profile" className={styles.profileLink}>
            <div className={styles.avatar}>V</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
