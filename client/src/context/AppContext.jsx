import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('studymate-theme') || 'system');
    const [language, setLanguage] = useState(localStorage.getItem('studymate-lang') || 'en');

    useEffect(() => {
        localStorage.setItem('studymate-theme', theme);
        const root = window.document.documentElement;

        const resolvedTheme = theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;

        root.setAttribute('data-theme', resolvedTheme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('studymate-lang', language);
    }, [language]);

    const t = (keyPath) => {
        if (!keyPath) return '';

        const keys = keyPath.split('.');
        let value = translations[language];

        // Attempt to resolve in current language
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }

        // Fallback to English if not found
        if (value === null) {
            value = translations['en'];
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
        }

        // If still not found, return a fallback message instead of the raw key
        return value !== null ? value : `[${keyPath}]`;
    };

    return (
        <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
