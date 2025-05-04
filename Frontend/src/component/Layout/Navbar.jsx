import React, { useState, useEffect } from "react";
import { FaRobot, FaUser, FaSignInAlt, FaUserPlus, FaTimes, FaCheck, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication status and handle resize
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      setAuthenticated(!!token);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false); // Automatically close menu on larger screens
      }
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthenticated(false);
    setShowLogoutModal(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <StyledNav>
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
          </Link>
          <h1 className="brand-title">Breathe Safe</h1>
        </div>

        {/* Navigation Links (Centered on Desktop) */}
        <ul className="nav-links">
          <li>
            <Link to="/chatbot" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <FaRobot /> ChatBot
            </Link>
          </li>
          <li>
            <Link to="/map" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Map
            </Link>
          </li>
          <li>
            <Link to="/RankingTable" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Ranking
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Auth Links (Right side on Desktop, End of Mobile Menu) */}
        <div className="auth-links">
          {isAuthenticated ? (
            <>
              <Link to="/userprofile" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <FaUser /> Profile
              </Link>
              <button onClick={openLogoutModal} className="nav-link logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <FaSignInAlt /> Login
              </Link>
              <Link to="/signup" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <FaUserPlus /> Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle (at the end on smaller screens) */}
        <button className={`mobile-menu-toggle ${isMobileMenuOpen ? "open" : ""}`} onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="mobile-nav-links">
            <li>
              <Link to="/chatbot" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <FaRobot /> ChatBot
              </Link>
            </li>
            <li>
              <Link to="/map" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Map
              </Link>
            </li>
            <li>
              <Link to="/RankingTable" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Ranking
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="mobile-auth-links">
            {isAuthenticated ? (
              <>
                <Link to="/userprofile" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUser /> Profile
                </Link>
                <button onClick={openLogoutModal} className="nav-link logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/signup" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUserPlus /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </StyledNav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <ModalOverlay>
          <LogoutModal>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button onClick={closeLogoutModal} className="cancel-btn">
                <FaTimes /> Cancel
              </button>
              <button onClick={handleLogout} className="confirm-btn">
                <FaCheck /> Logout
              </button>
            </div>
          </LogoutModal>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled components
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #1f4037, #99f2c8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: "Roboto", sans-serif;
  position: relative;
  z-index: 1000;
  min-height: 70px; /* Increased minimum height for wider appearance */

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .brand-title {
    font-size: 1.5rem;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    margin: 0;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center; /* Center navigation links on desktop */

    @media (max-width: 768px) {
      display: none;
    }
  }

  .auth-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s;

    &.open {
      transform: rotate(90deg);
    }

    @media (max-width: 768px) {
      display: block;
    }
  }

  .mobile-menu {
    display: none;

    &.open {
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: linear-gradient(45deg, #1f4037, #99f2c8);
      padding: 1rem;
      z-index: 1001;
      text-align: center;
    }
  }

  .mobile-nav-links {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;

    li {
      margin-bottom: 0.5rem;
    }
  }

  .mobile-auth-links {
    margin-top: 1rem;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 1.1rem;
    transition: transform 0.3s, color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    &:hover {
      color: #99f2c8;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0.3rem;
      justify-content: center; /* Ensure links are centered on mobile */
    }
  }

  .logout {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    font-family: "Roboto", sans-serif;
    padding: 0.5rem;
    color: #fff;

    &:hover {
      color: #ff6b6b;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0.3rem;
      justify-content: center; /* Ensure logout button is centered on mobile */
    }
  }

  @media (max-width: 768px) {
    padding: 1rem; /* Increased padding for wider appearance on mobile */
    min-height: 60px; /* Adjusted minimum height for mobile */
    flex-wrap: wrap;

    .logo {
      flex: 1;
      margin-bottom: 0.5rem;
    }

    .brand-title {
      font-size: 1.2rem;
    }

    .logo-img {
      height: 40px;
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem; /* Adjusted padding for very small screens */
    min-height: 50px; /* Adjusted minimum height for very small screens */

    .brand-title {
      font-size: 1rem;
    }

    .logo-img {
      height: 35px;
      width: 35px;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const LogoutModal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;

  h3 {
    margin-top: 0;
    color: #1f4037;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 2rem;
    color: #555;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  button {
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .cancel-btn {
    background: #f1f1f1;
    color: #333;

    &:hover {
      background: #e0e0e0;
    }
  }

  .confirm-btn {
    background: #ff6b6b;
    color: white;

    &:hover {
      background: #e05555;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 80%;
    max-width: 300px;

    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }
  }
`;

export default Navbar;