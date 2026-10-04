const axios = require('axios');
require('dotenv').config();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class GroqService {
    constructor() {
        this.apiKey = process.env.GROQ_API_KEY;
        this.model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    }

    async generateResponse(prompt, systemPrompt = 'You are a helpful academic assistant. Return ONLY valid JSON.') {
        if (!this.apiKey) {
            const error = new Error('GROQ_API_KEY is missing. Add it to server/.env and restart the backend.');
            error.status = 503;
            throw error;
        }

        try {
            const response = await axios.post(GROQ_API_URL, {
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' },
                temperature: 0.3
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return this.safeJsonParse(response.data.choices[0].message.content);
        } catch (error) {
            if (error.status) throw error;
            const status = error.response?.status;
            const message = error.response?.data?.error?.message || error.message;
            console.error(`Groq API error${status ? ` [${status}]` : ''}:`, message);
            const serviceError = new Error(status === 429
                ? `Groq rate limit (429): ${message}`
                : `Groq API error${status ? ` (${status})` : ''}: ${message}`);
            serviceError.status = status || 502;
            throw serviceError;
        }
    }

    safeJsonParse(content) {
        try {
            const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
            return JSON.parse(cleaned);
        } catch {
            const parseError = new Error('Groq returned invalid JSON. Please try again.');
            parseError.status = 502;
            throw parseError;
        }
    }

    async analyzePdf(text) {
        return this.generateResponse(`Analyze the following PDF text and return JSON with this shape:
{"subject":"Main subject","overview":"High-level summary","mainConcepts":["Concept"],"keyDefinitions":[{"term":"...","definition":"..."}],"examRelevantPoints":["Point"]}

TEXT:
${text}`, 'You are an expert academic analyst. Return only valid JSON.');
    }

    async generateTopics(text) {
        return this.generateResponse(`Identify the most important study topics in this text. Return JSON with this shape:
{"topics":[{"name":"Topic","importance":"High/Medium/Low","explanation":"Explanation","whyImportant":"Exam relevance","relatedConcepts":["Concept"]}]}

TEXT:
${text}`, 'You are an expert educator. Return only valid JSON.');
    }

    async generateNotes(text) {
        return this.generateResponse(`Convert this text into structured study notes. Return JSON with this shape:
{"notes":[{"heading":"Section","subsections":[{"subheading":"Sub-topic","content":["Bullet"],"definitions":[{"term":"...","definition":"..."}],"examples":["Example"],"formulas":["Formula"]}]}]}

TEXT:
${text}`, 'You are a professional note-taker. Return only valid JSON.');
    }

    async generateMCQs(text, count = 10, difficulty = 'Medium') {
        return this.generateResponse(`Generate ${count} ${difficulty}-difficulty multiple choice questions from this text. Return JSON with this shape:
{"mcqs":[{"question":"Question","options":["A","B","C","D"],"correctAnswer":"Exact option text","explanation":"Why correct"}]}

TEXT:
${text}`, 'You are a professional examiner. Return only valid JSON.');
    }
}

module.exports = new GroqService();
