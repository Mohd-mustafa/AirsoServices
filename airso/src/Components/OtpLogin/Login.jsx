import React, { useState,useEffect } from "react";
import { auth, provider, signInWithPopup } from "../../firebaseConfig.js";
 import {
  MDBContainer,
  MDBInput,
  MDBBtn
} from "mdb-react-ui-kit";
 import { useNavigate } from "react-router-dom";
import "./Otplogin.css";
import airso from "../../assests/airso.jpg";
import axios from "axios";
 import { useAuth } from "../../AuthContextFiles/AuthContext.js";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get setters from AuthContext

 
  const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        const uid = result.user.uid;

 
        // Make API request to backend
        const response = await axios.post("http://localhost:5000/auth/google", { idToken, uid }, { withCredentials: true });

 
        if (response?.status === 200) {
           login(response.data.user) 
            navigate('/home')
        } else {
            console.error("Backend Authentication Failed:", response?.data?.message);
        }
    } catch (error) {
        console.error("Login Failed:", error.response?.data || error.message);
    }
};

 
  return (
    <MDBContainer className="login-container">
      <div className="login-image">
        <img src={airso} alt="Login" />
      </div>
      <div className="login-form">
        <h3>Sign In</h3>
        <MDBInput type="email" className="login-input" size="lg" placeholder="Email address" />
        <MDBInput type="password" className="login-input" size="lg" placeholder="Password" />
        <div className="remember-forgot">
          <a href="#" className="forget-password">Forgot password?</a>
        </div>
        <MDBBtn className="login-btn w-100" size="lg">Sign in</MDBBtn>
        <div className="divider">
          <p className="text-center fw-bold mx-3 mb-0">OR</p>
        </div>
        <button
      onClick={handleGoogleLogin}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "12px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        border: "1px solid #ddd",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#ffffff",
        color: "#333",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
       }}
      onMouseOver={(e) => (e.target.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)")}
      onMouseOut={(e) => (e.target.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)")}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
        style={{ width: "24px", height: "24px" }}
      />
      Sign in with Google
    </button>
 </div>
    </MDBContainer>
  );
};

export default Login;
