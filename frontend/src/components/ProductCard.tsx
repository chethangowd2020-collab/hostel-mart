import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isExpiringSoon?: boolean;
  isLowStock?: boolean;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className={`${styles.card} card`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
        {product.isExpiringSoon && <span className={styles.expiryBadge}>Expiring Soon</span>}
      </div>
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>₹{product.price}</span>
            {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice}</span>}
          </div>
          <button className={styles.addBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
