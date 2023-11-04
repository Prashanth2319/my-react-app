import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/dashboard/employee";
    const [user, setUser] = useState({
      username: "",
      permissions: []
    });
    const [userTest, setTest] = useState("");

    const login = (userdetails) => {
        if (userdetails === "admin") {
          sessionStorage.setItem("userDetails",JSON.stringify({ username: userdetails, permissions: ["view_extra"] }));
          setUser({ username: userdetails, permissions: ["view_extra"] });
        } else {
          sessionStorage.setItem("userDetails",JSON.stringify({ username: userdetails, permissions: ["view_about"] }));
          setUser({ username: userdetails, permissions: ["view_about"] });
        }
        setTest(userdetails);
        navigate(redirectPath, { replace: true });
    };

    const logout = () => {
        sessionStorage.clear();
        setUser({ username: "", permissions: [] });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };

