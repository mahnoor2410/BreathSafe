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

          <form onSubmit={handleUpdateTitle} className="input-group">
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
            <button type="submit" className="save-button">
              Save Title
            </button>
          </form>

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

  .detail-card {
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

  .chat-details {
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 25px;

    .chat-title {
      color: #2c3e50;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .chat-content {
      color: #7f8c8d;
      font-size: 14px;
      margin-bottom: 15px;

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
    margin-bottom: 25px;

    .input-label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-size: 14px;
      font-weight: 600;
    }

    .input-wrapper {
      position: relative;
    }

    .title-input {
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

    .save-button {
      width: auto;
      padding: 15px 25px;
      background: #80b918;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;

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

  .success-message {
    color: #27ae60;
    margin-bottom: 25px;
    font-size: 14px;
    text-align: center;
  }

  .error-message {
    color: #c0392b;
    margin-bottom: 25px;
    font-size: 14px;
    text-align: center;

    .raw-response {
      background: #f8f9fa;
      padding: 10px;
      margin-top: 10px;
      font-size: 12px;
      border-radius: 5px;
      overflow-x: auto;
    }
  }

  .action-group {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    .back-button, .delete-button {
      padding: 15px 25px;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .back-button {
      background: #80b918;
      color: white;

      &:hover {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
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
        box-shadow: 0 5px 15px rgba(192, 57, 43, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
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

  .loading {
    text-align: center;
    color: #7f8c8d;
    font-size: 16px;
    padding: 20px;
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
    .detail-card {
      padding: 30px 20px;
      margin: 20px;
    }

    .decorative-elements {
      display: none;
    }

    .action-group {
      flex-direction: column;
      gap: 10px;

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