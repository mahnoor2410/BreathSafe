import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const text = await response.text();
          setRawResponse(text);
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error ${response.status}: ${text}`);
        }

        const data = await response.json();
        setHistory(data.history || []);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchHistory();
  }, []);

  const truncateResponse = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="history-card">
          <div className="card-header">
            <h2>Your Chat History</h2>
            <p>View your conversations from the last 7 days</p>
          </div>

          <div className="action-group">
            <a href="/chatbot" className="back-button">
              Back to ChatBot
            </a>
          </div>

          {error && (
            <div className="error-message">
              Error: {error}
              {rawResponse && (
                <pre className="raw-response">
                  Raw response: {rawResponse}
                </pre>
              )}
            </div>
          )}

          <div className="history-container">
            {history.length === 0 && !error && (
              <p className="no-history">No chat history found.</p>
            )}
            {history.map((chat) => (
              <div key={chat.id} className="history-item">
                <h3 className="history-title">
                  {chat.title || 'No Title'}
                </h3>
                <p className="history-content">
                  <strong>Your Query:</strong> {chat.user_input}
                </p>
                <p className="history-content">
                  <strong>Bot Response:</strong>{' '}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: truncateResponse(chat.bot_response, 100),
                    }}
                  />
                </p>
                <button
                  onClick={() => navigate(`/history/${chat.id}`)}
                  className="view-button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <a href="/chatbot" className="footer-link">
              Return to ChatBot
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

  .history-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 900px;
    animation: ${fadeIn} 0.6s ease-out;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
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

  .action-group {
    margin-bottom: 25px;
    text-align: left;

    .back-button {
      display: inline-block;
      padding: 12px 20px;
      background: #80b918;
      color: white;
      border-radius: 10px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
      }
    }
  }

  .error-message {
    color: #c0392b;
    margin-bottom: 25px;
    font-size: 14px;

    .raw-response {
      background: #f8f9fa;
      padding: 10px;
      margin-top: 10px;
      font-size: 12px;
      border-radius: 5px;
      overflow-x: auto;
    }
  }

  .history-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .history-item {
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .history-title {
      color: #2c3e50;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .history-content {
      color: #7f8c8d;
      font-size: 14px;
      margin-bottom: 10px;

      strong {
        color: #2c3e50;
      }
    }

    .view-button {
      padding: 10px 20px;
      background: #80b918;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .no-history {
    color: #7f8c8d;
    font-size: 16px;
    text-align: center;
    padding: 20px;
  }

  .card-footer {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
    color: #7f8c8d;

    .footer-link {
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
    .history-card {
      padding: 30px 20px;
      margin: 20px;
    }

    .decorative-elements {
      display: none;
    }

    .history-item {
      padding: 15px;
    }

    .view-button {
      width: 100%;
      text-align: center;
    }
  }
`;

export default ChatHistory;