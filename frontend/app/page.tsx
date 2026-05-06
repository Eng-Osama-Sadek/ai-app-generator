'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tableName, setTableName] = useState('');

  const handleCreate = async () => {
    if (!tableName) return alert("اكتب اسم الجدول");
    try {
      const response = await axios.post('http://localhost:5000/generate-app', {
        appName: "InventorySystem",
        tables: [{ name: tableName, fields: [{ name: "item", type: "string" }] }]
      });
      alert(`✅ تم إنشاء جدول: ${tableName}`);
    } catch (error) {
      alert("❌ السيرفر مش شغال على بورت 5000");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>AI App Generator 🚀</h1>
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="اكتب inventory هنا..." 
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}
        />
        <button onClick={handleCreate} style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          إنشاء الجدول
        </button>
      </div>
    </div>
  );
}