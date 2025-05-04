import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/api/signup', formData);

      if (response.data.success) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrors(response.data.errors || { general: response.data.message });
      }
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response) {
        setErrors(error.response.data.errors || { 
          general: error.response.data.message || 'Signup failed' 
        });
      } else {
        setErrors({ general: 'Network error. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="signup-card">
          <div className="card-header">
            <h2>Create Your Account</h2>
            <p>Join our community today</p>
          </div>
          
          {successMessage && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {successMessage}
            </div>
          )}
          
          {errors.general && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={`input-group ${errors.username ? 'error' : ''}`}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                minLength="3"
              />
              <span className="input-icon">👤</span>
              {errors.username && (
                <span className="field-error">{errors.username}</span>
              )}
            </div>

            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <span className="input-icon">✉️</span>
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength="6"
              />
              <span className="input-icon">🔒</span>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <div className={`input-group ${errors.confirm_password ? 'error' : ''}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <span className="input-icon">🔒</span>
              {errors.confirm_password && (
                <span className="field-error">{errors.confirm_password}</span>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={isSubmitting ? 'submitting' : ''}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="card-footer">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
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

  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .signup-card {
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

  .success-message {
    background: #d4edda;
    color: #155724;
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    animation: ${fadeIn} 0.3s ease-out;

    svg {
      width: 18px;
      height: 18px;
      fill: #155724;
    }
  }

  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    animation: ${fadeIn} 0.3s ease-out;

    svg {
      width: 18px;
      height: 18px;
      fill: #721c24;
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

    .field-error {
      display: block;
      margin-top: 5px;
      color: #e74c3c;
      font-size: 12px;
    }

    &.error {
      input {
        border-color: #e74c3c;
        
        &:focus {
          box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
        }
      }

      .input-icon {
        color: #e74c3c;
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
    .signup-card {
      padding: 30px 20px;
      margin: 20px;
    }

    .decorative-elements {
      display: none;
    }
  }
`;

export default Signup;