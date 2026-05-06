import { useState } from 'react'
import axios from 'axios'

function App() {
  const [tableName, setTableName] = useState('')

  const handleCreate = async () => {
    if (!tableName) return alert("يرجى كتابة اسم الجدول أولاً")
    try {
      // الربط مع الباك إند اللي شغال عندك على بورت 5000
      const res = await axios.post('http://localhost:5000/generate-app', {
        appName: "InventoryProject",
        tables: [{
          name: tableName,
          fields: [
            { name: "title", type: "string" },
            { name: "quantity", type: "number" }
          ]
        }]
      })
      alert(`✅ مبروك يا هندسة! تم إنشاء جدول ${tableName} بنجاح`)
    } catch (err) {
      alert("❌ خطأ: تأكد أن سيرفر Node.js يعمل حالياً")
    }
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#242424',
      color: 'white',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ color: '#646cff' }}>AI App Generator 🚀</h1>
      <p>أدخل اسم الجدول المطلوب (مثل: inventory)</p>
      
      <div style={{ marginTop: '20px' }}>
        <input 
          value={tableName} 
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Inventory Name..."
          style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            border: 'none', 
            width: '250px',
            fontSize: '16px'
          }}
        />
        <button 
          onClick={handleCreate} 
          style={{ 
            marginLeft: '10px', 
            padding: '12px 24px', 
            backgroundColor: '#646cff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          إنشاء الجدول
        </button>
      </div>
    </div>
  )
}

export default App