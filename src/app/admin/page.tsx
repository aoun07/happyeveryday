'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // จำลองระบบ Login
    if (password === 'your-password') {
      router.push('/admin/order');
      router.refresh();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container ?? 'fallback-container'}>
      <form onSubmit={handleLogin} className={styles.form}>
        <img src="/logored.png" alt="logo" className={styles.logo} />
        <h2 className={styles.logo}>Happyeverydays login</h2>
        
        <input
          type="password"
          placeholder="รหัสผ่าน..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        {error && <p className={styles.error}>รหัสผ่านไม่ถูกต้อง</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );

}