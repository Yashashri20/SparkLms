// // const db = require('../db');
// // const path = require('path');
// // const fs = require('fs');

// // exports.createCourse = (req, res) => {
// //     const { title, description, teacher_name, standard } = req.body;

// //     // Check if teacher is logged in
// //     const teacher_id = req.session.teacher_id;
// //     if (!teacher_id) {
// //         return res.status(401).json({ message: 'Unauthorized: teacher not logged in' });
// //     }

// //     if (!req.files || !req.files.video) {
// //         return res.status(400).json({ message: 'Video file is required' });
// //     }

// //     const video = req.files.video;
// //     const uploadPath = path.join(__dirname, '../public/uploads/videos/');
// //     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// //     const videoFileName = Date.now() + '_' + video.name;
// //     const videoPath = '/uploads/videos/' + videoFileName;

// //     // Save the video file
// //     video.mv(uploadPath + videoFileName, (err) => {
// //         if (err) {
// //             console.error('Video upload error:', err);
// //             return res.status(500).json({ message: 'Video upload failed' });
// //         }

// //         // Insert course into DB
// //         const sql = `
// //             INSERT INTO course (title, description, teacher_name, standard, video_path,teacher_id)
// //             VALUES (?, ?, ?, ?, ?, ?)
// //         `;
// //         db.query(sql, [title, description, teacher_name, standard, videoPath, teacher_id], (error) => {
// //             if (error) {
// //                 console.error('Error creating course:', error);
// //                 return res.status(500).json({ message: 'Internal server error' });
// //             }
// //             res.json({ message: 'Course created successfully' });
// //         });
// //     });
// // };

// // exports.getCourses = (req, res) => {
// //     const sql = 'SELECT * FROM course ORDER BY created_at DESC';
// //     db.query(sql, (error, results) => {
// //         if (error) {
// //             console.error('Error fetching courses:', error);
// //             return res.status(500).json({ message: 'Error fetching courses' });
// //         }
// //         res.json(results);
// //     });
// // };


// // const db = require('../db');
// // const path = require('path');
// // const fs = require('fs');

// // exports.createCourse = (req, res) => {

// //     const { title, description, teacher_name, standard } = req.body;

// //     if (!req.files || !req.files.video) {
// //         return res.status(400).json({ message: 'Video file is required' });
// //     }

// //     const video = req.files.video;
// //     const uploadPath = path.join(__dirname, '../public/uploads/videos/');
// //     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// //     const videoFileName = Date.now() + '_' + video.name;
// //     const videoPath = '/uploads/videos/' + videoFileName;
  
// //         // Save video file
// //         video.mv(uploadPath + videoFileName, (err) => {
// //             if (err) {
// //                 console.error('Video upload error:', err);
// //                 return res.status(500).json({ message: 'Video upload failed' });
// //             }

// //             // Insert into DB
// //             const sql = `
// //             INSERT INTO course (title, description, teacher_name, standard, video_path,teacher_id)
// //             VALUES (?, ?, ?, ?, ?,?)
// //         `;
// //             db.query(sql, [title, description, teacher_name, standard, videoPath, teacher_id], (error) => {
// //                 if (error) {
// //                     console.error('Error creating course:', error);
// //                     return res.status(500).json({ message: 'Internal server error' });
// //                 }
// //                 res.json({ message: 'Course created successfully' });
// //             });
// //         });
// //     };

// //     exports.getCourses = (req, res) => {
// //         const sql = 'SELECT * FROM course ORDER BY created_at DESC';
// //         db.query(sql, (error, results) => {
// //             if (error) {
// //                 console.error('Error fetching courses:', error);
// //                 return res.status(500).json({ message: 'Error fetching courses' });
// //             }
// //             res.json(results);
// //         });
// //     };
// // ;
// const db = require('../db');
// const path = require('path');
// const fs = require('fs');

// exports.createCourse = (req, res) => {
//     const { title, description, teacher_name, standard } = req.body;

//     // Get logged-in user's ID from session
//     const id = req.session.id;

//     if (!id) {
//         return res.status(401).json({ message: 'Unauthorized: login required' });
//     }

//     if (!req.files || !req.files.video) {
//         return res.status(400).json({ message: 'Video file is required' });
//     }

//     const video = req.files.video;
//     const uploadPath = path.join(__dirname, '../public/uploads/videos/');
//     if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

//     const videoFileName = Date.now() + '_' + video.name;
//     const videoPath = '/uploads/videos/' + videoFileName;

//     // Save video file
//     video.mv(uploadPath + videoFileName, (err) => {
//         if (err) {
//             console.error('Video upload error:', err);
//             return res.status(500).json({ message: 'Video upload failed' });
//         }

//         // Insert course into DB with user_id as "id"
//         const sql = `
//             INSERT INTO course (title, description, teacher_name, standard, video_path, id)
//             VALUES (?, ?, ?, ?, ?, ?)
//         `;
//         db.query(sql, [title, description, teacher_name, standard, videoPath, id], (error) => {
//             if (error) {
//                 console.error('Error creating course:', error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }
//             res.json({ message: 'Course created successfully' });
//         });
//     });
// };
// controllers/courseController.js

const db = require('../db');
const path = require('path');
const fs = require('fs');

exports.createCourse = (req, res) => {
    const { title, description, teacher_name, standard } = req.body;

    // Get logged-in user ID from session
    const id = req.session.user_id;

    if (!id) {
        return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }

    if (!req.files || !req.files.video) {
        return res.status(400).json({ message: 'Video file is required' });
    }

    const video = req.files.video;
    const uploadPath = path.join(__dirname, '../public/uploads/videos/');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const videoFileName = Date.now() + '_' + video.name;
    const videoPath = '/uploads/videos/' + videoFileName;

    // Save the video file
    video.mv(uploadPath + videoFileName, (err) => {
        if (err) {
            console.error('Video upload error:', err);
            return res.status(500).json({ message: 'Video upload failed' });
        }

        // Insert course into DB with user ID
        const sql = `
            INSERT INTO course (title, description, teacher_name, standard, video_path, id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [title, description, teacher_name, standard, videoPath, id], (error) => {
            if (error) {
                console.error('Error creating course:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.json({ message: 'Course created successfully' });
        });
    });
};

exports.getCourses = (req, res) => {
    const sql = 'SELECT * FROM course ORDER BY created_at DESC';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching courses:', error);
            return res.status(500).json({ message: 'Error fetching courses' });
        }
        res.json(results);
    });
};
