import { User } from '@/lib/types'
import React, { createContext, useState, useEffect, useContext } from 'react';


interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (userData: { user: User; token: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: { user: User; token: string }) => {
        setUser(userData.user);
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

    };

    // Check if there's a token in local storage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            // You might want to fetch user data using the token here
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

