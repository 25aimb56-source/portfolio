const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'root123', // Make sure this matches your MySQL password!
    database: 'portfolio_db'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection failed: ' + err.message);
        return;
    }
    console.log('Connected to MySQL Database!');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: 'Success', message: 'Message saved!' });
    });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));