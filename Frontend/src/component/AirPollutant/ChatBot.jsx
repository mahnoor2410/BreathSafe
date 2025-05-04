import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messageBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      }
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [navigate]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  const sendMessage = async () => {
    if (!userInput.trim()) {
      alert('Please enter a message!');
      return;
    }

    const userMessage = { type: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsBotTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}` // Add token to headers
        },
        body: JSON.stringify({ message: userInput }),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("authToken"); // Clear invalid token
          throw new Error('Please log in to use the chatbot');
        }
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      alert(error.message);
      console.error(error);
      if (error.message.includes('log in')) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <StyledWrapper>
      <div className="container">
        <div className="chatbot-card">
          <div className="card-header">
            <h2>Chatbot Assistant</h2>
            <p>Start a conversation with our AI assistant</p>
          </div>

          <div ref={messageBoxRef} className="message-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${
                  msg.type === 'user' ? 'user-message' : 'bot-message'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            ))}
            {isBotTyping && (
              <div className="message-bubble bot-message typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>

          <div className="input-container">
            <div className="input-group">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="message-input"
              />
              <span className="input-icon">💬</span>
            </div>
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>

          <div className="card-footer">
            <a href="/history" className="history-link">
              View Last 7 Days Conversations
            </a>
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

const typing = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
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

  .chatbot-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 600px;
    animation: ${fadeIn} 0.6s ease-out;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    height: 80vh;
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

  .message-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .message-bubble {
    max-width: 80%;
    padding: 12px 18px;
    border-radius: 15px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    &.user-message {
      background: #80b918;
      color: white;
      margin-left: auto;
      border-bottom-right-radius: 5px;
    }

    &.bot-message {
      background: #f1f3f5;
      color: #2c3e50;
      margin-right: auto;
      border-bottom-left-radius: 5px;
    }

    &.typing-indicator {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 10px 15px;

      .dot {
        width: 8px;
        height: 8px;
        background: #7f8c8d;
        border-radius: 50%;
        animation: ${typing} 1s infinite;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  .input-container {
    display: flex;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #e0e0e0;
  }

  .input-group {
    position: relative;
    flex: 1;

    .message-input {
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

  .send-button {
    padding: 15px 25px;
    background: #80b918;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 48px;

    &:hover {
      background: #6aa017;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .card-footer {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #7f8c8d;

    .history-link {
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
    .chatbot-card {
      padding: 30px 20px;
      margin: 20px;
      height: 90vh;
    }

    .decorative-elements {
      display: none;
    }

    .input-container {
      flex-direction: column;
      gap: 15px;
    }

    .send-button {
      width: 100%;
    }
  }
`;

export default Chatbot;