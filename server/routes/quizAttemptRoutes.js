const express = require('express');
const router = express.Router();
const { createQuizAttempt, getQuizHistory } = require('../controllers/quizAttemptController');

router.route('/')
    .post(createQuizAttempt)
    .get(getQuizHistory);

module.exports = router;
