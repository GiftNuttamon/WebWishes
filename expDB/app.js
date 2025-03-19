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


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
