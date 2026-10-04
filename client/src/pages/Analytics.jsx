import React, { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Brain, CircleHelp, Trophy } from 'lucide-react';
import { analyticsService, quizAttemptService } from '../services/api';

const emptyAnalytics = {
    totalStudies: 0, totalTopics: 0, totalMcqs: 0, quizzesAttempted: 0,
    averageScore: 0, highestScore: 0, scoreTrend: []
};

const Stat = ({ icon: Icon, label, value }) => (
    <article style={styles.stat}>
        <div style={styles.statIcon}><Icon size={21} /></div>
        <div><div style={styles.label}>{label}</div><strong style={styles.value}>{value}</strong></div>
    </article>
);

const ScoreTrend = ({ points }) => {
    const width = 720;
    const height = 220;
    const pad = { top: 18, right: 24, bottom: 34, left: 38 };
    const innerWidth = width - pad.left - pad.right;
    const innerHeight = height - pad.top - pad.bottom;
    const coords = points.map((point, index) => ({
        ...point,
        x: pad.left + (points.length === 1 ? innerWidth / 2 : (index / (points.length - 1)) * innerWidth),
        y: pad.top + (1 - Math.max(0, Math.min(100, point.percentage)) / 100) * innerHeight
    }));

    if (!points.length) return <p style={styles.muted}>Complete a quiz to see your score trend.</p>;
    return (
        <div style={{ overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Quiz score trend chart" style={{ width: '100%', minWidth: 360, display: 'block' }}>
                {[0, 25, 50, 75, 100].map((tick) => {
                    const y = pad.top + (1 - tick / 100) * innerHeight;
                    return <g key={tick}><line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="var(--border-color)" strokeDasharray="4 5" /><text x={pad.left - 8} y={y + 4} textAnchor="end" fill="var(--text-muted)" fontSize="11">{tick}%</text></g>;
                })}
                <polyline points={coords.map(({ x, y }) => `${x},${y}`).join(' ')} fill="none" stroke="var(--brand-primary)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                {coords.map((point, index) => <g key={`${point.attemptedAt}-${index}`}>
                    <circle cx={point.x} cy={point.y} r="5" fill="var(--brand-primary)" />
                    <text x={point.x} y={height - 9} textAnchor="middle" fill="var(--text-muted)" fontSize="10">{new Date(point.attemptedAt).toLocaleDateString()}</text>
                </g>)}
            </svg>
        </div>
    );
};

const Analytics = () => {
    const [analytics, setAnalytics] = useState(emptyAnalytics);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        Promise.all([analyticsService.getStudyAnalytics(), quizAttemptService.getHistory()])
            .then(([stats, attempts]) => {
                if (!active) return;
                setAnalytics({ ...emptyAnalytics, ...stats });
                setHistory(Array.isArray(attempts) ? attempts : []);
            })
            .catch((err) => {
                if (active) setError(err.response?.data?.error || 'Could not load study analytics. Please try again.');
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    if (loading) return <main style={styles.page}><p style={styles.muted}>Loading your study analytics…</p></main>;
    return (
        <main style={styles.page}>
            <header style={styles.header}>
                <div><p style={styles.eyebrow}>YOUR PROGRESS</p><h1 style={styles.title}>Study Analytics</h1><p style={styles.muted}>Your studies and quiz results, all in one place.</p></div>
                <BarChart3 size={34} color="var(--brand-primary)" />
            </header>
            {error && <p role="alert" style={styles.error}>{error}</p>}
            <section style={styles.stats} aria-label="Study summary">
                <Stat icon={BookOpen} label="Total studies" value={analytics.totalStudies} />
                <Stat icon={Brain} label="Topics" value={analytics.totalTopics} />
                <Stat icon={CircleHelp} label="MCQs" value={analytics.totalMcqs} />
                <Stat icon={BarChart3} label="Quizzes attempted" value={analytics.quizzesAttempted} />
                <Stat icon={BarChart3} label="Average score" value={`${analytics.averageScore}%`} />
                <Stat icon={Trophy} label="Highest score" value={`${analytics.highestScore}%`} />
            </section>
            <section style={styles.panel}>
                <h2 style={styles.sectionTitle}>Quiz score trend</h2>
                <p style={styles.muted}>Your latest {analytics.scoreTrend.length} completed quiz attempts</p>
                <ScoreTrend points={analytics.scoreTrend || []} />
            </section>
            <section style={styles.panel}>
                <h2 style={styles.sectionTitle}>Quiz history</h2>
                {history.length === 0 ? <p style={styles.muted}>No quiz attempts yet. Complete a quiz and it will appear here.</p> : (
                    <div style={styles.historyList}>
                        {history.map((attempt) => <article key={attempt._id} style={styles.historyItem}>
                            <div><strong style={styles.studyName}>{attempt.studyName}</strong><div style={styles.date}>{new Date(attempt.attemptedAt).toLocaleString()}</div></div>
                            <div style={styles.result}><strong>{attempt.score}/{attempt.totalQuestions}</strong><span style={styles.pill}>{attempt.percentage}%</span></div>
                        </article>)}
                    </div>
                )}
            </section>
        </main>
    );
};

const styles = {
    page: { maxWidth: 1100, margin: '0 auto', padding: '0 20px 48px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 26px' },
    eyebrow: { color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '.12em', fontSize: '.75rem', marginBottom: 6 },
    title: { color: 'var(--text-primary)', margin: '0 0 7px', fontSize: '2rem' },
    muted: { color: 'var(--text-secondary)', margin: '6px 0 16px' },
    stats: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 20 },
    stat: { display: 'flex', alignItems: 'center', gap: 13, padding: 18, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 13 },
    statIcon: { color: 'var(--brand-primary)', background: 'var(--bg-tertiary)', borderRadius: 10, padding: 10, display: 'flex' },
    label: { color: 'var(--text-secondary)', fontSize: '.84rem', marginBottom: 5 },
    value: { color: 'var(--text-primary)', fontSize: '1.35rem' },
    panel: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 14, padding: 22, marginTop: 18 },
    sectionTitle: { color: 'var(--text-primary)', fontSize: '1.2rem', margin: '0 0 6px' },
    historyList: { display: 'flex', flexDirection: 'column' },
    historyItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '15px 0', borderBottom: '1px solid var(--border-color)' },
    studyName: { color: 'var(--text-primary)' },
    date: { color: 'var(--text-muted)', fontSize: '.82rem', marginTop: 5 },
    result: { display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap' },
    pill: { color: 'var(--brand-primary)', background: 'var(--bg-tertiary)', borderRadius: 20, padding: '5px 10px', fontWeight: 700 },
    error: { color: '#dc2626', background: 'var(--bg-secondary)', border: '1px solid #dc2626', borderRadius: 8, padding: 12 }
};

export default Analytics;
