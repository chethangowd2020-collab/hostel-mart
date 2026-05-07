'use client';

import { useState, useEffect, use } from 'react';
import { io } from 'socket.io-client';
import Navbar from '@/components/Navbar';
import styles from './group-order.module.css';

const MOCK_MEMBERS = [
  { id: 'u1', name: 'You', color: '#3D2C8D', items: [{ id: 'p1', name: 'Maggi', price: 14, qty: 2 }] },
  { id: 'u2', name: 'Rahul', color: '#FF6B2C', items: [{ id: 'p2', name: 'Red Bull', price: 115, qty: 1 }] },
  { id: 'u3', name: 'Ananya', color: '#4CAF50', items: [{ id: 'p3', name: 'Dairy Milk', price: 160, qty: 1 }] }
];

export default function GroupOrder({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins in seconds

  useEffect(() => {
    // Connect to backend (assuming it's running on localhost:5000)
    const socket = io('http://localhost:5000');
    
    socket.emit('join-room', code);

    socket.on('cart-updated', (data) => {
      // In a real app, we'd update state based on socket data
      console.log('Cart updated:', data);
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      socket.disconnect();
      clearInterval(timer);
    };
  }, [code]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalAmount = members.reduce((sum, member) => 
    sum + member.items.reduce((mSum, item) => mSum + (item.price * item.qty), 0), 0
  );

  return (
    <div className={styles.page}>
      <Navbar />
      <main className="container">
        <div className={styles.header}>
          <div className={styles.roomInfo}>
            <h1>Room Group Order</h1>
            <div className={styles.roomCodePill}>
              Code: <strong>{code}</strong>
              <button className={styles.copyBtn}>Copy</button>
            </div>
          </div>
          <div className={styles.timer}>
            <span>Cart closes in:</span>
            <strong className={timeLeft < 60 ? styles.timerUrgent : ''}>{formatTime(timeLeft)}</strong>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.cartSection}>
            <div className={styles.sectionHeader}>
              <h2>Shared Cart</h2>
              <span>{members.length} Members</span>
            </div>
            
            <div className={styles.memberList}>
              {members.map((member) => (
                <div key={member.id} className={styles.memberCard} style={{ borderLeft: `4px solid ${member.color}` }}>
                  <div className={styles.memberHeader}>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberTotal}>
                      ₹{member.items.reduce((s, i) => s + (i.price * i.qty), 0)}
                    </span>
                  </div>
                  <div className={styles.itemList}>
                    {member.items.map((item) => (
                      <div key={item.id} className={styles.item}>
                        <span>{item.qty}x {item.name}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

              <div className={`${styles.summaryCard} card`}>
                <h3>Bill Summary</h3>
                <div className={styles.summaryRow}>
                  <span>Total Cart Value</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Your Share</span>
                  <span className={styles.yourShare}>₹{members.find(m => m.id === 'u1')?.items.reduce((s, i) => s + (i.price * i.qty), 0)}</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.paymentStatus}>
                  <h4>Payment Status</h4>
                  {members.map(member => (
                    <div key={member.id} className={styles.memberStatus}>
                      <span className={styles.statusDot} style={{ background: member.id === 'u1' ? '#4CAF50' : '#FFC107' }}></span>
                      <span>{member.name}</span>
                      <span className={styles.statusText}>{member.id === 'u1' ? 'Paid' : 'Pending...'}</span>
                    </div>
                  ))}
                </div>
                
                <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                  Pay My Share (₹{members.find(m => m.id === 'u1')?.items.reduce((s, i) => s + (i.price * i.qty), 0)})
                </button>
                <p className={styles.infoText}>The order will be placed once all roommates have paid their share.</p>
              </div>
            
            <div className={`${styles.inviteCard} glass-card`}>
              <h4>Invite Roommates</h4>
              <p>Share this link to let others join the cart.</p>
              <button className={styles.shareBtn}>Share on WhatsApp</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
