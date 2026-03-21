// const db = require('../db');


// exports.createQuiz = (req, res) => {
//     const { title, standard, questions } = req.body;

//     console.log("Incoming Quiz Data:", req.body);

//     if (!title || !standard || !Array.isArray(questions)) {
//         return res.status(400).json({ message: 'Invalid quiz data' });
//     }

//     // Fix: Convert questions to proper JSON string
//     let questionsJson;
//     try {
//         questions = questions.map(q => ({
//     ...q,
//     correct: q.correct.toString().trim().toUpperCase()
// }));

//         questionsJson = JSON.stringify(questions);
//     } catch (e) {
//         return res.status(400).json({ message: 'Error parsing questions', error: e.message });
//     }

//     const sql = "INSERT INTO quizzes (title, standard, questions) VALUES (?, ?, ?)";
//     db.query(sql, [title, standard, questionsJson], (err) => {
//         if (err) {
//             console.error("DB Error:", err);
//             return res.status(500).json({ message: 'DB error', error: err });
//         }
//         res.json({ message: 'Quiz created successfully' });
//     });
// };


// // Get all quizzes
// exports.getAllQuizzes = (req, res) => {
//     const sql = "SELECT quiz_id, title, standard FROM quizzes ORDER BY quiz_id DESC";
//     db.query(sql, (err, rows) => {
//         if (err) {
//             console.error("DB Error:", err);
//             return res.status(500).json({ message: 'DB error', error: err });
//         }
//         res.json(rows);
//     });
// };



// exports.getQuizById = (req, res) => {
//     const quizId = req.params.id;

//     const sql = "SELECT * FROM quizzes WHERE quiz_id = ?";
//     db.query(sql, [quizId], (err, rows) => {
//         if (err) {
//             console.error("DB Error:", err);
//             return res.status(500).json({ message: 'DB error', error: err });
//         }

//         if (rows.length === 0) return res.status(404).json({ message: 'Quiz not found' });

//         const quiz = rows[0];

//         try {
//             // If it's already parsed by MySQL (for JSON column), leave it
//             quiz.questions = typeof quiz.questions === 'string'
//                 ? JSON.parse(quiz.questions)
//                 : quiz.questions;
//         } catch (e) {
//             console.error("JSON Parse Error:", e);
//             return res.status(500).json({ message: 'Invalid questions data', error: e.message });
//         }

//         res.json(quiz);
//     });
// };




// // exports.submitQuiz = (req, res) => {
// //     const quizId = req.params.id;
// //     const student_id = req.session.user_id;

// //     const { answers } = req.body;

// //     if (!Array.isArray(answers) || !student_id) {
// //         return res.status(400).json({ message: 'Invalid submission data' });
// //     }

// //     const sql = "SELECT questions FROM quizzes WHERE quiz_id = ?";
// //     db.query(sql, [quizId], (err, rows) => {
// //         if (err || rows.length === 0) {
// //             return res.status(404).json({ message: 'Quiz not found' });
// //         }

// //         let questions;
// //         try {
// //             questions = typeof rows[0].questions === 'string'
// //                 ? JSON.parse(rows[0].questions)
// //                 : rows[0].questions;
// //         } catch (e) {
// //             console.error("JSON Parse Error:", e);
// //             return res.status(500).json({ message: 'Invalid quiz data format' });
// //         }

// //         // Calculate score
// //         let score = 0;
// //         answers.forEach(({ questionId, answer }) => {
// //             const question = questions.find(q => q.id === questionId);
// //             if (question && answer && question.correct.toLowerCase() === answer.toLowerCase()) {
// //                 score++;
// //             }
// //         });

// //         const insertScore = "INSERT INTO quiz_scores (id, quiz_id, score) VALUES (?, ?, ?)";
// //         db.query(insertScore, [student_id, quizId, score], (err) => {
// //             if (err) {
// //                 console.error("DB Error:", err);
// //                 return res.status(500).json({ message: 'DB error', error: err });
// //             }
// //             res.json({ message: 'Quiz submitted successfully', score });
// //         });
// //     });
// // };
// // exports.submitQuiz = (req, res) => {
// //     const quizId = req.params.id;
// //     const student_id = req.session.user_id;

// //     const { answers } = req.body;

// //     if (!Array.isArray(answers) || !student_id) {
// //         return res.status(400).json({ message: 'Invalid submission data' });
// //     }

// //     const sql = "SELECT questions FROM quizzes WHERE quiz_id = ?";
// //     db.query(sql, [quizId], (err, rows) => {
// //         if (err || rows.length === 0) {
// //             console.error("DB Error:", err);
// //             return res.status(404).json({ message: 'Quiz not found' });
// //         }

// //         let questions;
// //         try {
// //             questions = typeof rows[0].questions === 'string'
// //                 ? JSON.parse(rows[0].questions)
// //                 : rows[0].questions;
// //         } catch (e) {
// //             console.error("JSON Parse Error:", e);
// //             return res.status(500).json({ message: 'Invalid quiz data format' });
// //         }

