import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      const token = JSON.parse(Cookies.get("token"));
      setToken(token);
    }
  }, []);

  const login = (userData, msg) => {
    setUser(userData.user);
    setToken(userData.token);
    setIsAuthenticated(true);
    Cookies.set("user", JSON.stringify(userData.user), { expires: 7 });
    Cookies.set("token", JSON.stringify(userData.token), { expires: 7 });
    toast.success(msg);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("user");
    Cookies.remove("token");
    navigate("/login");
    toast.success("logout success");
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
