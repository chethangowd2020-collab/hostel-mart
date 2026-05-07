'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from './reviews.module.css';

const MOCK_REVIEWS = [
  {
    id: 'r1',
    product: 'Maggi Noodles',
    rating: 5,
    text: 'Always fresh and packaging was excellent. Highly recommended for late night snacks!',
    tags: ['Fresh', 'Good Packaging'],
    college: 'BITS Pilani',
    date: '2 hours ago',
    upvotes: 12,
    verified: true
  },
  {
    id: 'r2',
    product: 'Dolo 650',
    rating: 4,
    text: 'Delivery was a bit late but the medicine was exactly what I needed.',
    tags: ['Great Quality', 'Late Delivery'],
    college: 'IIT Delhi',
    date: 'Yesterday',
    upvotes: 5,
    verified: true
  }
];

export default function ReviewsPage() {
  const [showProductReview, setShowProductReview] = useState(false);
  const [showDeliveryReview, setShowDeliveryReview] = useState(false);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <header className={styles.header}>
          <h1>Student Reviews</h1>
          <p>Verified feedback from your hostel community.</p>
        </header>

        <section className={styles.stats}>
          <div className={`${styles.statCard} card`}>
            <h3>Review Rewards</h3>
            <div className={styles.rewardInfo}>
              <span>Product Review: <strong>5 Pts</strong></span>
              <span>Delivery Rating: <strong>3 Pts</strong></span>
            </div>
          </div>
        </section>

        <div className={styles.tabs}>
          <button className={styles.tabActive}>Product Reviews</button>
          <button className={styles.tab} onClick={() => setShowDeliveryReview(true)}>Pending Delivery Ratings</button>
        </div>

        <section className={styles.reviewsList}>
          {MOCK_REVIEWS.map(review => (
            <div key={review.id} className={`${styles.reviewCard} card`}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <span className={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                  <span className={styles.college}>{review.college}</span>
                  {review.verified && <span className={styles.verifiedBadge}>Verified Buyer</span>}
                </div>
                <span className={styles.date}>{review.date}</span>
              </div>
              <h4 className={styles.productName}>{review.product}</h4>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.tags}>
                {review.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
              <div className={styles.reviewFooter}>
                <button className={styles.upvoteBtn}>👍 Helpful ({review.upvotes})</button>
                <button className={styles.reportBtn}>Flag</button>
              </div>
            </div>
          ))}
        </section>

        {/* Delivery Review Modal (Mandatory Enforcement Simulation) */}
        {showDeliveryReview && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modal} card`}>
              <h2>Rate Your Delivery</h2>
              <p>How was your last delivery with <strong>Ravi Das</strong>?</p>
              
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map(s => <span key={s} className={styles.bigStar}>☆</span>)}
              </div>

              <div className={styles.tagSelector}>
                {['On Time', 'Friendly', 'Followed Instructions', 'Late', 'Rude'].map(t => (
                  <button key={t} className={styles.tagBtn}>{t}</button>
                ))}
              </div>

              <textarea placeholder="Any additional comments? (Optional)" className={styles.commentBox}></textarea>
              
              <div className={styles.modalActions}>
                <button className={styles.btnSkip} onClick={() => setShowDeliveryReview(false)}>Maybe Later</button>
                <button className="btn-primary" onClick={() => setShowDeliveryReview(false)}>Submit & Earn 3 Pts</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
