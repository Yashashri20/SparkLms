
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload'); // Added express-fileupload

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(fileUpload()); // Enable file uploads

app.use(session({
    secret: 'yoursecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/quiz', quizRoutes);

// Serve static files (public uploads and frontend)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

// Routes
const authRoutes = require('./routes/authroutes');
const courseRoutes = require('./routes/courseroutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);



app.get('/', (req, res) => {
    res.send(' LMS Backend is running...');
});

// Start server
const PORT = 5000; // Changed to 5000 for backend
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
