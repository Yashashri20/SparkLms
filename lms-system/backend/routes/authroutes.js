

// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // LOGIN
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
//     db.query(sql, [email, password], (err, results) => {
//         if (err) return res.status(500).json({ message: "DB error" });
//         if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

//         const user = results[0];
//         req.session.user_id = user.id;
//         req.session.role = user.role;

//         if (user.role === 'Teacher') {
//             const insertTeacher = "INSERT IGNORE INTO teachers (user_id) VALUES (?)";
//             db.query(insertTeacher, [user.id], (err) => {
//                 if (err) console.error('Error ensuring teacher:', err);
//             });
//         }

//         res.json({ message: "Login successful", role: user.role });
//     });
// });

// // LOGOUT
// router.post('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) return res.status(500).json({ message: "Error logging out" });
//         res.json({ message: "Logged out" });
//     });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');
const authController = require('../controllers/authcontroller'); // Add this

//  REGISTER route
router.post('/register', authController.registerUser);

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: "DB error" });
        if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];
        req.session.user_id = user.id;
        req.session.role = user.role;

        if (user.role === 'Teacher') {
            const insertTeacher = "INSERT IGNORE INTO teachers (user_id) VALUES (?)";
            db.query(insertTeacher, [user.id], (err) => {
                if (err) console.error('Error ensuring teacher:', err);
            });
        }

        res.json({ message: "Login successful", role: user.role });
        
    });
});

// LOGOUT
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.json({ message: "Logged out" });
    });
});

module.exports = router;
