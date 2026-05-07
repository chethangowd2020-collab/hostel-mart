'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import styles from './category.module.css';

// Mock function to generate products based on category slug
const generateCategoryProducts = (categorySlug: string) => {
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return Array.from({ length: 8 }).map((_, i) => ({
    id: `cat-${categorySlug}-${i}`,
    name: `${categoryName} Item ${i + 1}`,
    price: 50 + i * 20,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400', // Generic placeholder
    category: categoryName,
    stock: 20
  }));
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slug.replace(/-/g, ' ');
  const products = generateCategoryProducts(slug);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className="container">
            <h1>{categoryName}</h1>
            <p>Explore all essentials in this category.</p>
          </div>
        </div>

        <div className="container">
          <div className={styles.productGrid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
