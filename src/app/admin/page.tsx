'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  './page.module.css';


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
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <div className="logoContainer">
          <img src="/logored.png" className='LogoImage' />
        </div>
        <input
          type="password"
          placeholder="รหัสผ่าน..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        {error && <p className="error">รหัสผ่านไม่ถูกต้อง</p>}

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}