import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  discount?: number;
  isTrending?: boolean;
  daysToExpiry?: number;
  expiryDate?: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const discountAmount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className={`${styles.card} card`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <button className={styles.wishlistBtn} aria-label="Add to wishlist">
          ❤️
        </button>
        {product.discount && <span className={styles.discountBadge}>-{product.discount}%</span>}
        {product.stock <= 0 && <span className={styles.oosBadge}>Out of Stock</span>}
        {product.stock > 0 && product.stock < 10 && <span className={styles.lowStockBadge}>Only {product.stock} left!</span>}
        {product.isTrending && <span className={styles.trendingBadge}>🔥 Trending</span>}
        {product.daysToExpiry && (
          <span className={styles.expiryBadge}>
            🕒 {product.daysToExpiry} days left
          </span>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.categoryRow}>
          <span className={styles.category}>{product.category}</span>
          {product.daysToExpiry && <span className={styles.ecoIncentive}>1.5X Points 🌿</span>}
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        {product.expiryDate && <p className={styles.expiryDate}>Expires: {product.expiryDate}</p>}
        
        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <span className={styles.price}>₹{product.price}</span>
            {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice}</span>}
          </div>
          
          {product.stock > 0 ? (
            <button className={styles.addButton}>Add</button>
          ) : (
            <button className={styles.notifyButton}>
              <span className={styles.bellIcon}>🔔</span> Notify Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
