'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

export default function Register() {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    college: '',
    hostel: '',
    room: '',
    gender: '',
    password: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
          name: formData.name,
          collegeName: formData.college,
          hostel: formData.hostel,
          room: formData.room,
          gender: formData.gender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/profile';
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError('Server is not responding. Please ensure backend is running on port 5000.');
      } else {
        setError('Cannot connect to server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass-card`}>
        <div className={styles.header}>
          <h1>Hostel<span>Mart</span></h1>
          <p>{step === 1 ? 'Create your student account' : 'Verify your phone number'}</p>
        </div>
        
        {error && <div className={styles.errorBanner}>{error}</div>}

        {step === 1 ? (
          <form className={styles.form} onSubmit={handleNext}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="+91 XXXXX XXXXX" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>College Name</label>
                <input 
                  type="text" 
                  placeholder="IIT Bombay" 
                  required 
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Hostel Name</label>
                <input 
                  type="text" 
                  placeholder="Hostel 12" 
                  required 
                  value={formData.hostel}
                  onChange={(e) => setFormData({...formData, hostel: e.target.value})}
                />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>Room Number</label>
                <input 
                  type="text" 
                  placeholder="B-304" 
                  required 
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                <select 
                  required 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
            <p className={styles.footerText}>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.otpGroup}>
              <p>We've sent a code to <strong>{formData.phone}</strong></p>
              <div className={styles.otpInputs}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} type="text" maxLength={1} className={styles.otpInput} />
                ))}
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Register'}</button>
            <button type="button" className={styles.resendBtn} onClick={() => setStep(1)}>
              Back to details
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
