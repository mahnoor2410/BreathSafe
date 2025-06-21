import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchChatDetail = async () => {
      try {
        const response = await fetch(`/api/history/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          credentials: 'include',
        });

        const responseText = await response.text();
        setRawResponse(responseText);

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
            return;
          }
          if (response.status === 403) {
            throw new Error('Unauthorized access');
          }
          if (response.status === 404) {
            throw new Error('Chat not found');
          }
          throw new Error(`HTTP error ${response.status}: ${responseText || 'No response body'}`);
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (jsonErr) {
          throw new Error(`JSON parsing failed: ${jsonErr.message}`);
        }

        setChat(data);
        setNewTitle(data.title || '');
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchChatDetail();
  }, [id]);

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
        body: JSON.stringify({ title: newTitle }),
      });

      const responseText = await response.text();
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        if (response.status === 403) {
          throw new Error('Unauthorized access');
        }
        if (response.status === 404) {
          throw new Error('Chat not found');
        }
        throw new Error(`HTTP error ${response.status}: ${responseText || 'No response body'}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`JSON parsing failed: ${jsonErr.message}`);
      }

      setChat({ ...chat, title: data.title });
      setSuccessMessage(data.message);
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Update title error:', err);
    }
  };

  const handleDeleteChat = async () => {
    if (!window.confirm('Are you sure you want to delete this chat?')) {
      return;
    }

    try {
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
      });

      const responseText = await response.text();
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        if (response.status === 403) {
          throw new Error('Unauthorized access');
        }
        if (response.status === 404) {
          throw new Error('Chat not found');
        }
        throw new Error(`HTTP error ${response.status}: ${responseText || 'No response body'}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error(`JSON parsing failed: ${jsonErr.message}`);
      }

      setSuccessMessage(data.message);
      setError(null);
      setTimeout(() => navigate('/history'), 1000);
    } catch (err) {
      setError(err.message);
      console.error('Delete chat error:', err);
    }
  };

  if (error && !chat) {
    return (
      <StyledWrapper>
        <div className="container">
          <div className="detail-card">
            <div className="error-message">
              Error: {error}
              {rawResponse && (
                <pre className="raw-response">
                  Raw response: {rawResponse}
                </pre>
              )}
            </div>
          </div>
        </div>
      </StyledWrapper>
    );
  }

  if (!chat) {
    return (
      <StyledWrapper>
        <div className="container">
          <div className="detail-card">
            <div className="loading">Loading...</div>
          </div>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="container">
        <div className="detail-card">
          <div className="card-header">
            <h2>Edit Chat Details</h2>
            <p>Modify the title or delete this conversation</p>
          </div>

          <div className="chat-details">
            <h3 className="chat-title">
              Current Title: {chat.title || 'No Title'}
            </h3>
            <p className="chat-content">
              <strong>Your Query:</strong> {chat.user_input || 'No query'}
            </p>
            <p className="chat-content">
              <strong>Bot Response:</strong>{' '}
              <span
                className="bot-response"
                dangerouslySetInnerHTML={{ __html: chat.bot_response || '' }}
              />
            </p>
            <p className="chat-content">
              <strong>Time:</strong>{' '}
              {chat.timestamp
                ? new Date(chat.timestamp).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                : 'Unknown'}
            </p>
          </div>

          <div className="input-group">
            <label htmlFor="title" className="input-label">
              Enter New Title:
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="title"
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new title"
                className="title-input"
              />
              <span className="input-icon">✏️</span>
            </div>
            <button onClick={handleUpdateTitle} className="save-button">
              Save Title
            </button>
          </div>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
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

          <div className="action-group">
            <button
              onClick={() => navigate('/history')}
              className="back-button"
            >
              Back to Chat
            </button>
            <button
              onClick={handleDeleteChat}
              className="delete-button"
            >
              Delete
            </button>
          </div>

          <div className="card-footer">
            <a href="/history" className="footer-link">
              Return to Chat History
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

  .detail-card {
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
      color: #80b918; /* Changed to green to match theme */
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

  .chat-details {
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    background: #ffffff;

    .chat-title {
      color: #2c3e50;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .chat-content {
      color: #7f8c8d;
      font-size: 15px;
      margin-bottom: 12px;
      line-height: 1.5;

      strong {
        color: #2c3e50;
      }

      .bot-response {
        color: #7f8c8d;
      }
    }
  }

  .input-group {
    position: relative;
    margin-bottom: 32px;

    .input-label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-size: 15px;
      font-weight: 600;
    }

    .input-wrapper {
      position: relative;
    }

    .title-input {
      width: 100%;
      padding: 15px 15px 15px 45px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 15px;
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

    .save-button {
      width: auto;
      padding: 12px 24px;
      background: #80b918;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 12px;

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

  .success-message {
    color: #27ae60;
    margin-bottom: 32px;
    font-size: 15px;
    text-align: center;
    background: #f0fdf4;
    padding: 12px;
    border-radius: 8px;
  }

  .error-message {
    color: #c0392b;
    margin-bottom: 32px;
    font-size: 15px;
    text-align: center;
    background: #fef2f2;
    padding: 12px;
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

  .action-group {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;

    .back-button, .delete-button {
      padding: 12px 24px;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .back-button {
      background: #80b918;
      color: white;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(128, 185, 24, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .delete-button {
      background: #c0392b;
      color: white;

      &:hover {
        background: #a52921;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(192, 57, 43, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
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

  .loading {
    text-align: center;
    color: #7f8c8d;
    font-size: 16px;
    padding: 24px;
    background: #f8f9fa;
    border-radius: 12px;
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
    .detail-card {
      padding: 32px 16px;
      margin: 24px;
    }

    .decorative-elements {
      display: none;
    }

    .action-group {
      flex-direction: column;
      gap: 12px;

      .back-button, .delete-button {
        width: 100%;
        text-align: center;
      }
    }

    .input-group {
      .save-button {
        width: 100%;
      }
    }
  }
`;

export default ChatDetail;