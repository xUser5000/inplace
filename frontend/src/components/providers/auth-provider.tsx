import { User } from '@/lib/types'
import React, { createContext, useState, useEffect, useContext } from 'react';


interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (userData: { user: User; token: string }) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    loading: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const login = (userData: { user: User; token: string }) => {
        console.log(userData);
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
        console.log(token);
    };

    useEffect(() => {
        setLoading(true)
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');


        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

