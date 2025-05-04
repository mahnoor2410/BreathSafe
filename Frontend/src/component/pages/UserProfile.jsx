import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSignOutAlt, FaSave, FaUserEdit, FaLock, FaArrowLeft } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isEditable, setIsEditable] = useState({
    username: false,
    email: false
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/userprofile', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(() => {
        alert('Please login again');
        navigate('/login');
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser(prev => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (field) => {
    setIsEditable(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save changes
    setIsEditable({ username: false, email: false });
    // Show success message
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password validation and API call here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    // Here you would typically make an API call to logout
    alert('Logged out successfully!');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <StyledWrapper>
        <div className="loading-spinner"></div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="profile-container">
        <nav className="profile-nav">
          <button onClick={() => navigate('/')} className="back-button">
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </nav>

        <div className="profile-card">
          <div className="card-header">
            <div className="avatar">
              <FaUserEdit />
            </div>
            <h1>User Profile</h1>
          </div>

          <div className="profile-form">
            {['username', 'email'].map((field) => (
              <div key={field} className={`input-group ${isEditable[field] ? 'editable' : ''}`}>
                <label htmlFor={field}>
                  {field === 'username' ? 'Username' : 'Email Address'}
                </label>
                <div className="input-wrapper">
                  <input
                    id={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={user[field] || ''}
                    onChange={handleInputChange}
                    readOnly={!isEditable[field]}
                  />
                  <button
                    onClick={() => handleEditClick(field)}
                    className={`edit-button ${isEditable[field] ? 'active' : ''}`}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                />
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="edit-button"
                >
                  <FaLock />
                </button>
              </div>
            </div>

            <div className="button-group">
              <button
                onClick={handleSaveChanges}
                className="save-button"
                disabled={!isEditable.username && !isEditable.email}
              >
                <FaSave />
                <span>Save Changes</span>
              </button>

              <button
                onClick={handleLogout}
                className="logout-button"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="password-modal">
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="input-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Styled components
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(128, 185, 24, 0.3);
    border-radius: 50%;
    border-top-color: #80b918;
    animation: ${spin} 1s ease-in-out infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .profile-container {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
  }

  .profile-nav {
    padding: 15px 0;
    margin-bottom: 20px;

    .back-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      color: #2c3e50;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 8px 12px;
      border-radius: 8px;

      &:hover {
        background: rgba(128, 185, 24, 0.1);
        color: #80b918;
      }

      svg {
        font-size: 18px;
      }
    }
  }

  .profile-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 600px;
    margin: 0 auto;
    animation: ${fadeIn} 0.6s ease-out;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.9);
  }

  .card-header {
    text-align: center;
    margin-bottom: 30px;

    .avatar {
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

    h1 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
  }

  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .input-group {
    position: relative;

    label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-size: 14px;
      font-weight: 600;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        padding: 15px 50px 15px 15px;
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

        &:read-only {
          background-color: #f1f1f1;
          color: #7f8c8d;
        }
      }

      .edit-button {
        position: absolute;
        right: 15px;
        background: none;
        border: none;
        color: #7f8c8d;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        &:hover {
          color: #80b918;
        }

        &.active {
          color: #80b918;
        }
      }
    }

    &.editable {
      .input-wrapper input {
        background-color: white;
        color: #2c3e50;
      }
    }
  }

  .button-group {
    display: flex;
    gap: 15px;
    margin-top: 30px;

    button {
      flex: 1;
      padding: 15px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      svg {
        font-size: 18px;
      }
    }

    .save-button {
      background: #80b918;
      color: white;

      &:hover:not(:disabled) {
        background: #6aa017;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(128, 185, 24, 0.4);
      }
    }

    .logout-button {
      background: #e74c3c;
      color: white;

      &:hover {
        background: #c0392b;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
      }
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: ${fadeIn} 0.3s ease-out;
  }

  .password-modal {
    background: white;
    border-radius: 20px;
    padding: 30px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

    h2 {
      color: #2c3e50;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 25px;
      text-align: center;
    }

    .input-group {
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.3s ease;

      &:focus {
        border-color: #80b918;
        box-shadow: 0 0 0 3px rgba(128, 185, 24, 0.2);
        outline: none;
      }
    }

    .modal-buttons {
      display: flex;
      gap: 15px;
      margin-top: 30px;

      button {
        flex: 1;
        padding: 15px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }

      .cancel-button {
        background: #f1f1f1;
        color: #2c3e50;

        &:hover {
          background: #e0e0e0;
        }
      }

      .submit-button {
        background: #80b918;
        color: white;

        &:hover {
          background: #6aa017;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .profile-card {
      padding: 30px 20px;
    }

    .button-group {
      flex-direction: column;
    }
  }
`;

export default UserProfile;