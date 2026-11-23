'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import ExchangeRateBadge from '@/components/ExchangeRateBadge';
import RegionModeTabs from '@/components/RegionModeTabs'

export default function CheckPricePageUS() {
  
    const router = useRouter();
    const [itemPrice, setItemPrice] = useState("");
    const [itemWeight, setItemWeight] = useState("");
    const [usCost, setUsCost] = useState(0);
    const [usCost50, setUsCost50] = useState(0);
    const [usCost100, setUsCost100] = useState(0);
    const [thDeliveryPrice, setThDeliveryPrice] = useState(50);

    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const handleRateChange = useCallback((rate: number | null) => {
        setExchangeRate(rate);
    }, []);

    useEffect(() => {
        const priceText = String(itemPrice ?? '').trim();
        const weightText = String(itemWeight ?? '').trim();

        const priceNum = Number(priceText);
        const weightNum = Number(weightText);

        // 1. เช็กทันทีถ้าพิมพ์สิ่งที่ไม่ใช่ตัวเลขลงในช่องใดช่องหนึ่ง
        if ((priceText !== '' && !Number.isFinite(priceNum)) || 
            (weightText !== '' && !Number.isFinite(weightNum))) {
            alert('กรุณากรอกราคาต้นทุนและน้ำหนักเป็นตัวเลขเท่านั้นครับ');
            return;
        }

        // 2. ถ้ายังกรอกไม่ครบทั้ง 2 ช่อง ให้รีเซ็ตค่าเป็น 0
        if (priceText === '' || weightText === '') {
            setUsCost(0);
            return;
        }

        const effectiveRate = exchangeRate ?? 32; // ใช้เรทสำรอง 32 หาก exchangeRate เป็น null
        var cost = ((priceNum + ((weightNum * 25) / 1000 )) * effectiveRate) ;
        setUsCost(cost + thDeliveryPrice);
        setUsCost50((cost *1.5) + thDeliveryPrice);
        setUsCost100((cost *2) + thDeliveryPrice);
    }, [itemPrice, itemWeight, exchangeRate]);

    
    

    return (
        <div className="happyContainer" style={{}}>
            <img className="logo" src="/logored.png" alt=""
                onClick={() => {
                    router.push('/');
                }}
                
            />
            {/* เฮดเดอร์บอกชื่อหน้า */}
            <h1
                style={{
                textAlign: 'left',
                fontSize: '22px',
                fontWeight: 700,
                marginTop: '10px',
                color: '#1e293b',
                }}
            >
                คำนวณราคาขาย
            </h1>

            <ExchangeRateBadge onRateChange={handleRateChange} />
            <div style={{ clear: 'both' }}></div>

            {/* แถวช่องกรอกข้อมูล 2 ช่อง */}
            <input
                type="text"
                placeholder="ราคาต้นทุนอเมริกา..."
                className="txtcheckprice"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                onFocus={(e) => { e.currentTarget.select(); }}
            />
            <input
                type="text"
                placeholder="น้ำหนัก(กรัม)..."
                className="txtcheckprice"
                style={{float: 'right' }}
                value={itemWeight}
                onChange={(e) => setItemWeight(e.target.value)}
                onFocus={(e) => { e.currentTarget.select(); }}
            />
            <div style={{ clear: 'both' }}></div>

        {/* โซนแสดงผลลัพธ์ 3 รายการ */}
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
                marginTop: '12px',
                }}
            >
                {/* 1. ราคาต้นทุนจริงเมื่อคำนวณแล้ว */}
                <div
                style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                }}
                >
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                    ต้นทุนจริง + ค่าส่ง
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>
                    ฿{usCost.toFixed(2)}
                </div>
                </div>

                {/* 2. ราคาต้นทุน + กำไร 50% */}
                <div
                style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #bfdbfe',
                    backgroundColor: '#eff6ff',
                }}
                >
                <div style={{ fontSize: '13px', color: '#1d4ed8', marginBottom: '6px' }}>
                    ต้นทุนจริง + ค่าส่ง + กำไร 50%
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e3a8a' }}>
                    ฿{(usCost50).toFixed(2)}
                </div>
                </div>

                {/* 3. ราคาต้นทุน + กำไร 100% */}
                <div
                style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid #bbf7d0',
                    backgroundColor: '#f0fdf4',
                }}
                >
                <div style={{ fontSize: '13px', color: '#15803d', marginBottom: '6px' }}>
                    ต้นทุนจริง + ค่าส่ง + กำไร 100%
                </div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#14532d' }}>
                    ฿{(usCost100).toFixed(2)}
                </div>
                </div>
            </div>
            <RegionModeTabs/>
        </div>
    );
}