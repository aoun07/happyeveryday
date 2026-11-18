'use client';

import React, { useState } from 'react';

export default function ReceiptPage() {
  useState(() => {
    // URL สำหรับดึงข้อมูล Google Apps Script
    const apiUrl = 'https://script.google.com/macros/s/AKfycbyMcRJyzrLkL-be90XAMTuYEEsIyq0pkMDKvg-H9yURjPrlyLBYVAnn_sHiJ4wiHmO1IA/exec';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const customerNameEl = document.getElementById('customer-name');
        if (customerNameEl) customerNameEl.innerText = data.customerName || '';

        const tbody = document.getElementById('items');
        if (!tbody) return;
        tbody.innerHTML = '';
        let total = 0;
      
        console.log(data);

        if (data.items && Array.isArray(data.items)) {
          data.items.forEach((d: any) => {
            const cleanItemName = String(d.item || '').replace(/\s+/g, '');
            let displayQty = d.qty;
            if (cleanItemName === 'ค่าส่ง') {
              displayQty = '';
            }

            tbody.innerHTML += `<tr>
                <td>${d.item}</td>
                <td class="item-center">${displayQty}</td>
                <td style="text-align:right">$${d.price}</td>
            </tr>`;

            total += Number(d.price) || 0;
          });
        }

        const dateEl = document.getElementById('date');
        if (dateEl) dateEl.innerText = new Date().toLocaleDateString();

        const totalPriceEl = document.getElementById('total-price');
        if (totalPriceEl) totalPriceEl.innerText = "$" + total;
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '10px' }}>
      <style>{`
        body { 
            font-family: 'Arial', sans-serif; 
            color: #333333; 
            background-color: #ffffff;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0px;
            padding-bottom: 5px;
            position: relative;
            width: 80mm;
        }
        .logo-container { width: 50%; height: 68px;}
        .logo-container img { width: 170px; position: absolute; top: 3px; }
        .date-side { font-size: 12px; color: #666666;}
        table { width: 80mm; border-collapse: collapse; font-size: 12px; }
        th { 
            border-bottom: 1px dashed #aaaaaa; 
            text-align: left; 
            padding: 5px 0; 
            color: #444444;
            font-weight: 600;
        }
        th:nth-child(3), td:nth-child(3) { text-align: right; }
        tbody tr:first-child td { padding-top: 3px; }
        td { padding: 1px 0; color: #333333; }
        .customer-section { 
            border-bottom: 1px dashed #aaaaaa; 
            padding-bottom: 8px; 
            width: 80mm;
        }
        #customer-name { 
            width: 225px; 
            font-weight: bold; 
            font-size: 14px; 
            color: #222222;
        }
        .total { 
            border-top: 1px dashed #aaaaaa; 
            font-weight: bold; 
            font-size: 15px; 
            margin-top: 3px; 
            padding: 8px 0; 
            display: flex; 
            justify-content: space-between; 
            color: #222222;
            width: 80mm;
        }
        .zelle { padding-left: 60px; position: absolute; left: 150px; top: 5px;}
        .zelle img { width: 100px; filter: grayscale(100%) opacity(85%); }
        .footer { 
            text-align: center; 
            margin-top: 8px; 
            font-style: italic; 
            font-size: 12px; 
            color: #666666;
            width: 80mm;
        }
        .item-center { text-align: center;}
      `}</style>

      {/* โครงสร้าง HTML เดิม */}
      <div className="header">
          <div className="logo-container">
              <img src="/logored.png" alt="Logo" />
          </div>
          <div className="zelle"><img src="/zelle.png" alt="Zelle" /></div>
      </div>
      
      <div className="customer-section">
          <div id="customer-name">กำลังโหลดข้อมูล...</div>
          <div className="date-side">
              วันที่: <span id="date"></span>
          </div>
      </div>
      
      <table>
          <thead>
              <tr>
                  <th>รายการ</th>
                  <th className="item-center">จำนวน</th>
                  <th>ราคา</th>
              </tr>
          </thead>
          <tbody id="items"></tbody>
      </table>

      <div className="total">
          <span>รวมทั้งสิ้น:</span>
          <span id="total-price"></span>
      </div>
      <div className="footer">Thank you for your support</div>
    </div>
  );
}