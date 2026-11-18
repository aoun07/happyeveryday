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
    
    // ดึงรหัสผ่านจาก Environment Variable
    const adminPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || 'your-password';
    console.log(process.env.NEXT_PUBLIC_APP_PASSWORD)
    // เช็ครหัสผ่าน
    if (password === adminPassword) {
      router.push('/admin/order');
      router.refresh();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className='container'>
      <form onSubmit={handleLogin} className='form'>
        <div className={styles.logoContainer}>
          <img src="/logored.png" alt="Happyeveryday Logo" className='logoImage' />
        </div>
        
        <input
          type="password"
          placeholder="รหัสผ่านเข้าสู่ระบบ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />

        {error && <p className='error'>รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>}

        <button type="submit" className='button' disabled={loading}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}