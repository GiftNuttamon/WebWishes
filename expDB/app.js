const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',  // URL ของ frontend
  credentials: true
}));

app.get('/users', (req, res) => {
  //mock data user
  res.json([
    {id: 1, name: 'John', email: 'john@example.com'},
    {id: 2, name: 'Jane', email: 'jane@example.com'},
    {id: 3, name: 'Jim', email: 'jim@example.com'},
  ]);
});

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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
