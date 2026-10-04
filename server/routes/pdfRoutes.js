const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../middleware/upload');
const pdfService = require('../services/pdfService');
const groqService = require('../services/groqService');
const Study = require('../models/Study');

const uploadRoot = path.resolve(__dirname, '..', 'uploads');
const resolveUserUpload = (userId, fileName) => {
    if (typeof fileName !== 'string' || !/^[a-f0-9-]{36}\.pdf$/i.test(fileName)) return null;
    const userDirectory = path.resolve(uploadRoot, String(userId));
    const filePath = path.resolve(userDirectory, fileName);
    return filePath.startsWith(`${userDirectory}${path.sep}`) ? filePath : null;
};

router.post('/upload', upload.single('pdf'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
        message: 'File uploaded successfully',
        fileName: req.file.filename,
        originalName: req.file.originalname
    });
});

router.post('/analyze', async (req, res) => {
    const { fileName, originalName } = req.body;
    if (!fileName) return res.status(400).json({ error: 'fileName is required' });
    const filePath = resolveUserUpload(req.user.id, fileName);
    if (!filePath) return res.status(400).json({ error: 'Invalid uploaded file' });

    try {
        const rawText = await pdfService.extractText(filePath);

        // Limit to ~6000 chars to reduce token usage and avoid rate limits
        const text = typeof rawText === 'string' ? rawText.slice(0, 6000) : rawText;

        const analysis = await groqService.analyzePdf(text);

        // Automatically save to MongoDB
        const study = await Study.create({
            userId: req.user.id,
            fileName: typeof originalName === 'string' ? path.basename(originalName).slice(0, 180) : fileName,
            summary: analysis.overview || analysis.summary || '',
            importantTopics: analysis.mainConcepts || analysis.topics || [],
            text: text,
        });

        res.json({
            analysis,
            text: text,
            studyId: study._id
        });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    } finally {
        await pdfService.deleteFile(filePath);
    }
});

module.exports = router;
