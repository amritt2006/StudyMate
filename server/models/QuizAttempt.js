const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    studyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Study',
        default: null,
    },
    studyName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 180,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
    },
    totalQuestions: {
        type: Number,
        required: true,
        min: 1,
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    attemptedAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
}, { timestamps: true });

quizAttemptSchema.index({ userId: 1, attemptedAt: -1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
