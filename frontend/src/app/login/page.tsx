'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function Login() {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass-card`}>
        <div className={styles.header}>
          <h1>Hostel<span>Mart</span></h1>
          <p>{step === 1 ? 'Login with your phone number' : 'Enter the verification code'}</p>
        </div>

        {step === 1 ? (
          <form className={styles.form} onSubmit={handleNext}>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="+91 XXXXX XXXXX" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Send OTP</button>
            <p className={styles.footerText}>
              Don't have an account? <Link href="/register">Register</Link>
            </p>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.otpGroup}>
              <p>Code sent to <strong>{phone}</strong></p>
              <div className={styles.otpInputs}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} type="text" maxLength={1} className={styles.otpInput} />
                ))}
              </div>
            </div>
            <button type="submit" className="btn-primary">Verify & Login</button>
            <button type="button" className={styles.resendBtn} onClick={() => setStep(1)}>
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
