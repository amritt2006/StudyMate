import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('studymate-token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error('Session expired', error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (userData, tokenValue) => {
        setUser(userData);
        setToken(tokenValue);
        localStorage.setItem('studymate-token', tokenValue);
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('studymate-token');
        navigate('/login');
    };

    const updateUser = (updatedData) => {
        setUser(prev => prev ? { ...prev, ...updatedData } : updatedData);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
