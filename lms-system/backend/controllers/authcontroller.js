const db = require('../db');

// Register User
exports.registerUser = (req, res) => {
  const { firstname, lastname, email, phonenum, role, password } = req.body;

  if (!firstname || !lastname || !email || !phonenum || !role || !password) {
    return res.status(400).send('All fields are required.');
  }

  const insertUser = `
    INSERT INTO users (firstname, lastname, email, phonenum, role, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

//   db.query(insertUser, [firstname, lastname, email, phonenum, role, password], (err, result) => {
//     if (err) {
//       console.error('Insert error:', err);
//       return res.status(500).send('Registration failed');
//     }

//     const userId = result.insertId;
//         req.session.user_id = user.id;
//    if (role === 'Teacher') {
//       const insertTeacher = `
//         INSERT INTO teachers (user_id, firstname, lastname, email, phonenum, password)
//         VALUES (?, ?, ?, ?, ?, ?)
//       `;
//       db.query(insertTeacher, [userId, firstname, lastname, email, phonenum, password]);
//     } else if (role === 'Student') {
//       const insertStudent = `
//         INSERT INTO students (user_id, firstname, lastname, email, phonenum, password)
//         VALUES (?, ?, ?, ?, ?, ?)
//       `;
//       db.query(insertStudent, [userId, firstname, lastname, email, phonenum, password]);
//     }

//     res.send('Registration successful');
//   });
// };
// db.query(insertUser, [firstname, lastname, email, phonenum, role, password], (err, result) => {
//   if (err) {
//     console.error('Insert error:', err);

//     // ✅ If duplicate email
//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.status(409).send('Email already exists'); // 409 = Conflict
//     }

//     return res.status(500).send('Registration failed');
//   }

//   const userId = result.insertId;
//   req.session.user_id = userId;

//   if (role === 'Teacher') {
//     const insertTeacher = `
//       INSERT INTO teachers (user_id, firstname, lastname, email, phonenum, password)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     db.query(insertTeacher, [userId, firstname, lastname, email, phonenum, password]);
//   } else if (role === 'Student') {
//     const insertStudent = `
//       INSERT INTO students (user_id, firstname, lastname, email, phonenum, password)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     db.query(insertStudent, [userId, firstname, lastname, email, phonenum, password]);
//   }

//   res.send('Registration successful');
// });
db.query(insertUser, [firstname, lastname, email, phonenum, role, password], (err, result) => {
  if (err) {
    console.error('Insert error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists' }); // JSON response
    }

    return res.status(500).json({ message: 'Registration failed' }); // JSON response
  }

  const userId = result.insertId;
  req.session.user_id = userId;

  if (role === 'Teacher') {
    const insertTeacher = `
      INSERT INTO teachers (user_id, firstname, lastname, email, phonenum, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(insertTeacher, [userId, firstname, lastname, email, phonenum, password]);
  } else if (role === 'Student') {
    const insertStudent = `
      INSERT INTO students (user_id, firstname, lastname, email, phonenum, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(insertStudent, [userId, firstname, lastname, email, phonenum, password]);
  }

  res.status(200).json({ message: 'Registration successful' });
});

}

// Login User
exports.loginUser = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send("Email, password, and role are required.");
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';
  db.query(query, [email, password, role], (err, result) => {
    if (err) {
      return res.status(500).send('Login error');
    }

    if (result.length > 0) {
     
      if (role === 'Teacher') {
        res.json({ message: 'Login successful', redirect: '/dashboards/teacher_dash.html' });
      } else {
        res.json({ message: 'Login successful', redirect: '/dashboards/student.html' });
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
};
