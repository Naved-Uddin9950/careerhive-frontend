import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData) => {
        setUser(userData.user);
        setToken(userData.token);
        setIsAuthenticated(true);
        Cookies.set('user', JSON.stringify(userData.user), { expires: 7 });
        Cookies.set('token', JSON.stringify(userData.token), { expires: 7 });
        
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('user');
        Cookies.remove('token');
        navigate("/login")
    };
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};