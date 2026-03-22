// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || '',
//     database: process.env.DB_NAME || 'lms_db'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('DB connection failed:', err.message);
//     } else {
//         console.log('✅ MySQL Connected...');
//     }
// });

const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'lms_db'
});

db.connect((err) => {
    if (err) console.error('DB connection failed:', err.message);
    else console.log('✅ MySQL Connected...');
});

module.exports = db;
