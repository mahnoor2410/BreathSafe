import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (user.isBlocked) {
          message.error("This user is blocked and cannot access the site.");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("authToken", token);

        message.success("Login successful!");
        
        if (user.role === "admin") {
          navigate("/report");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        message.error(error.response.data.message || "This user is blocked.");
        navigate("/notFound");
      } else {
        message.error("Login failed. Please check your credentials.");
      }
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <Link to="/" className="back-link">
        <span className="back-icon">←</span> Back
      </Link>
      <div className="container">
        <div className="login-card">
          <div className="card-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to login</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <span className="input-icon">👤</span>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <span className="input-icon">🔒</span>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="card-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <Link to="/change-password" className="forgot-password">Forgot Password?</Link>
          </div>
        </div>
        
        <div className="decorative-elements">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  position: relative;

  .back-link {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #80b918;
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 50px;
    z-index: 3;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(128, 185, 24, 0.3);

    &:hover {
      background: #6aa017;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 18px rgba(128, 185, 24, 0.5);
      animation: ${pulse} 1.5s infinite;
    }

    .back-icon {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .login-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 450px;
    animation: ${fadeIn} 0.6s ease-out;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }

  .card-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      color: #7f8c8d;
      font-size: 14px;
    }
  }

  .input-group {
    position: relative;
    margin-bottom: 25px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-size: 14px;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 15px 15px 15px 45px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;

      &:focus {
        border-color: #80b918;
        box-shadow: 0 0 0 3px rgba(128, 185, 24, 0.2);
        outline: none;
        background-color: white;
      }

      &::placeholder {
        color: #bdc3c7;
      }
    }

    .input-icon {
      position: absolute;
      left: 15px;
      bottom: 15px;
      font-size: 18px;
      color: #7f8c8d;
    }
  }

  button {
    width: 100%;
    padding: 15px;
    background: #80b918;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;

    &:hover {
      background: #6aa017;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: #a5d363;
      cursor: not-allowed;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }

  .card-footer {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
    color: #7f8c8d;

    a {
      color: #80b918;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        color: #6aa017;
        text-decoration: underline;
      }
    }

    .forgot-password {
      display: block;
      margin-top: 15px;
      font-size: 13px;
    }
  }

  .decorative-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;

    .circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(128, 185, 24, 0.1);
      animation: ${float} 6s ease-in-out infinite;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -50px;
      right: -50px;
      animation-delay: 2s;
    }

    .circle-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      right: 100px;
      animation-delay: 4s;
    }
  }

  @media (max-width: 768px) {
    .login-card {
      padding: 30px 20px;
      margin: 20px;
    }

    .decorative-elements {
      display: none;
    }

    .back-link {
      display: none; // Hide back button on small screens
    }
  }
`;

export default Login;