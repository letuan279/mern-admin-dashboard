import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Not authenticated');
                    }
                    return res.json();
                })
                .then((user) => {
                    setUser(user);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const value = { user };

    return (
        <AuthContext.Provider value={
            {
                value,
                loading,
            }
        }>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
