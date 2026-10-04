import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, Sun, Moon, Globe, LogOut, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { theme, setTheme, language, setLanguage, t } = useAppContext();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const themeDropdownRef = useRef(null);
    const langDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            @media (max-width: 768px) {
                .nav-links { display: none !important; }
                .mobile-toggle { display: block !important; }
            }
        `;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
                setIsThemeOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
        { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
        { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
        { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const getInitials = (nameStr) => {
        if (!nameStr) return 'U';
        const parts = nameStr.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
                <BookOpen size={24} style={{ marginRight: '8px' }} />
                <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>StudyMate</span>
            </Link>

            <div style={{ ...styles.links, ...(isMobileMenuOpen ? styles.mobileLinks : {}) }}>
                <Link to="/" style={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
                <Link to="/my-study" style={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.myStudy')}</Link>
                <Link to="/analytics" style={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.analytics') || 'Analytics'}</Link>
                <Link to="/about" style={styles.link} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</Link>

                <div style={styles.settings}>
                    {user && (
                        <div style={styles.themeContainer} ref={userDropdownRef}>
                            <button
                                onClick={() => { setIsUserOpen(!isUserOpen); setIsThemeOpen(false); setIsLangOpen(false); }}
                                style={{ ...styles.settingBtn, fontWeight: 'bold', fontSize: '0.85rem' }}
                                title={user.name}
                            >
                                {user.avatar
                                    ? <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                    : getInitials(user.name)}
                            </button>

                            {isUserOpen && (
                                <div style={styles.dropdown}>
                                    <div style={{ ...styles.dropdownItem, cursor: 'default', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '4px' }}>
                                        <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</strong>
                                    </div>
                                    <div
                                        style={styles.dropdownItem}
                                        onClick={() => { navigate('/profile'); setIsUserOpen(false); setIsMobileMenuOpen(false); }}
                                    >
                                        <UserIcon size={16} /> <span style={{ marginLeft: '8px' }}>Profile & Settings</span>
                                    </div>
                                    <div
                                        style={styles.dropdownItem}
                                        onClick={() => { logout(); setIsUserOpen(false); }}
                                    >
                                        <LogOut size={16} /> <span style={{ marginLeft: '8px' }}>Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div style={styles.themeContainer} ref={themeDropdownRef}>
                        <button
                            onClick={() => { setIsThemeOpen(!isThemeOpen); setIsLangOpen(false); setIsUserOpen(false); }}
                            style={styles.settingBtn}
                            title={t('nav.theme')}
                        >
                            {theme === 'light' ? <Sun size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Globe size={20} />}
                        </button>

                        {isThemeOpen && (
                            <div style={styles.dropdown}>
                                <div
                                    style={styles.dropdownItem}
                                    onClick={() => { setTheme('light'); setIsThemeOpen(false); }}
                                    className={theme === 'light' ? styles.activeItem : ''}
                                >
                                    <Sun size={16} /> <span style={{ marginLeft: '8px' }}>Light</span>
                                </div>
                                <div
                                    style={styles.dropdownItem}
                                    onClick={() => { setTheme('dark'); setIsThemeOpen(false); }}
                                    className={theme === 'dark' ? styles.activeItem : ''}
                                >
                                    <Moon size={16} /> <span style={{ marginLeft: '8px' }}>Dark</span>
                                </div>
                                <div
                                    style={styles.dropdownItem}
                                    onClick={() => { setTheme('system'); setIsThemeOpen(false); }}
                                    className={theme === 'system' ? styles.activeItem : ''}
                                >
                                    <Globe size={16} /> <span style={{ marginLeft: '8px' }}>System</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={styles.themeContainer} ref={langDropdownRef}>
                        <button
                            onClick={() => { setIsLangOpen(!isLangOpen); setIsThemeOpen(false); setIsUserOpen(false); }}
                            style={styles.settingBtn}
                            title={t('nav.lang')}
                        >
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {currentLang.code.toUpperCase()}
                            </span>
                        </button>

                        {isLangOpen && (
                            <div style={styles.dropdown}>
                                {languages.map(lang => (
                                    <div
                                        key={lang.code}
                                        style={styles.dropdownItem}
                                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                        className={language === lang.code ? styles.activeItem : ''}
                                    >
                                        <span style={{ marginRight: '8px' }}>{lang.flag}</span> <span>{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={styles.mobileToggle}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'var(--bg-primary)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem',
        position: 'relative',
        zIndex: 1000
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--brand-primary)',
        textDecoration: 'none'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    mobileLinks: {
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        backgroundColor: 'var(--bg-primary)',
        flexDirection: 'column',
        padding: '1rem',
        boxShadow: 'var(--shadow-md)',
        borderTop: '1px solid var(--border-color)'
    },
    link: {
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontWeight: '500',
        transition: 'color 0.2s'
    },
    settings: {
        display: 'flex',
        gap: '10px',
        marginLeft: '10px',
        borderLeft: '1px solid var(--border-color)',
        paddingLeft: '15px',
        alignItems: 'center'
    },
    themeContainer: {
        position: 'relative'
    },
    dropdown: {
        position: 'absolute',
        top: '42px',
        right: '0',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-md)',
        padding: '8px',
        zIndex: 1100,
        minWidth: '140px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    dropdownItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s'
    },
    activeItem: {
        backgroundColor: 'var(--bg-tertiary)',
        fontWeight: '600'
    },
    settingBtn: {
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        transition: 'all 0.2s'
    },
    mobileToggle: {
        display: 'none',
        cursor: 'pointer',
        color: 'var(--text-primary)'
    }
};

export default Navbar;
