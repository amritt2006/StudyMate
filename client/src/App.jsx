import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import PDFUploader from './components/PDFUploader';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import MyStudy from './pages/MyStudy';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

const Home = () => {
    const { t } = useAppContext();
    const location = useLocation();
    const [uploadedFile, setUploadedFile] = useState(null);
    const savedStudy = location.state?.savedStudy;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            {!uploadedFile && !savedStudy ? (
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>{t('home.heroTitle')}</h1>
                    <p style={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>
                    <PDFUploader onUploadSuccess={(file) => setUploadedFile(file)} />
                </div>
            ) : (
                <Dashboard uploadedFile={uploadedFile} savedStudy={savedStudy} />
            )}
        </div>
    );
};

const About = () => {
    const { t } = useAppContext();
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={styles.aboutCard}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{t('nav.about')}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{t('about.description')}</p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t('about.privacy')}</p>
                <div style={styles.aboutGrid}>
                    <div style={styles.aboutFeature}>
                        <strong style={{ color: 'var(--text-primary)' }}>{t('about.featureLocal')}</strong> {t('about.featureLocalDesc')}
                    </div>
                    <div style={styles.aboutFeature}>
                        <strong style={{ color: 'var(--text-primary)' }}>{t('about.featureSmart')}</strong> {t('about.featureSmartDesc')}
                    </div>
                    <div style={styles.aboutFeature}>
                        <strong style={{ color: 'var(--text-primary)' }}>{t('about.featureInteractive')}</strong> {t('about.featureInteractiveDesc')}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    hero: {
        textAlign: 'center',
        marginTop: '60px',
        padding: '40px 20px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)'
    },
    heroTitle: {
        fontSize: '3.5rem',
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        fontWeight: '800',
        lineHeight: '1.2',
        letterSpacing: '-0.02em'
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
        marginBottom: '3rem',
        maxWidth: '700px',
        margin: '0 auto 3rem',
        lineHeight: '1.6'
    },
    aboutCard: {
        backgroundColor: 'var(--bg-secondary)',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '900px',
        margin: '40px auto',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
    },
    aboutGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px',
        textAlign: 'left'
    },
    aboutFeature: {
        padding: '20px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '12px',
        borderLeft: '4px solid var(--brand-primary)',
        color: 'var(--text-secondary)',
        lineHeight: '1.5'
    }
};


const App = () => {
    return (
        <AppProvider>
            <Router>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/my-study" element={<ProtectedRoute><MyStudy /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    </Routes>
                </AuthProvider>
            </Router>
        </AppProvider>
    );
};

export default App;
