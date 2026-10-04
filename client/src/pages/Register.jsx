import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAppContext } from '../context/AppContext';
import { UserPlus, User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const { t } = useAppContext();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await authService.register(formData);
            localStorage.setItem('studymate-token', response.token);
            window.location.href = '/'; // Full reload to trigger AuthProvider
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <UserPlus size={48} color="var(--brand-primary)" />
                    <h2 style={{ marginTop: '1rem' }}>{t('auth.registerTitle') || 'Create Account'}</h2>
                    <p style={styles.subtitle}>{t('auth.registerSubtitle') || 'Join StudyMate and start learning'}</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <User size={20} style={styles.inputIcon} />
                        <input
                            type="text"
                            placeholder="Full Name"
                            style={styles.input}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <Mail size={20} style={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            style={styles.input}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <Lock size={20} style={styles.inputIcon} />
                        <input
                            type="password"
                            placeholder="Password (min 6 chars)"
                            style={styles.input}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Creating account...' : t('auth.registerBtn') || 'Register'}
                    </button>
                </form>

                <div style={styles.footer}>
                    Already have an account? <Link to="/login" style={styles.link}>Login</Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'var(--bg-secondary)'
    },
    card: {
        backgroundColor: 'var(--bg-primary)',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
    },
    header: {
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        marginTop: '0.5rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '12px',
        color: 'var(--text-muted)'
    },
    input: {
        width: '100%',
        padding: '12px 12px 12px 42px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    error: {
        color: '#ef4444',
        fontSize: '0.9rem',
        textAlign: 'left',
        paddingLeft: '5px'
    },
    button: {
        padding: '12px',
        backgroundColor: 'var(--brand-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'opacity 0.2s'
    },
    footer: {
        marginTop: '2rem',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
    },
    link: {
        color: 'var(--brand-primary)',
        textDecoration: 'none',
        fontWeight: '600'
    }
};

export default Register;
