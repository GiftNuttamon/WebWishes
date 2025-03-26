// นำเข้า express framework สำหรับสร้าง web server
const express = require('express');
// นำเข้า cors middleware สำหรับจัดการ Cross-Origin Resource Sharing
const cors = require('cors');

// สร้าง express application
const app = express();
// นำเข้าไฟล์ database.js สำหรับการเชื่อมต่อฐานข้อมูล
const db = require('./database');

// ตั้งค่า Middleware
app.use(express.json());  // แปลงข้อมูล JSON ที่ส่งมาเป็น JavaScript object
app.use(express.urlencoded({ extended: true }));  // แปลงข้อมูล form ที่ส่งมาเป็น JavaScript object
app.use(cors());  // อนุญาตการเข้าถึง API จากทุก origin

// สร้าง endpoint สำหรับการลงทะเบียนผู้ใช้ใหม่
app.post('/register', (req, res) => {
  // รับข้อมูล username, password และ mail จาก request body
  const { username, password, mail } = req.body;
  console.log('Received registration data:', { username, password, mail });

  // ตรวจสอบว่ามีผู้ใช้นี้ในระบบแล้วหรือไม่
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR mail = ?';
  db.query(checkUserQuery, [username, mail], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    // ถ้ามีผู้ใช้นี้แล้ว ให้ส่งข้อความแจ้งเตือนกลับไป
    if (results.length > 0) {
      console.log('User already exists');
      return res.json({ success: false, message: 'Username or email already exists' });
    }

    // ถ้าไม่มีผู้ใช้นี้ ให้เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
    const insertQuery = 'INSERT INTO users (username, password, mail) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, password, mail], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.json({ success: false, message: 'Registration failed' });
      }
      console.log('Registration successful');
      res.json({ success: true, message: 'Registration successful' });
    });
  });
});

// สร้าง endpoint สำหรับตรวจสอบความพร้อมใช้งานของ username
app.post('/check-username', (req, res) => {
  const { username } = req.body;
  
  // ค้นหา username ในฐานข้อมูล
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.json({ available: false });
    }
    // ส่งผลลัพธ์ว่ามี username นี้ในระบบหรือไม่
    res.json({ available: results.length === 0 });
  });
});

// สร้าง endpoint สำหรับตรวจสอบความพร้อมใช้งานของ email
app.post('/check-email', (req, res) => {
  const { mail } = req.body;
  
  // ค้นหา email ในฐานข้อมูล
  const query = 'SELECT * FROM users WHERE mail = ?';
  db.query(query, [mail], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.json({ available: false });
    }
    // ส่งผลลัพธ์ว่ามี email นี้ในระบบหรือไม่
    res.json({ available: results.length === 0 });
  });
});

// สร้าง endpoint สำหรับการเข้าสู่ระบบ
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, password });
  
  // ตรวจสอบ username และ password ในฐานข้อมูล
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    console.log('Query results:', results);

    // ถ้าไม่พบผู้ใช้ ให้ส่งข้อความแจ้งเตือนกลับไป
    if (results.length === 0) {
      return res.json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง object ของผู้ใช้โดยไม่รวม password
    const user = { ...results[0] };
    delete user.password;

    // ส่งข้อมูลผู้ใช้กลับไปพร้อมข้อความแจ้งเตือน
    res.json({ 
      success: true, 
      message: 'เข้าสู่ระบบสำเร็จ',
      user: user
    });
  });
});

// สร้าง endpoint สำหรับบันทึกคำอธิษฐาน
app.post('/submit-wish', (req, res) => {
  const { planetId, wisherName, wishText } = req.body;
  
  // บันทึกคำอธิษฐานลงในฐานข้อมูล
  const query = 'INSERT INTO wishes (planet_id, wisher_name, wish_text) VALUES (?, ?, ?)';
  db.query(query, [planetId, wisherName, wishText], (err, result) => {
    if (err) {
      console.error('Error saving wish:', err);
      return res.json({ success: false, message: 'Failed to save wish' });
    }
    res.json({ success: true, message: 'Wish saved successfully' });
  });
});

// สร้าง endpoint สำหรับดึงคำอธิษฐานทั้งหมด เรียงตามเวลาล่าสุด
app.get('/wishes', (req, res) => {
  const query = 'SELECT * FROM wishes ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching wishes:', err);
      return res.status(500).json({ error: 'Failed to fetch wishes' });
    }
    res.json(results);
  });
});

// สร้าง endpoint สำหรับดึงคำอธิษฐานตามดาวเคราะห์ที่เลือก
app.get('/wishes/:planetId', (req, res) => {
  const { planetId } = req.params;
  const query = 'SELECT * FROM wishes WHERE planet_id = ? ORDER BY created_at DESC';
  db.query(query, [planetId], (err, results) => {
    if (err) {
      console.error('Error fetching wishes:', err);
      return res.status(500).json({ error: 'Failed to fetch wishes' });
    }
    res.json(results);
  });
});

// กำหนด port ที่ server จะทำงาน
const PORT = 3001;
// เริ่มการทำงานของ server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
