import React from "react";
import { useAuth } from "../providers/authprovider";
import { Navigate, useLocation } from "react-router-dom";

const Authentication = ({ children }) =>{

    let { user,setUser } = useAuth();
    const location = useLocation();
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if(!user.username){
      user = userDetails;
    }
    
    if (!(user && user.username)) {
      
      return <Navigate to="/" state={{ path: location.pathname }} />;
    }
    return children;
}

export default Authentication;