// //         let score = 0;

// //         questions.forEach((q, i) => {
// //             const correctAnswer = q.correct?.toString().trim().toLowerCase();
// //             const userAnswer = answers[i]?.toString().trim().toLowerCase();

// //             console.log(`Q${i + 1}: correct=${correctAnswer}, user=${userAnswer}`);

// //             if (correctAnswer && userAnswer && correctAnswer === userAnswer) {
// //                 score++;
// //             }
// //         });

// //         const insertScore = "INSERT INTO quiz_scores (id, quiz_id, score) VALUES (?, ?, ?)";
// //         db.query(insertScore, [student_id, quizId, score], (err) => {
// //             if (err) {
// //                 console.error("DB Error:", err);
// //                 return res.status(500).json({ message: 'DB error', error: err });
// //             }
// //             res.json({ message: 'Quiz submitted successfully', score });
// //         });
// //     });
// // };
// exports.submitQuiz = (req, res) => {
//     const quizId = req.params.id;
//     const student_id = req.session.user_id;

//     const { answers } = req.body;

//     if (!Array.isArray(answers) || !student_id) {
//         return res.status(400).json({ message: 'Invalid submission data' });
//     }

//     const sql = "SELECT questions FROM quizzes WHERE quiz_id = ?";
//     db.query(sql, [quizId], (err, rows) => {
//         if (err || rows.length === 0) {
//             console.error("DB Error:", err);
//             return res.status(404).json({ message: 'Quiz not found' });
//         }

//         let questions;
//         try {
//             questions = typeof rows[0].questions === 'string'
//                 ? JSON.parse(rows[0].questions)
//                 : rows[0].questions;
//         } catch (e) {
//             console.error("JSON Parse Error:", e);
//             return res.status(500).json({ message: 'Invalid quiz data format' });
//         }

//         // DEBUG LOGGING
//         console.log("🟢 Received answers:", answers);
//         console.log("🟢 Loaded questions:", questions);

//         let score = 0;

//         // questions.forEach((q, i) => {
//         //     const correct = q.correct?.toString().trim().toUpperCase();
//         //     const userAnswer = answers[i]?.toString().trim().toUpperCase();

//         //     console.log(`🔍 Q${i + 1}: correct="${correct}", user="${userAnswer}"`);

//         //     if (correct && userAnswer && correct === userAnswer) {
//         //         score++;
//         //     }
//         // });
// questions.forEach((q, i) => {
//     const correctLetter = q.correct?.toUpperCase();
//     const correctText = q.options?.['ABCD'.indexOf(correctLetter)]?.toLowerCase().trim();
//     const userAnswer = answers[i]?.toLowerCase().trim();

//     console.log(`Q${i + 1}: correct="${correctText}", user="${userAnswer}"`);

//     if (correctText && userAnswer && correctText === userAnswer) {
//         score++;
//     }
// });

//         const insertScore = "INSERT INTO quiz_scores (id, quiz_id, score) VALUES (?, ?, ?)";
//         db.query(insertScore, [student_id, quizId, score], (err) => {
//             if (err) {
//                 console.error("DB Error:", err);
//                 return res.status(500).json({ message: 'DB error', error: err });
//             }
//             res.json({ message: '✅ Quiz submitted successfully', score });
//         });
//     });
// };
const db = require('../db');

//  Create Quiz
exports.createQuiz = (req, res) => {
    const { title, standard, questions } = req.body;

    console.log("Incoming Quiz Data:", req.body);

    if (!title || !standard || !Array.isArray(questions)) {
        return res.status(400).json({ message: 'Invalid quiz data' });
    }

    try {
        // Clean and standardize correct answers
        const cleanedQuestions = questions.map(q => ({
            ...q,
            correct: q.correct.toString().trim().toUpperCase()
        }));

        const questionsJson = JSON.stringify(cleanedQuestions);

        const sql = "INSERT INTO quizzes (title, standard, questions) VALUES (?, ?, ?)";
        db.query(sql, [title, standard, questionsJson], (err) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ message: 'DB error', error: err });
            }
            res.json({ message: ' Quiz created successfully' });
        });

    } catch (e) {
        return res.status(400).json({ message: ' Error parsing questions', error: e.message });
    }
};

// Get All Quizzes
exports.getAllQuizzes = (req, res) => {
    const sql = "SELECT quiz_id, title, standard FROM quizzes ORDER BY quiz_id DESC";
    db.query(sql, (err, rows) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: 'DB error', error: err });
        }
        res.json(rows);
    });
};

