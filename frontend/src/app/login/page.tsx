'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    college: 'SJBIT',
    hostel: '',
    room: '',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Cannot connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          password: form.password,
          name: form.name,
          collegeName: form.college,
          hostel: form.hostel,
          room: form.room,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/profile');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Cannot connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <p className={styles.tagline}>Your campus store, delivered fast.</p>
        </div>

        {/* Toggle */}
        <div className={styles.modeToggle}>
          <button
            className={`${styles.toggleBtn} ${mode === 'login' ? styles.activeToggle : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >Login</button>
          <button
            className={`${styles.toggleBtn} ${mode === 'register' ? styles.activeToggle : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >Register</button>
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        {mode === 'login' ? (
          <form className={styles.fadeSlide} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <div className={styles.inputWrapper}>
                <span className={styles.prefix}>+91</span>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  required
                  value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={e => update('password', e.target.value)}
                disabled={loading}
                className={styles.fullInput}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className={styles.switchText}>
              New student?{' '}
              <span onClick={() => setMode('register')}>Create an account</span>
            </p>
          </form>
        ) : (
          <form className={styles.fadeSlide} onSubmit={handleRegister}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Your name" required value={form.name}
                onChange={e => update('name', e.target.value)} disabled={loading} className={styles.fullInput} />
            </div>

            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <div className={styles.inputWrapper}>
                <span className={styles.prefix}>+91</span>
                <input type="tel" placeholder="10-digit number" maxLength={10} required
                  value={form.phone} onChange={e => update('phone', e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>College</label>
              <input type="text" value="SJBIT" disabled className={styles.fullInput} />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label>Hostel Block</label>
                <input type="text" placeholder="e.g. Block B" required value={form.hostel}
                  onChange={e => update('hostel', e.target.value)} disabled={loading} className={styles.fullInput} />
              </div>
              <div className={styles.inputGroup} style={{ width: '90px' }}>
                <label>Room #</label>
                <input type="text" placeholder="304" required value={form.room}
                  onChange={e => update('room', e.target.value)} disabled={loading} className={styles.fullInput} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" placeholder="Min. 6 characters" required value={form.password}
                onChange={e => update('password', e.target.value)} disabled={loading} className={styles.fullInput} />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password" required value={form.confirmPassword}
                onChange={e => update('confirmPassword', e.target.value)} disabled={loading} className={styles.fullInput} />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className={styles.switchText}>
              Already registered?{' '}
              <span onClick={() => setMode('login')}>Login here</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
