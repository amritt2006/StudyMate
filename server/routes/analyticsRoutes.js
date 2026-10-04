const express = require('express');
const router = express.Router();
const { getStudyAnalytics } = require('../controllers/analyticsController');

router.get('/', getStudyAnalytics);

module.exports = router;
