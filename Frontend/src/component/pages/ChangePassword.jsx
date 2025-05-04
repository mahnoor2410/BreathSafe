import React, { useState } from "react";
import axios from "axios";
import { FaLock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setMessageType("danger");
      setIsSubmitting(false);
      return;
    }

    const data = {
      email: email,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    try {
        const response = await axios.post("http://localhost:5000/api/change_password", data, { 
            withCredentials: true 
          });
          
      setMessage(response.data.message);
      setMessageType("success");
      
      // Clear form on success
      if (response.status === 200) {
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Error updating password.");
        setMessageType("danger");
      } else {
        setMessage("Network Error");
        setMessageType("danger");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="password-container">
        <div className="password-card">
          <div className="card-header">
            <div className="icon-wrapper">
              <FaLock />
            </div>
            <h2>Change Password</h2>
            <p>Enter your email and new password</p>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {messageType === "success" ? (
                <FaCheckCircle className="message-icon" />
              ) : (
                <FaExclamationTriangle className="message-icon" />
              )}
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="new_password">New Password</label>
              <input
                type="password"
                name="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create new password"
                required
              />
              <div className="password-tip">
                <span>Password should contain:</span>
                <ul>
                  <li className={newPassword.length >= 8 ? "valid" : ""}>At least 8 characters</li>
                  <li className={/\d/.test(newPassword) ? "valid" : ""}>One number</li>
                  <li className={/[!@#$%^&*]/.test(newPassword) ? "valid" : ""}>One special character</li>
                </ul>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirm_password">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={isSubmitting ? "submitting" : ""}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>

          <a className="back-link" href="/login">
            <FaArrowLeft />
            <span>Back to Login</span>
          </a>
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

const spin = keyframes`
  to { transform: rotate(360deg); }
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

  .password-container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 20px;
  }

  .password-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 500px;
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

    .icon-wrapper {
      width: 80px;
      height: 80px;
      background: #e8f5e9;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      color: #80b918;
      font-size: 36px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

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

  .message {
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    animation: ${fadeIn} 0.3s ease-out;

    &.success {
      background: #d4edda;
      color: #155724;
    }

    &.danger {
      background: #f8d7da;
      color: #721c24;
    }

    .message-icon {
      font-size: 18px;
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
      padding: 15px;
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
  }

  .password-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #7f8c8d;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;

    span {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin: 5px 0 0;

      li {
        position: relative;
        padding-left: 20px;
        margin-bottom: 3px;

        &:before {
          content: "•";
          position: absolute;
          left: 0;
        }

        &.valid {
          color: #80b918;
        }
      }
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
    gap: 8px;
    height: 48px;

    &:hover:not(:disabled) {
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

    &.submitting {
      background: #a5d363;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: ${spin} 1s ease-in-out infinite;
    }
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 25px;
    color: #7f8c8d;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.3s ease;
    justify-content: center;

    &:hover {
      color: #80b918;
    }

    svg {
      font-size: 14px;
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
    .password-card {
      padding: 30px 20px;
    }
  }
`;

export default ChangePassword;