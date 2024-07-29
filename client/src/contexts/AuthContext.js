// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from 'services/api';
import { path } from 'variables/path';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await checkUser(storedToken);
                    if (response.status === 200) {
                        setToken(storedToken);
                        setUser(response.data.data);
                    } else {
                        logout()
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                    navigate(path.signIn);
                }
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        };

        checkToken();
    }, [navigate]);

    const authAction = (newToken, user) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(user);
        navigate(path.admin.default);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate(path.signIn);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, user, setUser, authAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;