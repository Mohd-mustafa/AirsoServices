import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
 
    useEffect(() =>{
        axios.get("http://localhost:5000/auth/user", { withCredentials: true })
        .then((res) =>{
            setUser(res.data.user);
            console.log(res.data.user)
         })
        .catch(() =>{
            setUser(null);
        setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));

    },[]);

    const login = async (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
      };

    const logout = () => {
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
          .then(() => {
            setUser(null);
            setIsAuthenticated(false);
            window.location.href = "/login"; // Redirect to login after logout
            
          });
      };

     return(
        <AuthContext.Provider value={{ user, isAuthenticated, loading,login, logout }}>
        {children}
      </AuthContext.Provider>
     )
    }

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (!context) {
          throw new Error("useAuth must be used within an AuthProvider");
        }
        return context;
      };