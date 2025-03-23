const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());  // อนุญาตทุก origin

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password, mail } = req.body;
  console.log('Received registration data:', { username, password, mail });

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR mail = ?';
  db.query(checkUserQuery, [username, mail], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      console.log('User already exists');
      return res.json({ success: false, message: 'Username or email already exists' });
    }

    // Insert new user
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

// Check username availability
app.post('/check-username', (req, res) => {
  const { username } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.json({ available: false });
    }
    res.json({ available: results.length === 0 });
  });
});

// Check email availability
app.post('/check-email', (req, res) => {
  const { mail } = req.body;
  
  const query = 'SELECT * FROM users WHERE mail = ?';
  db.query(query, [mail], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.json({ available: false });
    }
    res.json({ available: results.length === 0 });
  });
});

// Add this new endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, password });
  
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    console.log('Query results:', results);

    if (results.length === 0) {
      return res.json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // Don't send password back to client
    const user = { ...results[0] };
    delete user.password;

    res.json({ 
      success: true, 
      message: 'เข้าสู่ระบบสำเร็จ',
      user: user
    });
  });
});

// Add wish endpoint
app.post('/submit-wish', (req, res) => {
  const { planetId, wisherName, wishText } = req.body;
  
  const query = 'INSERT INTO wishes (planet_id, wisher_name, wish_text) VALUES (?, ?, ?)';
  db.query(query, [planetId, wisherName, wishText], (err, result) => {
    if (err) {
      console.error('Error saving wish:', err);
      return res.json({ success: false, message: 'Failed to save wish' });
    }
    res.json({ success: true, message: 'Wish saved successfully' });
  });
});

// ดึงคำอธิษฐานทั้งหมด
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

// ดึงคำอธิษฐานตามดาว
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

// หรือระบุ port ที่แน่นอน
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
