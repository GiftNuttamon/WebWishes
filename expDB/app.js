const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test database connection
app.get('/kittipon', (req, res) => {
  res.send('Hello GIT');
});

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

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR mail = ?';
  db.query(checkUserQuery, [username, mail], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ success: false, message: 'Username or email already exists' });
    }

    // Insert new user
    const insertQuery = 'INSERT INTO users (username, password, mail) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, password, mail], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.json({ success: false, message: 'Registration failed' });
      }
      res.json({ success: true, message: 'Registration successful' });
    });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
