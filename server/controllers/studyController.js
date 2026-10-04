const Study = require('../models/Study');

exports.createStudy = async (req, res) => {
    try {
        const { fileName, summary, importantTopics, notes, mcqs, quiz } = req.body;

        const study = await Study.create({
            userId: req.user.id,
            fileName,
            summary,
            importantTopics,
            notes,
            mcqs,
            quiz
        });

        res.status(201).json(study);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserStudies = async (req, res) => {
    try {
        const studies = await Study.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(studies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudyById = async (req, res) => {
    try {
        const study = await Study.findOne({ _id: req.params.id, userId: req.user.id });
        if (!study) return res.status(404).json({ error: 'Study not found' });
        res.json(study);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudy = async (req, res) => {
    try {
        const { summary, importantTopics, notes, mcqs, quiz } = req.body;
        const updateFields = {};

        if (summary !== undefined) updateFields.summary = summary;
        if (importantTopics !== undefined) updateFields.importantTopics = importantTopics;
        if (notes !== undefined) updateFields.notes = notes;
        if (mcqs !== undefined) updateFields.mcqs = mcqs;
        if (quiz !== undefined) updateFields.quiz = quiz;

        const study = await Study.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: updateFields },
            { new: true }
        );

        if (!study) return res.status(404).json({ error: 'Study not found' });
        res.json(study);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudy = async (req, res) => {
    try {
        const study = await Study.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!study) return res.status(404).json({ error: 'Study not found' });
        res.json({ message: 'Study deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
