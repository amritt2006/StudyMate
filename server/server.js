require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');
const pdfRoutes = require('./routes/pdfRoutes');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes');
const studyRoutes = require('./routes/studyRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const quizAttemptRoutes = require('./routes/quizAttemptRoutes');
const { protect } = require('./middleware/authMiddleware');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    const jwtSecret = process.env.JWT_SECRET || '';
    if (jwtSecret.length < 32 || /your_jwt_secret_here|studymate_super_secret/i.test(jwtSecret)) {
        throw new Error('Set a unique JWT_SECRET with at least 32 characters before running in production.');
    }
}
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = [...new Set([
    'https://study-mate-beta-one.vercel.app',
    'http://localhost:5173',
    ...configuredOrigins,
])];
const allowAnyOrigin = process.env.NODE_ENV !== 'production' && allowedOrigins.length === 0;

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowAnyOrigin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, false);
    },
}));
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true, limit: '4mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/analytics', protect, analyticsRoutes);
app.use('/api/quiz-attempts', protect, quizAttemptRoutes);
app.use('/api/pdf', protect, pdfRoutes);
app.use('/api/ai', protect, aiRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
        return res.status(status).json({ error: `Upload error: ${err.message}` });
    }
    if (err.message === 'Only PDF files are allowed') {
        return res.status(400).json({ error: err.message });
    }
    const status = err.status === 413 || err.type === 'entity.too.large' ? 413 : 500;
    res.status(status).json({ error: status === 413 ? 'Request body is too large' : 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`StudyMate Server running on port ${PORT}`);
    console.log(`AI Provider: Groq`);
    console.log(`Using model: ${process.env.GROQ_MODEL || 'openai/gpt-oss-20b'}`);
    console.log(`Groq API Key: ${process.env.GROQ_API_KEY ? '✓ Set' : '✗ Missing - add GROQ_API_KEY to server/.env'}`);
});
