const express = require('express');
const app = express();
const db = require('./database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get('/', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Database error');
            return;
        }
        res.send('Database connection successful!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
