const express = require('express');
const router = express.Router();
const { createStudy, getUserStudies, getStudyById, updateStudy, deleteStudy } = require('../controllers/studyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createStudy)
    .get(protect, getUserStudies);

router.route('/:id')
    .get(protect, getStudyById)
    .put(protect, updateStudy)
    .delete(protect, deleteStudy);

module.exports = router;
