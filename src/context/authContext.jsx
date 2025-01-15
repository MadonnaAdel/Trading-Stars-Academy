import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("to@3xUken");
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (token && storedUser) {
            setIsLoggedIn(true);
            setToken(token);
            setUser(storedUser);
        }

        setLoading(false); 
    }, []);

    const login = (user) => {
        if (user.token) {
            setToken(user.token);
            setIsLoggedIn(true);
            localStorage.setItem('to@3xUken', user.token);
        }
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }
    
    const logout = () => {
        localStorage.removeItem('to@3xUken');
        localStorage.removeItem('user');
        setUser(null);
        setToken('');
        setIsLoggedIn(false);
        
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
