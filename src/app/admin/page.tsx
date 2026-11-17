'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ดึงค่ารหัสผ่านที่ตั้งไว้ (ในขั้นตอนนี้เราเทียบกับค่าที่คุณตั้งใจไว้ หรือใช้รหัสง่ายๆ ก่อน เช่น '1234')
    // หรือเดี๋ยวเราจะเชื่อมกับ .env.local ต่อไปครับ
    const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || '1234';

    if (password === correctPassword) {
      // ตั้งค่า Cookie ให้มีอายุใช้งาน (เช่น 1 วัน)
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      // พาเข้าไปหน้า /admin/order ทันทีที่ล็อกอินผ่าน
      router.push('/admin/order');
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '320px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Admin Login</h2>
        
        <input 
          type="password" 
          placeholder="กรอกรหัสผ่าน..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '15px' }}>รหัสผ่านไม่ถูกต้อง!</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}