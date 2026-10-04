const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    text: {
        type: String,
        default: '',
    },
    importantTopics: {
        type: mongoose.Schema.Types.Mixed,
        default: [],
    },
    notes: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    mcqs: {
        type: mongoose.Schema.Types.Mixed,
        default: [],
    },
    quiz: {
        type: mongoose.Schema.Types.Mixed,
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model('Study', studySchema);
