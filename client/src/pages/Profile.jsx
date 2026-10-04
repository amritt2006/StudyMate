import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { authService } from '../services/api';
import { User, Settings as SettingsIcon, Key, LogOut, Sun, Moon, Globe, Check, AlertCircle, Loader2, Camera, Trash2 } from 'lucide-react';

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const { theme, setTheme, language, setLanguage, t } = useAppContext();
    const avatarInputRef = useRef(null);

    const [activeTab, setActiveTab] = useState('profile');

    // Profile state
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState('');
    const [profileError, setProfileError] = useState('');

    useEffect(() => {
        setProfileData({
            name: user?.name || '',
            bio: user?.bio || '',
            avatar: user?.avatar || ''
        });
    }, [user]);

    // Password state
    const [passData, setPassData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passLoading, setPassLoading] = useState(false);
    const [passSuccess, setPassSuccess] = useState('');
    const [passError, setPassError] = useState('');

    // Avatar initials helper
    const getInitials = (nameStr) => {
        if (!nameStr) return 'U';
        const parts = nameStr.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    };

    const handleAvatarSelection = (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        setProfileSuccess('');
        setProfileError('');

        if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
            setProfileError('Choose a JPG, PNG, or WebP image.');
            return;
        }
        if (file.size > MAX_AVATAR_SIZE) {
            setProfileError('Profile image must be 2 MB or smaller.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setProfileData((current) => ({ ...current, avatar: reader.result }));
            }
        };
        reader.onerror = () => setProfileError('Could not read that image. Please try another file.');
        reader.readAsDataURL(file);
    };

    const handleRemoveAvatar = () => {
        setProfileData((current) => ({ ...current, avatar: '' }));
        setProfileSuccess('');
        setProfileError('');
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileSuccess('');
        setProfileError('');

        try {
            const updated = await authService.updateProfile({
                name: profileData.name,
                bio: profileData.bio,
                avatar: profileData.avatar
            });
            updateUser(updated);
            setProfileSuccess(t('profile.updatedSuccess') || 'Profile updated successfully!');
        } catch (err) {
            setProfileError(err.response?.data?.error || err.message || 'Failed to update profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPassSuccess('');
        setPassError('');

        if (passData.newPassword !== passData.confirmPassword) {
            setPassError('New passwords do not match');
            return;
        }

        if (passData.newPassword.length < 6) {
            setPassError('Password must be at least 6 characters');
            return;
        }

        setPassLoading(true);

        try {
            await authService.changePassword({
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            });
            setPassSuccess(t('profile.passwordSuccess') || 'Password changed successfully!');
            setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPassError(err.response?.data?.error || err.message || 'Failed to change password');
        } finally {
            setPassLoading(false);
        }
    };

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

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.avatar}>
                        {profileData.avatar
                            ? <img src={profileData.avatar} alt="Profile" style={styles.avatarImage} />
                            : getInitials(profileData.name)}
                    </div>
                    <div>
                        <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>{profileData.name || 'User Profile'}</h2>
                        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.95rem' }}>{user?.email}</p>
                    </div>
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('profile')}
                        style={activeTab === 'profile' ? styles.tabActive : styles.tab}
                    >
                        <User size={18} /> {t('profile.tabProfile') || 'Profile'}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        style={activeTab === 'settings' ? styles.tabActive : styles.tab}
                    >
                        <SettingsIcon size={18} /> {t('profile.tabSettings') || 'Settings'}
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        style={activeTab === 'security' ? styles.tabActive : styles.tab}
                    >
                        <Key size={18} /> {t('profile.tabSecurity') || 'Security'}
                    </button>
                </div>

                <div style={styles.tabBody}>
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileSubmit} style={styles.form}>
                            {profileSuccess && <div style={styles.successMsg}><Check size={16} /> {profileSuccess}</div>}
                            {profileError && <div style={styles.errorMsg}><AlertCircle size={16} /> {profileError}</div>}

                            <div style={styles.avatarEditor}>
                                <div style={{ ...styles.avatar, ...styles.avatarPreview }}>
                                    {profileData.avatar
                                        ? <img src={profileData.avatar} alt="Profile preview" style={styles.avatarImage} />
                                        : getInitials(profileData.name)}
                                </div>
                                <div style={styles.avatarActions}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Profile photo</strong>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>JPG, PNG, or WebP · up to 2 MB</span>
                                    <div style={styles.avatarButtons}>
                                        <input
                                            ref={avatarInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleAvatarSelection}
                                            style={{ display: 'none' }}
                                        />
                                        <button type="button" onClick={() => avatarInputRef.current?.click()} style={styles.photoBtn}>
                                            <Camera size={16} /> {profileData.avatar ? 'Change photo' : 'Upload photo'}
                                        </button>
                                        {profileData.avatar && (
                                            <button type="button" onClick={handleRemoveAvatar} style={styles.removePhotoBtn}>
                                                <Trash2 size={16} /> Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.name') || 'Full Name'}</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    maxLength={80}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.email') || 'Email Address'}</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    style={{ ...styles.input, backgroundColor: 'var(--bg-tertiary)', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.bio') || 'Bio / Academic Interest'}</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    style={styles.textarea}
                                    placeholder={t('profile.bioPlaceholder') || 'Tell us about your study goals or major...'}
                                    maxLength={500}
                                    rows={4}
                                />
                            </div>

                            <button type="submit" disabled={profileLoading} style={styles.submitBtn}>
                                {profileLoading ? <><Loader2 size={18} className="spin" /> Saving...</> : (t('profile.saveBtn') || 'Save Profile')}
                            </button>
                        </form>
                    )}

                    {activeTab === 'settings' && (
                        <div style={styles.form}>
                            <div style={styles.section}>
                                <h3>{t('nav.theme') || 'Appearance Theme'}</h3>
                                <div style={styles.themeGroup}>
                                    {[
                                        { mode: 'light', icon: <Sun size={18} />, label: 'Light' },
                                        { mode: 'dark', icon: <Moon size={18} />, label: 'Dark' },
                                        { mode: 'system', icon: <Globe size={18} />, label: 'System' }
                                    ].map(item => (
                                        <button
                                            key={item.mode}
                                            type="button"
                                            onClick={() => setTheme(item.mode)}
                                            style={theme === item.mode ? styles.themeBtnActive : styles.themeBtn}
                                        >
                                            {item.icon} <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3>{t('nav.lang') || 'Language / Format'}</h3>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    style={styles.select}
                                >
                                    {languages.map(l => (
                                        <option key={l.code} value={l.code}>
                                            {l.flag} {l.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handlePasswordSubmit} style={styles.form}>
                            {passSuccess && <div style={styles.successMsg}><Check size={16} /> {passSuccess}</div>}
                            {passError && <div style={styles.errorMsg}><AlertCircle size={16} /> {passError}</div>}

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.currentPassword') || 'Current Password'}</label>
                                <input
                                    type="password"
                                    value={passData.currentPassword}
                                    onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.newPassword') || 'New Password'}</label>
                                <input
                                    type="password"
                                    value={passData.newPassword}
                                    onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>{t('profile.confirmPassword') || 'Confirm New Password'}</label>
                                <input
                                    type="password"
                                    value={passData.confirmPassword}
                                    onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <button type="submit" disabled={passLoading} style={styles.submitBtn}>
                                {passLoading ? <><Loader2 size={18} className="spin" /> Updating...</> : (t('profile.updatePasswordBtn') || 'Update Password')}
                            </button>
                        </form>
                    )}
                </div>

                <div style={styles.footer}>
                    <button onClick={logout} style={styles.logoutBtn}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px'
    },
    card: {
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '20px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
    },
    header: {
        padding: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)'
    },
    avatar: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--brand-primary)',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        flexShrink: 0
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%'
    },
    avatarEditor: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        padding: '18px',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        backgroundColor: 'var(--bg-primary)'
    },
    avatarPreview: {
        width: '88px',
        height: '88px',
        fontSize: '1.8rem'
    },
    avatarActions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    avatarButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '4px'
    },
    photoBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px',
        padding: '9px 12px',
        color: 'white',
        backgroundColor: 'var(--brand-primary)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    removePhotoBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px',
        padding: '9px 12px',
        color: '#dc2626',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-tertiary)'
    },
    tab: {
        flex: 1,
        padding: '16px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    tabActive: {
        flex: 1,
        padding: '16px',
        border: 'none',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--brand-primary)',
        fontWeight: '600',
        borderBottom: '3px solid var(--brand-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    tabBody: {
        padding: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--text-secondary)'
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none'
    },
    textarea: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        resize: 'vertical'
    },
    select: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    themeGroup: {
        display: 'flex',
        gap: '15px'
    },
    themeBtn: {
        flex: 1,
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '500'
    },
    themeBtnActive: {
        flex: 1,
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--brand-primary)',
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--brand-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '600'
    },
    submitBtn: {
        padding: '12px',
        backgroundColor: 'var(--brand-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '10px'
    },
    successMsg: {
        padding: '12px',
        backgroundColor: '#dcfce7',
        color: '#15803d',
        borderRadius: '8px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    errorMsg: {
        padding: '12px',
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        borderRadius: '8px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    footer: {
        padding: '20px 30px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    logoutBtn: {
        padding: '10px 20px',
        backgroundColor: 'var(--bg-tertiary)',
        color: '#ef4444',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }
};

export default Profile;
