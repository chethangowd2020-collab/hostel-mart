'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const COLLEGES = [
  "IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani", 
  "VIT Vellore", "MIT Manipal", "SRM University", "Amity University"
];

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Profile Setup
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    college: '',
    hostel: '',
    room: ''
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${apiUrl}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp.join('') }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.isNewUser) {
          setStep(3);
        } else {
          // Success: Logged in
          router.push('/');
        }
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd call an API like /api/users/profile
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundDesign}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>

      <div className={`${styles.loginCard} glass-card`}>
        <div className={styles.brandHeader}>
          <h1>Hostel<span>Mart</span></h1>
          <div className={styles.stepper}>
            <div className={`${styles.stepDot} ${step >= 1 ? styles.activeDot : ''}`}></div>
            <div className={`${styles.stepLine} ${step >= 2 ? styles.activeLine : ''}`}></div>
            <div className={`${styles.stepDot} ${step >= 2 ? styles.activeDot : ''}`}></div>
            <div className={`${styles.stepLine} ${step >= 3 ? styles.activeLine : ''}`}></div>
            <div className={`${styles.stepDot} ${step >= 3 ? styles.activeDot : ''}`}></div>
          </div>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {step === 1 && (
          <form className={styles.fadeSlide} onSubmit={handlePhoneSubmit}>
            <h2>Welcome to the Mart 👋</h2>
            <p>Enter your mobile number to get started.</p>
            <div className={styles.inputWrapper}>
              <span className={styles.prefix}>+91</span>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                maxLength={10}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className={styles.fadeSlide} onSubmit={handleOtpSubmit}>
            <h2>Verify your number 🔐</h2>
            <p>Enter the 6-digit code sent to <strong>{phone}</strong></p>
            <div className={styles.otpGrid}>
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className={styles.otpBox}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  autoFocus={i === 0}
                  disabled={loading}
                />
              ))}
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button type="button" className={styles.linkBtn} onClick={() => setStep(1)} disabled={loading}>
              Change Phone Number
            </button>
          </form>
        )}

        {step === 3 && (
          <form className={styles.fadeSlide} onSubmit={handleProfileSubmit}>
            <h2>Complete Your Profile 🎓</h2>
            <p>Help us customize your experience.</p>
            
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Student Name" 
                required
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Your College</label>
              <select 
                required
                value={profile.college}
                onChange={(e) => setProfile({...profile, college: e.target.value})}
              >
                <option value="">Select College</option>
                {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Hostel Name</label>
                <input type="text" placeholder="Block B" required value={profile.hostel} onChange={(e) => setProfile({...profile, hostel: e.target.value})} />
              </div>
              <div className={styles.inputGroup} style={{ width: '100px' }}>
                <label>Room #</label>
                <input type="text" placeholder="304" required value={profile.room} onChange={(e) => setProfile({...profile, room: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="btn-primary">Start Shopping</button>
          </form>
        )}
      </div>
    </div>
  );
}
