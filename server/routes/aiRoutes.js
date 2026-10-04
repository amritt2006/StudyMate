const express = require('express');
const router = express.Router();
const groqService = require('../services/groqService');

// Limit to ~6000 chars — enough context, fewer tokens, less rate limit risk
const MAX_TEXT_LENGTH = 6000;

router.post('/notes', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    try {
        const notes = await groqService.generateNotes(text.slice(0, MAX_TEXT_LENGTH));
        res.json(notes);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

router.post('/topics', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    try {
        const topics = await groqService.generateTopics(text.slice(0, MAX_TEXT_LENGTH));
        res.json(topics);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

router.post('/mcqs', async (req, res) => {
    const { text, count, difficulty } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });

    try {
        const mcqs = await groqService.generateMCQs(
            text.slice(0, MAX_TEXT_LENGTH),
            count || 10,
            difficulty || 'Medium'
        );
        res.json(mcqs);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});

module.exports = router;
