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
  return (
    <div className={`${styles.card} card`}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {product.discount && <span className={styles.discountBadge}>-{product.discount}%</span>}
        {product.stock <= 0 && <span className={styles.oosBadge}>Out of Stock</span>}
        {product.stock > 0 && product.stock < 10 && <span className={styles.lowStockBadge}>Only {product.stock} left!</span>}
        {product.isTrending && <span className={styles.trendingBadge}>🔥 Trending</span>}
      </div>
      
      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        
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
