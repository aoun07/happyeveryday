'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function OrderPage() {

    interface DataItem { id: number; name: string; sellingPrice: number;}
    interface DataCustommer{ id: number; name: string;}

    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // เพิ่ม State สำหรับ Search และ Dropdown ของ Item
    const [searchItemTerm, setSearchItemTerm] = useState("");
    const [isItemDropdownOpen, setIsItemDropdownOpen] = useState(false);

    const [items, setItems] = useState<DataItem[]>([]);
    const [customers, setCustomers] = useState<DataCustommer[]>([]);

    const [loading, setLoading] = useState(true);
    const [selectedCustommer, setSelectedCustomer] = useState("");

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemAmount, setItemAmount] = useState(1);
    const [selectedItems, setSelectedItems] = useState<{ name: string; price: number; amount: number }[]>([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const apiKey = process.env.NEXT_PUBLIC_API_KEY;
                const token = process.env.NEXT_PUBLIC_SECRET_TOKEN;

                const itemstUrl = `https://script.google.com/macros/s/${apiKey}/exec?token=${token}&table=items`;
                const customerUrl = `https://script.google.com/macros/s/${apiKey}/exec?token=${token}&table=custommers`;
                
                const [productRes, customerRes] = await Promise.all([
                fetch(itemstUrl),
                fetch(customerUrl)
                ]);

                const itemResult = await productRes.json();
                const customerResult = await customerRes.json();
            
                if (itemResult.status === "success") {
                    setItems(itemResult.data);
                }
                if (customerResult.status === "success") {
                    setCustomers(customerResult.data);
                }
                
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, []);

    // กรองรายชื่อลูกค้าตามคำค้นหา
    const filteredCustomers = customers.filter((cust) =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // กรองรายชื่อ Item ตามคำค้นหา
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchItemTerm.toLowerCase())
    );

    if (loading) return <div>กำลังโหลดข้อมูล...</div>;

    return (
        <div className="happyContainer">
            <img className='logo' src="/logored.png" alt="" />
            
            {/* --- ส่วนของ Textbox และ Dropdown ค้นหา (ลูกค้า) --- */}
            <div style={{ position: "relative", marginBottom: "20px", marginTop: "15px", width: "70%", float: "left"}}>
                <input
                    type="text"
                    placeholder="พิมพ์ค้นหาชื่อลูกค้า..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={(e) => {
                        e.currentTarget.select(); 
                        setIsDropdownOpen(true);
                    }}
                    style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        color: "#333",
                        backgroundColor: "#fff"
                    }}
                />

                {/* Dropdown รายชื่อลูกค้าเมื่อพิมพ์ค้นหา */}
                {isDropdownOpen && searchTerm && (
                    <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        maxHeight: "600px",
                        overflowY: "auto",
                        zIndex: 10,
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((cust) => (
                                <div
                                    key={cust.id}
                                    onClick={() => {
                                        setSearchTerm(cust.name);
                                        setSelectedCustomer(cust.name);
                                        setIsDropdownOpen(false);
                                    }}
                                    style={{
                                        padding: "10px 14px",
                                        cursor: "pointer",
                                        color: "#333",
                                        borderBottom: "1px solid #eee"
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                                >
                                    {cust.name}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: "10px 14px", color: "#888" }}>ไม่พบข้อมูลที่ค้นหา</div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ marginBottom: "20px", marginTop: "15px", float: "left", paddingLeft: "15px" }}>
                <button
                    onClick={() => {
                        if (!selectedCustommer) {
                            alert("กรุณาเลือกชื่อลูกค้าก่อนครับ!");
                            return;
                        }
                        if (selectedItems.length === 0) {
                            alert("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการครับ!");
                            return;
                        }
                        setIsReceiptOpen(true);
                    }}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#009fb7", 
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        height: "47px"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#008DA2")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#009fb7")}
                >
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>🖨️</span> ปรินซ์
                </button>
            </div>

            <div style={{ marginBottom: "20px", marginTop: "15px", float: "left", paddingLeft: "15px" }}>
                <button
                    onClick={() => {
                        setSelectedCustomer("");
                        setSearchTerm("");
                        setSearchItemTerm("");
                        setItemName("");
                        setItemPrice(0);
                        setItemAmount(1);
                        setSelectedItems([]);
                    }}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#fe4a49", 
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        height: "47px"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FF4646")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fe4a49")}
                >
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>X</span> ยกเลิก
                </button>
            </div>

            {/* --- ส่วนของ Textbox และ Dropdown ค้นหา (Item) --- */}
            <div style={{ position: "relative", marginBottom: "20px", marginTop: "15px", width: "71%", float: "left" }}>
                <input
                    type="text"
                    className='inputItem'
                    placeholder="พิมพ์ค้นหาชื่อสินค้า..."
                    value={searchItemTerm}
                    onChange={(e) => {
                        setSearchItemTerm(e.target.value);
                        setIsItemDropdownOpen(true);
                    }}
                    onFocus={(e) => {
                        e.currentTarget.select(); 
                        setIsItemDropdownOpen(true);
                    }}
                    style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        color: "#333",
                        backgroundColor: "#fff"
                    }}
                />

                {isItemDropdownOpen && searchItemTerm && (
                    <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        maxHeight: "600px",
                        overflowY: "auto",
                        zIndex: 10,
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((itm) => (
                                <div
                                    key={itm.id}
                                    onClick={() => {
                                        setSearchItemTerm(itm.name);
                                        setIsItemDropdownOpen(false);
                                        setItemName(itm.name);
                                        setItemPrice(itm.sellingPrice);
                                    }}
                                    style={{
                                        padding: "10px 14px",
                                        cursor: "pointer",
                                        color: "#333",
                                        borderBottom: "1px solid #eee"
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                                >
                                    <span>{itm.name}</span>
                                    <span style={{ color: "#666", fontWeight: "500", float: "right" }}>
                                        ${itm.sellingPrice.toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: "10px 14px", color: "#888" }}>ไม่พบข้อมูลสินค้าที่ค้นหา</div>
                        )}
                    </div>
                )}
            </div>

            {/* --- ช่องเลือกจำนวน --- */}
            <div style={{ position: "relative", marginBottom: "20px", marginTop: "15px", width: "12%", float: "left", paddingLeft: "15px"}}>
                <select
                    className='inputIAmount'
                    value={itemAmount} 
                    onChange={(e) => setItemAmount(Number(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        color: "#333",
                        backgroundColor: "#fff", 
                        height: "47px",
                        textAlign: "right"
                    }}
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            {/* --- ปุ่มเพิ่มสินค้า --- */}
            <div style={{ marginBottom: "20px", marginTop: "15px", float: "left", paddingLeft: "15px" }}>
                <button
                    onClick={() => {
                        if (!itemName) {
                            alert("กรุณาเลือกสินค้าก่อนครับ!");
                            return;
                        }
                        
                        setSelectedItems(selectedItems => [...selectedItems, {name: itemName, price: itemPrice, amount: itemAmount}]);
                    }}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        height: "47px"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
                >
                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span> เพิ่มสินค้า
                </button>
            </div>

            <div style={{ clear: "both" }}></div>

            {/* --- ส่วนแสดงตารางรายการสินค้าในตะกร้า --- */}
            <div style={{ marginTop: "20px", width: "100%", float: "left" }}>
                <h3>รายการสินค้าที่เลือก ({selectedItems.length})</h3>
                
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6", textAlign: "left" }}>
                            <th style={{ padding: "12px 16px", textAlign: "center", width: "60px" }}>ลบ</th>
                            <th style={{ padding: "12px 16px" }}>ชื่อสินค้า</th>
                            <th style={{ padding: "12px 16px", textAlign: "right" }}>ราคาต่อหน่วย</th>
                            <th style={{ padding: "12px 16px", textAlign: "right" }}>จำนวน</th>
                            <th style={{ padding: "12px 16px", textAlign: "right" }}>ราคารวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems.length > 0 ? (
                            selectedItems.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                        <button
                                            onClick={() => {
                                                setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
                                            }}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#fe4a49",
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                padding: "4px 8px",
                                                borderRadius: "4px"
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffe6e6")}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                            title="ลบรายการนี้"
                                        >
                                            ✕
                                        </button>
                                    </td>
                                    <td style={{ padding: "12px 16px", color: "#333" }}>{item.name}</td>
                                    <td style={{ padding: "12px 16px", textAlign: "right", color: "#666" }}>${item.price.toLocaleString()}</td>
                                    <td style={{ padding: "12px 16px", textAlign: "right", color: "#666" }}>{item.amount}</td>
                                    <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: "bold", color: "#333" }}>
                                        ${(item.price * item.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                                    ยังไม่มีสินค้าในรายการ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {selectedItems.length > 0 && (
                    <div style={{ marginTop: "15px", padding: "15px 20px", backgroundColor: "#fff", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>ราคารวมทั้งสิ้น:</span>
                        <span style={{ fontSize: "22px", fontWeight: "bold", color: "#28a745" }}>
                            ${selectedItems.reduce((total, item) => total + (item.price * item.amount), 0).toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            {/* --- MODAL POPUP ใบเสร็จ (อยู่ภายใน happyContainer เรียบร้อย) --- */}
            {isReceiptOpen && (
                <div className={styles.receiptModalOverlay || "receipt-modal-overlay"} style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}>
                    <div className={styles.receiptPaper || "receipt-paper"} style={{
                        backgroundColor: "#ffffff",
                        padding: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        maxHeight: "90vh",
                        overflowY: "auto"
                    }}>
                        <div className="receipt-printable">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0px", paddingBottom: "5px", position: "relative", width: "80mm" }}>
                                <div style={{ width: "50%", height: "68px" }}>
                                    <img src="/logored.png" alt="Logo" style={{ width: "170px", position: "absolute", top: "3px" }} />
                                </div>
                                <div style={{ paddingLeft: "60px", position: "absolute", left: "150px", top: "5px" }}>
                                    <img src="/zelle.png" alt="Zelle" style={{ width: "100px", filter: "grayscale(100%) opacity(85%)" }} />
                                </div>
                            </div>
                            
                            <div style={{ borderBottom: "1px dashed #aaaaaa", paddingBottom: "8px", width: "80mm" }}>
                                <div style={{ width: "225px", fontWeight: "bold", fontSize: "14px", color: "#222222" }}>{selectedCustommer}</div>
                                <div style={{ fontSize: "12px", color: "#666666" }}>
                                    วันที่: <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            <table style={{ width: "80mm", borderCollapse: "collapse", fontSize: "12px", marginTop: "5px" }}>
                                <thead>
                                    <tr>
                                        <th style={{ borderBottom: "1px dashed #aaaaaa", textAlign: "left", padding: "5px 0", color: "#444444", fontWeight: "600" }}>รายการ</th>
                                        <th style={{ borderBottom: "1px dashed #aaaaaa", textAlign: "center", padding: "5px 0", color: "#444444", fontWeight: "600" }}>จำนวน</th>
                                        <th style={{ borderBottom: "1px dashed #aaaaaa", textAlign: "right", padding: "5px 0", color: "#444444", fontWeight: "600" }}>ราคา</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItems.map((item, index) => {
                                        const cleanItemName = String(item.name || '').replace(/\s+/g, '');
                                        const displayQty = cleanItemName === 'ค่าส่ง' ? '' : item.amount;
                                        const lineTotal = item.price * item.amount;

                                        return (
                                            <tr key={index}>
                                                <td style={{ padding: "2px 0", color: "#333333" }}>{item.name}</td>
                                                <td style={{ padding: "2px 0", textAlign: "center", color: "#333333" }}>{displayQty}</td>
                                                <td style={{ padding: "2px 0", textAlign: "right", color: "#333333" }}>${lineTotal.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div style={{ borderTop: "1px dashed #aaaaaa", fontWeight: "bold", fontSize: "15px", marginTop: "3px", padding: "8px 0", display: "flex", justifyContent: "space-between", color: "#222222", width: "80mm" }}>
                                <span>รวมทั้งสิ้น:</span>
                                <span>
                                    ${selectedItems.reduce((total, item) => total + (item.price * item.amount), 0).toLocaleString()}
                                </span>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "8px", fontStyle: "italic", fontSize: "12px", color: "#666666", width: "80mm" }}>
                                Thank you for your support
                            </div>
                        </div>

                        {/* ปุ่มสั่งปริ้นท์ / ปิด */}
                        <div className="no-print" style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                            <button
                                onClick={() => window.print()}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "6px",
                                    border: "none",
                                    backgroundColor: "#009fb7",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    flex: 1
                                }}
                            >
                                🖨️ สั่งปริ้นท์
                            </button>
                            <button
                                onClick={() => setIsReceiptOpen(false)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    backgroundColor: "#f8f9fa",
                                    color: "#333",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}