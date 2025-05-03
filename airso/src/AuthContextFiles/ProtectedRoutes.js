 import React from 'react'
 import { Navigate ,Outlet} from "react-router-dom";
import { useAuth } from "./AuthContext";
 
 const ProtectedRoutes = ({children,role}) => {
    
    const { user, isAuthenticated, loading } = useAuth();
    if (loading) return <p>Loading...</p>; // Show loading state

    if (!isAuthenticated) {
      return <Navigate to="/login" />; // Redirect if not logged in
    }
  
    if (role && user?.role !== role) {
      return <Navigate to="/unauthorized" />; // Redirect if role doesn't match
    }
  
    return <Outlet />; // Render the child components
    };
 
 export default ProtectedRoutes