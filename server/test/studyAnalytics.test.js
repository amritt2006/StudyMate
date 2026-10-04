const test = require('node:test');
const assert = require('node:assert/strict');
const Study = require('../models/Study');
const QuizAttempt = require('../models/QuizAttempt');
const { createQuizAttempt, getQuizHistory } = require('../controllers/quizAttemptController');
const { getStudyAnalytics } = require('../controllers/analyticsController');

const makeResponse = () => ({
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
});

const queryReturning = (value, calls) => ({
    select(fields) { calls?.push(['select', fields]); return this; },
    sort(order) { calls?.push(['sort', order]); return this; },
    lean() { return Promise.resolve(value); },
});

test('analytics counts only the authenticated user records and builds a chronological recent trend', async () => {
    const originalStudyFind = Study.find;
    const originalAttemptFind = QuizAttempt.find;
    const calls = [];
    Study.find = (filter) => { calls.push(['studies', filter]); return queryReturning([
        { importantTopics: [{ name: 'A' }, { name: 'B' }], mcqs: [{}, {}] },
        { importantTopics: ['C'], mcqs: [] },
    ]); };
    QuizAttempt.find = (filter) => {
        calls.push(['attempts', filter]);
        return queryReturning([
            { studyName: 'New', percentage: 80, attemptedAt: new Date('2026-03-02') },
            { studyName: 'Old', percentage: 40, attemptedAt: new Date('2026-03-01') },
        ]);
    };
    try {
        const res = makeResponse();
        await getStudyAnalytics({ user: { id: 'user-1' } }, res);
        assert.deepEqual(res.body, {
            totalStudies: 2, totalTopics: 3, totalMcqs: 2, quizzesAttempted: 2,
            averageScore: 60, highestScore: 80,
            scoreTrend: [
                { studyName: 'Old', percentage: 40, attemptedAt: new Date('2026-03-01') },
                { studyName: 'New', percentage: 80, attemptedAt: new Date('2026-03-02') },
            ],
        });
        assert.deepEqual(calls.filter(([name]) => ['studies', 'attempts'].includes(name)), [
            ['studies', { userId: 'user-1' }], ['attempts', { userId: 'user-1' }],
        ]);
    } finally {
        Study.find = originalStudyFind;
        QuizAttempt.find = originalAttemptFind;
    }
});

test('history is scoped to the authenticated user and sorted newest first', async () => {
    const originalFind = QuizAttempt.find;
    let filter;
    let sort;
    QuizAttempt.find = (query) => {
        filter = query;
        return {
            select() { return this; },
            sort(order) { sort = order; return this; },
            lean() { return Promise.resolve([{ studyName: 'My notes' }]); },
        };
    };
    try {
        const res = makeResponse();
        await getQuizHistory({ user: { id: 'user-2' } }, res);
        assert.deepEqual(filter, { userId: 'user-2' });
        assert.deepEqual(sort, { attemptedAt: -1, _id: -1 });
        assert.equal(res.body[0].studyName, 'My notes');
    } finally {
        QuizAttempt.find = originalFind;
    }
});

test('saving derives percentage server-side and associates the authenticated owner', async () => {
    const originalFindOne = Study.findOne;
    const originalCreate = QuizAttempt.create;
    let ownershipFilter;
    let created;
    Study.findOne = (filter) => {
        ownershipFilter = filter;
        return { select: () => Promise.resolve({ _id: 'study-1', fileName: 'Biology.pdf' }) };
    };
    QuizAttempt.create = async (record) => { created = record; return { _id: 'attempt-1', ...record }; };
    try {
        const res = makeResponse();
        await createQuizAttempt({
            user: { id: 'user-3' },
            body: { studyId: '507f1f77bcf86cd799439011', studyName: 'untrusted name', score: 2, totalQuestions: 3, percentage: 100 },
        }, res);
        assert.deepEqual(ownershipFilter, { _id: '507f1f77bcf86cd799439011', userId: 'user-3' });
        assert.equal(created.userId, 'user-3');
        assert.equal(created.studyName, 'Biology.pdf');
        assert.equal(created.percentage, 66.67);
        assert.equal(res.statusCode, 201);
    } finally {
        Study.findOne = originalFindOne;
        QuizAttempt.create = originalCreate;
    }
});

test('saving rejects attempts for studies owned by another user', async () => {
    const originalFindOne = Study.findOne;
    const originalCreate = QuizAttempt.create;
    Study.findOne = () => ({ select: () => Promise.resolve(null) });
    QuizAttempt.create = async () => { throw new Error('Must not save'); };
    try {
        const res = makeResponse();
        await createQuizAttempt({
            user: { id: 'user-4' },
            body: { studyId: '507f1f77bcf86cd799439011', score: 1, totalQuestions: 1 },
        }, res);
        assert.equal(res.statusCode, 404);
        assert.equal(res.body.error, 'Study not found');
    } finally {
        Study.findOne = originalFindOne;
        QuizAttempt.create = originalCreate;
    }
});
