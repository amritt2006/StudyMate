const axios = require('axios');
require('dotenv').config();

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

class GeminiService {
    constructor() {
        // Read at runtime so .env updates are always picked up on restart
        this.apiKey = process.env.GEMINI_API_KEY;
        this.model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

        if (!this.apiKey) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }
        console.log(`GeminiService initialized — model: ${this.model}, API key configured.`);
    }

    async generateResponse(prompt, systemPrompt = 'You are a helpful academic assistant. Return ONLY valid JSON.') {
        const maxRetries = 3;
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await axios.post(
                    `${GEMINI_BASE_URL}/${this.model}:generateContent`,
                    {
                        contents: [{
                            parts: [{ text: `${systemPrompt}\n\n${prompt}` }]
                        }],
                        generationConfig: {
                            responseMimeType: 'application/json',
                        }
                    },
                    {
                        headers: {
                            'x-goog-api-key': this.apiKey,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const content = response.data.candidates[0].content.parts[0].text;
                return this.safeJsonParse(content);

            } catch (error) {
                const status = error.response?.status;
                const message = error.response?.data?.error?.message || error.message;
                lastError = error;

                if (status === 429) {
                    const errorDetails = error.response?.data?.error?.details || [];
                    const quotaDetails = errorDetails
                        .flatMap((detail) => detail.violations || [])
                        .map((violation) => `${violation.quotaId || ''} ${violation.quotaDimensions?.model || ''}`)
                        .join(' ');
                    const quotaLooksExhausted = /per_day|daily|free.?tier|quota.?exceeded/i.test(`${message} ${quotaDetails}`);

                    // Daily quota exhaustion cannot be fixed by retrying. Preserve Google's
                    // response so the UI can distinguish it from a temporary rate limit.
                    if (quotaLooksExhausted || attempt === maxRetries) {
                        const quotaError = new Error(`Gemini quota/rate limit (429): ${message}`);
                        quotaError.status = 429;
                        throw quotaError;
                    }

                    const retryAfter = error.response?.headers?.['retry-after'];
                    const retryDelay = errorDetails.find((detail) => detail.retryDelay)?.retryDelay;
                    const retryDelaySeconds = retryDelay ? Number.parseFloat(retryDelay) : NaN;
                    const waitMs = retryAfter
                        ? Number.parseInt(retryAfter, 10) * 1000
                        : (Number.isFinite(retryDelaySeconds) ? retryDelaySeconds * 1000 : attempt * 8000);
                    console.log(`Gemini rate limit (attempt ${attempt}/${maxRetries}). Waiting ${waitMs / 1000}s.`);
                    await new Promise(resolve => setTimeout(resolve, waitMs));
                    continue;
                }

                console.error(`Gemini API Error [${status}]:`, message);
                if (status === 400) throw new Error(`Bad request: ${message}`);
                if (status === 403) throw new Error('API key unauthorized. Check your GEMINI_API_KEY.');
                if (status === 404) throw new Error(`Model not found: ${this.model}`);
                throw new Error(`AI Service Error: ${message}`);
            }
        }

        console.error('Gemini retries exhausted:', lastError?.response?.data?.error?.message || lastError?.message);
        const retryError = new Error(`Gemini rate limit (429): ${lastError?.response?.data?.error?.message || 'Too many requests. Please retry later.'}`);
        retryError.status = 429;
        throw retryError;
    }

    safeJsonParse(content) {
        try {
            let cleaned = content.trim();
            cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
            return JSON.parse(cleaned.trim());
        } catch (e) {
            try {
                const objMatch = content.match(/\{[\s\S]*\}/);
                const arrMatch = content.match(/\[[\s\S]*\]/);
                const jsonString = objMatch ? objMatch[0] : (arrMatch ? arrMatch[0] : null);
                if (!jsonString) throw new Error('No JSON found');
                return JSON.parse(jsonString);
            } catch (e2) {
                console.error('JSON Parsing Error. Raw content:', content);
                throw new Error('AI returned invalid JSON format. Please try again.');
            }
        }
    }

    async analyzePdf(text) {
        const prompt = `Analyze the following text extracted from a PDF and provide a structured JSON response.

TEXT:
${text}

REQUIRED JSON FORMAT:
{
    "subject": "Main subject of the document",
    "overview": "A high-level summary of the content",
    "mainConcepts": ["Concept 1", "Concept 2"],
    "keyDefinitions": [{"term": "...", "definition": "..."}],
    "examRelevantPoints": ["Point 1", "Point 2"]
}`;
        return this.generateResponse(prompt, 'You are an expert academic analyst. Return ONLY valid JSON.');
    }

    async generateTopics(text) {
        const prompt = `Based on the provided text, identify the most important topics for study.

TEXT:
${text}

REQUIRED JSON FORMAT:
{
    "topics": [
        {
            "name": "Topic Name",
            "importance": "High/Medium/Low",
            "explanation": "Detailed explanation",
            "whyImportant": "Reason why this is crucial for exams",
            "relatedConcepts": ["Concept A", "Concept B"]
        }
    ]
}`;
        return this.generateResponse(prompt, 'You are an expert educator. Return ONLY valid JSON.');
    }

    async generateNotes(text) {
        const prompt = `Convert the following text into comprehensive, structured study notes.

TEXT:
${text}

REQUIRED JSON FORMAT:
{
    "notes": [
        {
            "heading": "Section Heading",
            "subsections": [
                {
                    "subheading": "Sub-topic",
                    "content": ["Bullet point 1", "Bullet point 2"],
                    "definitions": [{"term": "...", "definition": "..."}],
                    "examples": ["Example 1"],
                    "formulas": ["Formula 1"]
                }
            ]
        }
    ]
}`;
        return this.generateResponse(prompt, 'You are a professional note-taker. Return ONLY valid JSON.');
    }

    async generateMCQs(text, count = 10, difficulty = 'Medium') {
        const prompt = `Generate ${count} Multiple Choice Questions (MCQs) of ${difficulty} difficulty based on the provided text.

TEXT:
${text}

REQUIRED JSON FORMAT:
{
    "mcqs": [
        {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "The exact correct option text",
            "explanation": "Why this answer is correct"
        }
    ]
}`;
        return this.generateResponse(prompt, 'You are a professional examiner. Return ONLY valid JSON.');
    }
}

module.exports = new GeminiService();
