const Study = require('../models/Study');
const QuizAttempt = require('../models/QuizAttempt');

exports.getStudyAnalytics = async (req, res) => {
    try {
        const [studies, attempts] = await Promise.all([
            Study.find({ userId: req.user.id }).select('importantTopics mcqs').lean(),
            QuizAttempt.find({ userId: req.user.id })
                .select('studyName score totalQuestions percentage attemptedAt')
                .sort({ attemptedAt: -1, _id: -1 })
                .lean(),
        ]);

        const totalTopics = studies.reduce((count, study) => (
            count + (Array.isArray(study.importantTopics) ? study.importantTopics.length : 0)
        ), 0);
        const totalMcqs = studies.reduce((count, study) => (
            count + (Array.isArray(study.mcqs) ? study.mcqs.length : 0)
        ), 0);
        const scoreTotal = attempts.reduce((sum, attempt) => sum + attempt.percentage, 0);

        res.json({
            totalStudies: studies.length,
            totalTopics,
            totalMcqs,
            quizzesAttempted: attempts.length,
            averageScore: attempts.length ? Math.round((scoreTotal / attempts.length) * 10) / 10 : 0,
            highestScore: attempts.reduce((highest, attempt) => Math.max(highest, attempt.percentage), 0),
            scoreTrend: attempts.slice(0, 10).reverse().map((attempt) => ({
                studyName: attempt.studyName,
                percentage: attempt.percentage,
                attemptedAt: attempt.attemptedAt,
            })),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
