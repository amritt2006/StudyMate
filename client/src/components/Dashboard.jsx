import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pdfService, aiService, studyService, quizAttemptService } from '../services/api';
import { Loader2, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = ({ uploadedFile, savedStudy }) => {
    const { t } = useAppContext();
    const [studyId, setStudyId] = useState(savedStudy?._id || null);
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [content, setContent] = useState({ topics: null, notes: null, mcqs: null, text: '' });
    const [mcqConfig, setMcqConfig] = useState({
        count: 10,
        difficulty: 'Medium'
    });

    useEffect(() => {
        if (savedStudy) {
            setStudyId(savedStudy._id);
            setAnalysis({
                subject: savedStudy.fileName || 'Saved Study',
                overview: savedStudy.summary || '',
                mainConcepts: Array.isArray(savedStudy.importantTopics) ? savedStudy.importantTopics : []
            });
            const structuredTopics = Array.isArray(savedStudy.importantTopics) && savedStudy.importantTopics.length > 0 && typeof savedStudy.importantTopics[0] === 'object'
                ? savedStudy.importantTopics
                : null;
            setContent({
                topics: structuredTopics,
                notes: savedStudy.notes || null,
                mcqs: savedStudy.mcqs || null,
                text: savedStudy.text || savedStudy.summary || ''
            });
            setActiveTab('overview');
        }
    }, [savedStudy]);

    const displayFileName = savedStudy
        ? savedStudy.fileName
        : (uploadedFile?.originalName || uploadedFile?.fileName || 'Document');

    const getKeyFocus = () => {
        if (!analysis?.mainConcepts || analysis.mainConcepts.length === 0) return 'N/A';
        const first = analysis.mainConcepts[0];
        if (typeof first === 'string') return first;
        if (typeof first === 'object' && first !== null) return first.name || first.topic || 'N/A';
        return 'N/A';
    };

    const handleAnalyze = async () => {
        if (!uploadedFile) return;
        setLoading(true);
        setError(null);
        try {
            const result = await pdfService.analyzePdf(uploadedFile.fileName, uploadedFile.originalName);
            setAnalysis(result.analysis);
            setContent(prev => ({ ...prev, text: result.text }));
            if (result.studyId) {
                setStudyId(result.studyId);
            }
            setActiveTab('overview');
        } catch (err) {
            setError(err.response?.data?.error || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const loadTabData = async (tab) => {
        setActiveTab(tab);
        if (tab === 'overview') return;

        if (tab === 'topics' && content.topics) return;
        if (tab === 'notes' && content.notes) return;
        if (tab === 'mcqs' && content.mcqs) return;

        const sourceText = content.text || analysis?.overview || '';
        if (!sourceText) return;

        setLoading(true);
        try {
            if (tab === 'topics') {
                const data = await aiService.generateTopics(sourceText);
                setContent(prev => ({ ...prev, topics: data.topics }));
                if (studyId) {
                    studyService.updateStudy(studyId, { importantTopics: data.topics }).catch(console.error);
                }
            } else if (tab === 'notes') {
                const data = await aiService.generateNotes(sourceText);
                setContent(prev => ({ ...prev, notes: data.notes }));
                if (studyId) {
                    studyService.updateStudy(studyId, { notes: data.notes }).catch(console.error);
                }
            } else if (tab === 'mcqs') {
                const data = await aiService.generateMCQs(sourceText, mcqConfig.count, mcqConfig.difficulty);
                setContent(prev => ({ ...prev, mcqs: data.mcqs }));
                if (studyId) {
                    studyService.updateStudy(studyId, { mcqs: data.mcqs }).catch(console.error);
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const formatNotesForCopy = (notes) => {
        if (!notes || !Array.isArray(notes)) return '';

        return notes.map(section => {
            let sectionText = `\n${section.heading.toUpperCase()}\n${'='.repeat(section.heading.length)}\n`;

            section.subsections.forEach(sub => {
                sectionText += `\n${sub.subheading}\n${'-'.repeat(sub.subheading.length)}\n`;

                if (sub.content && sub.content.length > 0) {
                    sectionText += sub.content.map(item => `• ${item}`).join('\n') + '\n';
                }

                if (sub.definitions && sub.definitions.length > 0) {
                    sectionText += `\nDEFINITIONS\n`;
                    sectionText += sub.definitions.map(d => `${d.term}: ${d.definition}`).join('\n') + '\n';
                }

                if (sub.examples && sub.examples.length > 0) {
                    sectionText += `\nEXAMPLES\n`;
                    sectionText += sub.examples.map(ex => `• ${ex}`).join('\n') + '\n';
                }

                if (sub.formulas && sub.formulas.length > 0) {
                    sectionText += `\nFORMULAS\n`;
                    sectionText += sub.formulas.map(f => `• ${f}`).join('\n') + '\n';
                }
            });
            return sectionText;
        }).join('\n\n');
    };

    if (!analysis && savedStudy && activeTab === 'overview') {
        return (
            <div style={styles.centered}>
                <div style={styles.card}>
                    <Loader2 size={32} className="spin" />
                    <p style={{ color: 'var(--text-secondary)' }}>Loading saved study…</p>
                </div>
            </div>
        );
    }

    if (!analysis && !savedStudy && activeTab === 'overview') {
        return (
            <div style={styles.centered}>
                <div style={styles.card}>
                    <h2>{t('dashboard.uploadSuccess')}</h2>
                    <p>{t('dashboard.fileReady')} <strong style={{ color: 'var(--brand-primary)' }}>{displayFileName}</strong></p>
                    <button onClick={handleAnalyze} disabled={loading} style={styles.analyzeBtn}>
                        {loading ? <><Loader2 size={20} className="spin" /> {t('common.analyzing')}</> : t('dashboard.analyzeBtn')}
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>{t('dashboard.title')}</h1>
                <div style={styles.fileBadge}>
                    <span style={{ marginRight: '8px' }}>📄 {displayFileName}</span>
                </div>
            </div>

            <div style={styles.tabs}>
                {['overview', 'topics', 'notes', 'mcqs', 'quiz'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => loadTabData(tab)}
                        style={activeTab === tab ? {...styles.tabActive} : styles.tab}
                    >
                        {t(`dashboard.tabs.${tab}`)}
                    </button>
                ))}
            </div>

            {loading && <div style={styles.loading}><Loader2 size={40} className="spin" /> <p>{t('common.aiThinking')}</p></div>}

            {!loading && (
                <div style={styles.contentArea}>
                    {activeTab === 'overview' && (
                        <div style={styles.grid}>
                            <div style={styles.statCard}>
                                <h3>{t('dashboard.subject')}</h3>
                                <p style={styles.statValue}>{analysis.subject}</p>
                            </div>
                            <div style={styles.statCard}>
                                <h3>{t('dashboard.keyFocus')}</h3>
                                <p style={styles.statValue}>{getKeyFocus()}</p>
                            </div>
                            <div style={styles.statCard}>
                                <h3>{t('dashboard.overview')}</h3>
                                <p style={styles.statText}>{analysis.overview}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'topics' && content.topics && (
                        <div style={styles.grid}>
                            {content.topics.map((topic, i) => (
                                <div key={i} style={styles.topicCard}>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: 'var(--bg-tertiary)',
                                        color: topic.importance === 'High' ? 'var(--brand-primary)' : 'var(--text-primary)',
                                        border: `1px solid ${topic.importance === 'High' ? 'var(--brand-primary)' : 'var(--border-color)'}`
                                    }}>
                                        {topic.importance} {t('dashboard.priority')}
                                    </span>
                                    <h3 style={{ color: 'var(--text-primary)' }}>{topic.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{t('dashboard.why')}:</strong> {topic.whyImportant}</p>
                                    <p style={{ color: 'var(--text-secondary)' }}>{topic.explanation}</p>
                                    <div style={styles.related}>
                                        {topic.relatedConcepts.map((rc, j) => <span key={j} style={styles.relatedTag}>{rc}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'notes' && content.notes && (
                        <div style={styles.notesContainer}>
                            <div style={styles.notesHeader}>
                                <h2 style={{ color: 'var(--text-primary)' }}>{t('dashboard.smartNotes')}</h2>
                                <button onClick={() => copyToClipboard(formatNotesForCopy(content.notes))} style={styles.copyBtn}>
                                    <Copy size={16} /> {t('common.copyNotes')}
                                </button>
                            </div>
                            {content.notes.map((section, i) => (
                                <div key={i} style={styles.section}>
                                    <h3 style={styles.heading}>{section.heading}</h3>
                                    {section.subsections.map((sub, j) => (
                                        <div key={j} style={styles.subsection}>
                                            <h4 style={{ color: 'var(--text-primary)' }}>{sub.subheading}</h4>
                                            <ul style={styles.list}>
                                                {sub.content.map((item, k) => <li key={k} style={{ color: 'var(--text-secondary)' }}>{item}</li>)}
                                            </ul>
                                            {sub.definitions && sub.definitions.length > 0 && (
                                                <div style={styles.defBox}>
                                                    {sub.definitions.map((d, m) => <p key={m} style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{d.term}:</strong> {d.definition}</p>)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'mcqs' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={styles.configPanel}>
                                <div style={styles.configItem}>
                                    <label style={styles.configLabel}>{t('dashboard.difficulty')}:</label>
                                    <select
                                        value={mcqConfig.difficulty}
                                        onChange={(e) => setMcqConfig({ ...mcqConfig, difficulty: e.target.value })}
                                        style={styles.configInput}
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div style={styles.configItem}>
                                    <label style={styles.configLabel}>{t('dashboard.count')}:</label>
                                    <select
                                        value={mcqConfig.count}
                                        onChange={(e) => setMcqConfig({ ...mcqConfig, count: parseInt(e.target.value) })}
                                        style={styles.configInput}
                                    >
                                        {[...Array(16).keys()].map(i => (
                                            <option key={i} value={i + 5}>{i + 5}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={() => loadTabData('mcqs')} disabled={loading} style={styles.generateBtn}>
                                    {loading ? <><Loader2 size={16} className="spin" /> {t('common.generating')}</> : t('dashboard.generateMCQs')}
                                </button>
                            </div>
                            {content.mcqs && (
                                <div style={styles.grid}>
                                    {content.mcqs.map((mcq, i) => (
                                        <div key={i} style={styles.mcqCard}>
                                            <p style={{ color: 'var(--text-primary)' }}><strong style={{ color: 'var(--brand-primary)' }}>Q{i+1}:</strong> {mcq.question}</p>
                                            <div style={styles.options}>
                                                {mcq.options.map((opt, j) => <div key={j} style={styles.option}>{opt}</div>)}
                                            </div>
                                            <div style={styles.answerBox}>
                                                <strong style={{ color: 'var(--text-primary)' }}>Correct:</strong> {mcq.correctAnswer}
                                                <p style={styles.explanation}>{mcq.explanation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'quiz' && (
                        <Quiz
                            key={`${studyId || displayFileName}-${content.mcqs?.length || 0}`}
                            mcqs={content.mcqs}
                            studyId={studyId}
                            studyName={displayFileName}
                            onComplete={(result) => quizAttemptService.create(result)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const Quiz = ({ mcqs, studyId, studyName, onComplete }) => {
    const { t } = useAppContext();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saved, setSaved] = useState(false);

    if (!mcqs || mcqs.length === 0) return <div style={styles.centered}>{t('dashboard.generateMcqsFirst')}</div>;

    const handleOptionSelect = (opt) => {
        setAnswers({ ...answers, [currentIdx]: opt });
    };

    const handleSubmit = async () => {
        let correct = 0;
        mcqs.forEach((mcq, i) => {
            if (answers[i] === mcq.correctAnswer) correct++;
        });
        const percentage = Math.round((correct / mcqs.length) * 10000) / 100;
        setScore(percentage);
        setSubmitted(true);
        setSaving(true);
        setSaveError('');
        try {
            await onComplete({ studyId, studyName, score: correct, totalQuestions: mcqs.length });
            setSaved(true);
        } catch (error) {
            setSaveError(error.response?.data?.error || 'Quiz completed, but saving the attempt failed. Please retry.');
        } finally {
            setSaving(false);
        }
    };

    const retryQuiz = () => {
        setCurrentIdx(0);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setSaveError('');
        setSaved(false);
    };

    const retrySave = async () => {
        let correct = 0;
        mcqs.forEach((mcq, i) => { if (answers[i] === mcq.correctAnswer) correct++; });
        setSaving(true);
        setSaveError('');
        try {
            await onComplete({ studyId, studyName, score: correct, totalQuestions: mcqs.length });
            setSaved(true);
        } catch (error) {
            setSaveError(error.response?.data?.error || 'Could not save this quiz attempt. Please retry.');
        } finally {
            setSaving(false);
        }
    };

    if (submitted) {
        return (
            <div style={styles.quizResult}>
                <h2 style={{ color: 'var(--text-primary)' }}>{t('dashboard.quizCompleted')}</h2>
                <div style={styles.scoreCircle}>
                    <span style={styles.scoreValue}>{Math.round(score)}%</span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Correct: {mcqs.reduce((count, mcq, i) => count + (answers[i] === mcq.correctAnswer ? 1 : 0), 0)} / {mcqs.length}</p>
                <p role="status" style={{ color: saveError ? '#dc2626' : 'var(--text-secondary)' }}>
                    {saving ? 'Saving quiz attempt…' : saved ? 'Quiz attempt saved to your history.' : saveError}
                </p>
                {saveError && <button disabled={saving} onClick={retrySave} style={styles.navBtn}>Retry saving</button>}
                <div style={styles.review}>
                    {mcqs.map((mcq, i) => (
                        <div key={i} style={styles.reviewItem}>
                            <p style={{ color: 'var(--text-primary)' }}><strong style={{ color: 'var(--brand-primary)' }}>Q{i+1}:</strong> {mcq.question}</p>
                            <p style={{ color: answers[i] === mcq.correctAnswer ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
                                Your answer: {answers[i] || 'Skipped'}
                            </p>
                            <p style={{ color: '#16a34a', fontWeight: '600' }}>Correct: {mcq.correctAnswer}</p>
                            <p style={styles.explanation}>{mcq.explanation}</p>
                        </div>
                    ))}
                </div>
                <button onClick={retryQuiz} style={styles.retryBtn}>{t('dashboard.retryQuiz')}</button>
            </div>
        );
    }

    return (
        <div style={styles.quizCard}>
            <div style={styles.quizProgress}>Question {currentIdx + 1} of {mcqs.length}</div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>{mcqs[currentIdx].question}</h3>
            <div style={styles.options}>
                {mcqs[currentIdx].options.map((opt, j) => (
                    <div
                        key={j}
                        onClick={() => handleOptionSelect(opt)}
                        style={{
                            ...styles.option,
                            borderColor: answers[currentIdx] === opt ? 'var(--brand-primary)' : 'var(--border-color)',
                            backgroundColor: answers[currentIdx] === opt ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        {opt}
                    </div>
                ))}
            </div>
            <div style={styles.quizNav}>
                <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={styles.navBtn}>Back</button>
                {currentIdx < mcqs.length - 1 ? (
                    <button onClick={() => setCurrentIdx(currentIdx + 1)} style={styles.navBtn}>Next</button>
                ) : (
                    <button onClick={handleSubmit} style={styles.submitBtn}>{t('dashboard.submitQuiz')}</button>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '0 20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    fileBadge: { backgroundColor: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', overflowX: 'auto' },
    tab: { padding: '10px 20px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '500', color: 'var(--text-muted)', transition: 'all 0.2s' },
    tabActive: { padding: '10px 20px', border: 'none', backgroundColor: 'var(--brand-primary)', color: 'white', cursor: 'pointer', fontWeight: '500', borderRadius: '8px', transition: 'all 0.2s' },
    contentArea: { minHeight: '400px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    statCard: { backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' },
    statValue: { fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-primary)', margin: '10px 0' },
    statText: { color: 'var(--text-secondary)', lineHeight: '1.6' },
    topicCard: { backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' },
    badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' },
    related: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' },
    relatedTag: { fontSize: '0.7rem', backgroundColor: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-muted)', border: '1px solid var(--border-color)' },
    notesContainer: { backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' },
    notesHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    section: { marginBottom: '30px' },
    heading: { color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' },
    subsection: { marginLeft: '20px', marginBottom: '20px' },
    defBox: { backgroundColor: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--brand-primary)', marginTop: '10px', border: '1px solid var(--border-color)' },
    mcqCard: { backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' },
    options: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
    option: { padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)' },
    answerBox: { marginTop: '15px', padding: '10px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' },
    explanation: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' },
    centered: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
    card: { backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', textAlign: 'center', maxWidth: '500px', border: '1px solid var(--border-color)' },
    analyzeBtn: { padding: '12px 24px', backgroundColor: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '20px' },
    loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', minHeight: '300px', color: 'var(--text-muted)' },
    copyBtn: { padding: '8px 16px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-primary)' },
    quizCard: { backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', maxWidth: '700px', margin: '0 auto', border: '1px solid var(--border-color)' },
    quizProgress: { color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' },
    quizNav: { display: 'flex', justifyContent: 'space-between', marginTop: '30px' },
    navBtn: { padding: '10px 20px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-primary)' },
    submitBtn: { padding: '10px 20px', backgroundColor: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    quizResult: { maxWidth: '700px', margin: '0 auto', textAlign: 'center' },
    scoreCircle: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '20px auto' },
    review: { textAlign: 'left', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' },
    reviewItem: { backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' },
    retryBtn: { padding: '12px 24px', backgroundColor: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '30px' },
    configPanel: {
        backgroundColor: 'var(--bg-tertiary)',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'flex-end',
        marginBottom: '20px'
    },
    configItem: { display: 'flex', flexDirection: 'column', gap: '8px' },
    configLabel: { fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' },
    configInput: {
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        fontSize: '0.9rem',
        minWidth: '120px',
        color: 'var(--text-primary)'
    },
    generateBtn: {
        padding: '10px 20px',
        backgroundColor: 'var(--brand-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.2s'
    }
};

export default Dashboard;
