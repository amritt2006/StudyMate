const mongoose = require('mongoose');
const QuizAttempt = require('../models/QuizAttempt');
const Study = require('../models/Study');

exports.createQuizAttempt = async (req, res) => {
    try {
        const { studyId, studyName, score, totalQuestions } = req.body;
        const parsedScore = Number(score);
        const parsedTotal = Number(totalQuestions);

        if (!Number.isInteger(parsedScore) || !Number.isInteger(parsedTotal)
            || parsedTotal < 1 || parsedScore < 0 || parsedScore > parsedTotal) {
            return res.status(400).json({ error: 'Provide a valid score and question count' });
        }

        let study = null;
        if (studyId) {
            if (!mongoose.Types.ObjectId.isValid(studyId)) {
                return res.status(400).json({ error: 'Invalid study id' });
            }
            study = await Study.findOne({ _id: studyId, userId: req.user.id }).select('fileName');
            if (!study) return res.status(404).json({ error: 'Study not found' });
        }

        const resolvedStudyName = study?.fileName || (typeof studyName === 'string' ? studyName.trim() : '');
        if (!resolvedStudyName || resolvedStudyName.length > 180) {
            return res.status(400).json({ error: 'A study name of at most 180 characters is required' });
        }

        const attempt = await QuizAttempt.create({
            userId: req.user.id,
            studyId: study?._id || null,
            studyName: resolvedStudyName,
            score: parsedScore,
            totalQuestions: parsedTotal,
            percentage: Math.round((parsedScore / parsedTotal) * 10000) / 100,
        });

        res.status(201).json(attempt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuizHistory = async (req, res) => {
    try {
        const attempts = await QuizAttempt.find({ userId: req.user.id })
            .select('studyId studyName score totalQuestions percentage attemptedAt')
            .sort({ attemptedAt: -1, _id: -1 })
            .lean();
        res.json(attempts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
