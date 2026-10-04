import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studyService } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Trash2, Eye, Calendar, FileText } from 'lucide-react';

const MyStudy = () => {
    const { t } = useAppContext();
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        try {
            const data = await studyService.getUserStudies();
            setStudies(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch your studies');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('common.confirmDelete') || 'Are you sure you want to delete this study?')) return;

        try {
            await studyService.deleteStudy(id);
            setStudies(studies.filter(s => s._id !== id));
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete study');
        }
    };

    const handleView = (study) => {
        // Redirect to home and pass study data to Dashboard via state
        navigate('/', { state: { savedStudy: study } });
    };

    if (loading) return <div style={styles.center}>{t('common.loading') || 'Loading...'}</div>;
    if (error) return <div style={styles.center}>{error}</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={styles.header}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('nav.myStudy')}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{t('mystudy.description')}</p>
            </div>

            {studies.length === 0 ? (
                <div style={styles.emptyState}>
                    <BookOpen size={64} color="var(--text-muted)" />
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{t('mystudy.placeholder')}</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {studies.map(study => (
                        <div key={study._id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.fileInfo}>
                                    <FileText size={24} color="var(--brand-primary)" />
                                    <span style={styles.fileName}>{study.fileName}</span>
                                </div>
                                <div style={styles.dateInfo}>
                                    <Calendar size={14} />
                                    <span>{new Date(study.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p style={styles.summary}>{study.summary?.substring(0, 120)}...</p>
                            <div style={styles.actions}>
                                <button
                                    onClick={() => handleView(study)}
                                    style={{ ...styles.btn, ...styles.viewBtn }}
                                >
                                    <Eye size={18} /> {t('common.view') || 'View'}
                                </button>
                                <button
                                    onClick={() => handleDelete(study._id)}
                                    style={{ ...styles.btn, ...styles.deleteBtn }}
                                >
                                    <Trash2 size={18} /> {t('common.delete') || 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: 'var(--text-primary)'
    },
    header: {
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '40px'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        textAlign: 'center',
        color: 'var(--text-secondary)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        marginBottom: '60px'
    },
    card: {
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'default'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '70%'
    },
    fileName: {
        fontWeight: '600',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    dateInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
    },
    summary: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        marginBottom: '20px',
        flex: 1
    },
    actions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end'
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        transition: 'opacity 0.2s'
    },
    viewBtn: {
        backgroundColor: 'var(--brand-primary)',
        color: 'white'
    },
    deleteBtn: {
        backgroundColor: 'var(--bg-tertiary)',
        color: '#ef4444',
        border: '1px solid #fecaca'
    }
};

export default MyStudy;
