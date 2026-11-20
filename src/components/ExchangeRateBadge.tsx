'use client';

import { useEffect, useState } from 'react';

// 1. ประกาศ type ของ props ที่รับเข้ามา
interface ExchangeRateBadgeProps {
  onRateChange?: (rate: number | null) => void;
}

// 2. รับ { onRateChange } เข้ามาในพารามิเตอร์ของฟังก์ชัน
export default function ExchangeRateBadge({ onRateChange }: ExchangeRateBadgeProps) {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        const thbRate = typeof data?.rates?.THB === 'number' ? data.rates.THB : null;

        setRate(thbRate);
        // 3. เรียกใช้ตอนได้ค่าเรทเงินมาแล้ว เพื่อส่งกลับไปให้หน้า page.tsx
        onRateChange?.(thbRate);
      } catch (err) {
        console.error('Failed to fetch exchange rate:', err);
        onRateChange?.(null);
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [onRateChange]);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-400">
        กำลังโหลดเรทเงิน...
      </div>
    );
  }

  if (!rate) {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-400">
        ไม่สามารถโหลดข้อมูลได้
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ">
      <span className="text-gray-500">อัตราแลกเปลี่ยน:</span>
      <span className="font-semibold text-emerald-600">
        1 USD = {rate.toFixed(2)} THB
      </span>
    </div>
  );
}