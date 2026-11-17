'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/order');
        router.refresh();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background: '#222', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', width: '320px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ marginBottom: '20px' }}>Admin Login</h2>
        
        <input 
          type="password" 
          placeholder="กรอกรหัสผ่าน..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #444', borderRadius: '4px', background: '#333', color: '#fff', boxSizing: 'border-box' }}
        />

        {error && <p style={{ color: '#ff6b6b', fontSize: '12px', marginBottom: '15px' }}>รหัสผ่านไม่ถูกต้อง!</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </div>
  );
}