//  Get Quiz by ID
exports.getQuizById = (req, res) => {
    const quizId = req.params.id;

    const sql = "SELECT * FROM quizzes WHERE quiz_id = ?";
    db.query(sql, [quizId], (err, rows) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ message: 'DB error', error: err });
        }

        if (rows.length === 0) return res.status(404).json({ message: 'Quiz not found' });

        const quiz = rows[0];

        try {
            quiz.questions = typeof quiz.questions === 'string'
                ? JSON.parse(quiz.questions)
                : quiz.questions;
        } catch (e) {
            console.error("JSON Parse Error:", e);
            return res.status(500).json({ message: 'Invalid questions data', error: e.message });
        }

        res.json(quiz);
    });
};

//  Submit Quiz
// exports.submitQuiz = (req, res) => {
//     const quizId = req.params.id;
//     const student_id = req.session.user_id;

//     const { answers } = req.body;

//     if (!Array.isArray(answers) || !student_id) {
//         return res.status(400).json({ message: 'Invalid submission data' });
//     }

//     const sql = "SELECT questions FROM quizzes WHERE quiz_id = ?";
//     db.query(sql, [quizId], (err, rows) => {
//         if (err || rows.length === 0) {
//             console.error("DB Error:", err);
//             return res.status(404).json({ message: 'Quiz not found' });
//         }

//         let questions;
//         try {
//             questions = typeof rows[0].questions === 'string'
//                 ? JSON.parse(rows[0].questions)
//                 : rows[0].questions;
//         } catch (e) {
//             console.error("JSON Parse Error:", e);
//             return res.status(500).json({ message: 'Invalid quiz data format' });
//         }

//         // Debug info
//         console.log("🟢 Received answers:", answers);
//         console.log("🟢 Loaded questions:", questions);

//         let score = 0;

//         questions.forEach((q, i) => {
//             const correctLetter = q.correct?.toUpperCase();
//             const correctText = q.options?.['ABCD'.indexOf(correctLetter)]?.toLowerCase().trim();
//             const userAnswer = answers[i]?.toLowerCase().trim();

//             console.log(`🔍 Q${i + 1}: correct="${correctText}", user="${userAnswer}"`);

//             if (correctText && userAnswer && correctText === userAnswer) {
//                 score++;
//             }
//         });

//         const insertScore = "INSERT INTO quiz_scores (id, quiz_id, score) VALUES (?, ?, ?)";
//         db.query(insertScore, [student_id, quizId, score], (err) => {
//             if (err) {
//                 console.error("DB Error:", err);
//                 return res.status(500).json({ message: 'DB error', error: err });
//             }
//             res.json({ message: '✅ Quiz submitted successfully', score });
//         });
//     });
// };
exports.submitQuiz = (req, res) => {
    const quizId = req.params.id;
    const student_id = req.session.user_id;

    const { answers } = req.body;

    if (!Array.isArray(answers) || !student_id) {
        return res.status(400).json({ message: 'Invalid submission data' });
    }

    //  Check if the user already submitted this quiz
    const checkSql = "SELECT * FROM quiz_scores WHERE id = ? AND quiz_id = ?";
    db.query(checkSql, [student_id, quizId], (checkErr, checkRows) => {
        if (checkErr) {
            console.error("DB Check Error:", checkErr);
            return res.status(500).json({ message: 'DB error', error: checkErr });
        }

        if (checkRows.length > 0) {
            return res.status(400).json({ message: ' You have already attempted this quiz' });
        }

        // Fetch quiz questions
        const sql = "SELECT questions FROM quizzes WHERE quiz_id = ?";
        db.query(sql, [quizId], (err, rows) => {
            if (err || rows.length === 0) {
                console.error("DB Error:", err);
                return res.status(404).json({ message: 'Quiz not found' });
            }

            let questions;
            try {
                questions = typeof rows[0].questions === 'string'
                    ? JSON.parse(rows[0].questions)
                    : rows[0].questions;
            } catch (e) {
                console.error("JSON Parse Error:", e);
                return res.status(500).json({ message: 'Invalid quiz data format', error: e.message });
            }

            console.log(" Received answers:", answers);
            console.log(" Loaded questions:", questions);

            let score = 0;

            questions.forEach((q, i) => {
                const correctLetter = q.correct?.toUpperCase();
                const correctText = q.options?.['ABCD'.indexOf(correctLetter)]?.toLowerCase().trim();
                const userAnswer = answers[i]?.toLowerCase().trim();

                console.log(`Q${i + 1}: correct="${correctText}", user="${userAnswer}"`);

                if (correctText && userAnswer && correctText === userAnswer) {
                    score++;
                }
            });

            const insertScore = "INSERT INTO quiz_scores (id, quiz_id, score) VALUES (?, ?, ?)";
            db.query(insertScore, [student_id, quizId, score], (err) => {
                if (err) {
                    console.error("DB Insert Error:", err);
                    return res.status(500).json({ message: 'DB error', error: err });
                }
                res.json({ message: ' Quiz submitted successfully', score });
            });
        });
    });
};
