const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/createQuiz', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/submit/:id', quizController.submitQuiz);

module.exports = router;
