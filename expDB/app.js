const express = require('express');
const app = express();
const db = require('./database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
