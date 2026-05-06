// @ts-ignore
const express = require('express');
// @ts-ignore
const cors = require('cors');
// @ts-ignore
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./prisma/dev.db"
  },
  useNullAsDefault: true
});

app.post('/generate-app', async (req: any, res: any) => {
  const { appName, tables } = req.body;

  try {
    for (const table of tables) {
      const tableExists = await db.schema.hasTable(table.name);
      
      if (!tableExists) {
        await db.schema.createTable(table.name, (t: any) => {
          t.increments('id').primary();
          
          table.fields.forEach((field: any) => {
            if (field.type === 'string') t.string(field.name);
            if (field.type === 'number') t.integer(field.name);
            if (field.type === 'boolean') t.boolean(field.name);
          });
          
          t.timestamps(true, true);
        });
      }
    }
    res.json({ 
      status: "success", 
      message: `تم إنشاء جداول تطبيق ${appName} بنجاح!` 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "فشل إنشاء الجداول", details: error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل الآن على: http://localhost:${PORT}`);
});