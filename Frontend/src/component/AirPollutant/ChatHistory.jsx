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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    padding: 40px 0; /* Added top and bottom padding for margin effect */
  }

  .history-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    padding: 48px;
    width: 100%;
    max-width: 960px;
    animation: ${fadeIn} 0.6s ease-out;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .card-header {
    text-align: center;
    margin-bottom: 32px;

    h2 {
      color: #2c3e50;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    p {
      color: #7f8c8d;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .action-group {
    margin-bottom: 32px;
    text-align: left;

    .back-button {
      display: inline-block;
      padding: 12px 24px;
      background: #80b918;
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(128, 185, 24, 0.4);
      }
    }
  }

  .error-message {
    color: #c0392b;
    margin-bottom: 32px;
    font-size: 15px;
    background: #fef2f2;
    padding: 16px;
    border-radius: 8px;

    .raw-response {
      background: #f8f9fa;
      padding: 12px;
      margin-top: 12px;
      font-size: 13px;
      border-radius: 6px;
      overflow-x: auto;
    }
  }

  .history-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .history-item {
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    background: #ffffff;

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      transform: translateY(-3px);
    }

    .history-title {
      color: #2c3e50;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .history-content {
      color: #7f8c8d;
      font-size: 15px;
      margin-bottom: 12px;
      line-height: 1.5;

      strong {
        color: #2c3e50;
      }
    }

    .view-button {
      padding: 10px 24px;
      background: #80b918;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(128, 185, 24, 0.4);
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
    padding: 24px;
    background: #f8f9fa;
    border-radius: 12px;
  }

  .card-footer {
    text-align: center;
    margin-top: 32px;
    font-size: 15px;
    color: #7f8c8d;

    .footer-link {
      color: #80b918;
      text-decoration: none;
      font-weight: 500;
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
      background: rgba(128, 185, 24, 0.15);
      animation: ${float} 6s ease-in-out infinite;
    }

    .circle-1 {
      width: 320px;
      height: 320px;
      top: -120px;
      left: -120px;
      animation-delay: 0s;
    }

    .circle-2 {
      width: 220px;
      height: 220px;
      bottom: -60px;
      right: -60px;
      animation-delay: 2s;
    }

    .circle-3 {
      width: 160px;
      height: 160px;
      top: 50%;
      right: 120px;
      animation-delay: 4s;
    }
  }

  @media (max-width: 768px) {
    .history-card {
      padding: 32px 16px;
      margin: 24px;
    }

    .decorative-elements {
      display: none;
    }

    .history-item {
      padding: 16px;
    }

    .view-button {
      width: 100%;
      text-align: center;
    }
  }
`;

export default ChatHistory;