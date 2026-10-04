const axios = require('axios');
require('dotenv').config();

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b';

class OllamaService {
    async generateResponse(prompt, systemPrompt = 'You are a helpful academic assistant.') {
        try {
            const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
                model: OLLAMA_MODEL,
                prompt: prompt,
                system: systemPrompt,
                stream: false,
                format: 'json'
            });

            const content = response.data.response;
            return this.safeJsonParse(content);
        } catch (error) {
            console.error('Ollama API Error:', error.message);
            throw new Error(`AI Service Error: ${error.message}`);
        }
    }

    safeJsonParse(content) {
        try {
            // Attempt to find JSON block if the model wraps it in markdown
            const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
            const jsonString = jsonMatch ? jsonMatch[0] : content;
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('JSON Parsing Error. Raw content:', content);
            throw new Error('AI returned invalid JSON format. Please try again.');
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

module.exports = new OllamaService();
