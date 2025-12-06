import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  User, 
  LogOut, 
  Menu, 
  X,
  BookOpen,
  Calendar,
  Bell,
  Heart
} from "lucide-react";

export default function Navbar({ onAuthChange }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
    };
    
    checkToken();
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    if (onAuthChange) onAuthChange();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navItems = [
    { 
      name: t('nav.home'), 
      path: "/", 
      icon: <Home size={20} />,
      badge: null 
    },
    { 
      name: "Mantras", 
      path: "/mantras", 
      icon: <BookOpen size={20} />,
      badge: null 
    },
    { 
      name: "Events", 
      path: "/upcoming-events", 
      icon: <Calendar size={20} />,
      badge: null 
    },
    { 
      name: "Seva", 
      path: "/seva", 
      icon: <Heart size={20} />,
      badge: null 
    },
    { 
      name: "Donation", 
      path: "/donation", 
      icon: <img 
        src="https://img.icons8.com/?size=100&id=tP1xC1vTi1zV&format=png&color=000000" 
        alt="donation" 
        style={{ width: "20px", height: "20px", objectFit: "contain" }} 
      />,
      badge: null 
    },
    // Profile only shows when logged in
    ...(token ? [{ 
      name: "Profile", 
      path: "/profile", 
      icon: <User size={20} />,
      badge: null 
    }] : []),
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        {/* Top Decorative Border */}
        <div className="nav-top-border"></div>
        
        <div className="nav-container">
          {/* Left: Logo */}
          <div className="nav-logo">
            <div className="logo-icon">
              <div className="icon-circle">
                <img 
                  src="/image.png" 
                  alt="temple" 
                  className="temple-icon"
                />
                <div className="icon-glow"></div>
              </div>
              <div className="logo-text">
                <h1>श्री विद्या वेंकटेश्वर स्वामी मंदिर</h1>
                <p className="subtitle">Centurion University, Paralakhemundi</p>
              </div>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="nav-center">
            <div className="nav-links">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path}
                  className={`nav-link ${window.location.pathname === item.path ? 'active' : ''}`}
                >
                  <div className="link-icon">
                    {item.icon}
                  </div>
                  <span className="link-text">{item.name}</span>
                  <div className="link-underline"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Login/Profile Button */}
          <div className="nav-right">
            {!token ? (
              <Link to="/login" className="login-btn-desktop">
                <User size={18} />
                <span>Login</span>
              </Link>
            ) : null}
            
            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <img
                  src="https://img.icons8.com/?size=100&id=LPdxnDK2Fzn4&format=png&color=000000"
                  alt="menu"
                  style={{ width: "24px", height: "24px" }}
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Logout button ONLY in mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <div className="logo-icon">
                <img 
                  src="/image.png" 
                  alt="temple" 
                  className="temple-icon"
                />
              </div>
              <div className="logo-text">
                <h2>श्री विद्या वेंकटेश्वर स्वामी मंदिर</h2>
                <p>CUTM, Paralakhemundi</p>
              </div>
            </div>
            <button 
              className="close-menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mobile-menu-items">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="mobile-item-icon">
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="mobile-menu-divider"></div>
            
            {/* Logout button - ONLY in mobile menu */}
            {token && (
              <button onClick={handleLogout} className="mobile-logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
            
            {!token && (
              <Link to="/login" className="mobile-login-btn">
                <User size={20} />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {navItems.slice(0, 5).map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`bottom-nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="bottom-nav-icon">
              {item.icon}
            </div>
            <span className="bottom-nav-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <style jsx>{`
        /* Base Variables */
        :root {
          --primary-color: #8B4513;
          --primary-dark: #5D2906;
          --primary-light: #D2691E;
          --secondary-color: #FFD700;
          --secondary-dark: #B8860B;
          --bg-light: #FFF8F0;
          --bg-white: #FFFFFF;
          --text-dark: #2D3748;
          --text-light: #718096;
          --border-color: #E2E8F0;
          --shadow-light: 0 4px 20px rgba(139, 69, 19, 0.1);
          --shadow-medium: 0 8px 30px rgba(139, 69, 19, 0.15);
          --shadow-heavy: 0 15px 40px rgba(139, 69, 19, 0.2);
        }

        /* Main Navbar */
        .navbar {
          background: linear-gradient(135deg, #FFF8F0 0%, #FFFAF5 100%);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: var(--shadow-light);
          backdrop-filter: blur(10px);
        }

        .nav-top-border {
          height: 3px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--primary-color) 20%, 
            var(--secondary-color) 50%, 
            var(--primary-color) 80%, 
            transparent 100%
          );
          width: 100%;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        /* Logo Section */
        .nav-logo {
          flex-shrink: 0;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-circle {
          position: relative;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-medium);
        }

        .icon-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, 
            rgba(255, 215, 0, 0.3) 0%, 
            transparent 70%
          );
          border-radius: 12px;
          pointer-events: none;
        }

        .temple-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: brightness(1.2);
        }

        .logo-text h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-dark);
          margin: 0;
          line-height: 1.2;
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 0.75rem;
          color: var(--text-light);
          margin: 0;
          font-weight: 500;
        }

        /* Center Navigation */
        .nav-center {
          flex: 1;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
        }

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 1.25rem;
          color: var(--text-light);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          min-width: 80px;
        }

        .nav-link:hover {
          color: var(--primary-color);
          background: rgba(139, 69, 19, 0.05);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: var(--primary-color);
          background: rgba(255, 215, 0, 0.1);
        }

        .link-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .link-text {
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .link-underline {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .nav-link.active .link-underline {
          width: 60%;
        }

        /* Desktop Login/Profile Buttons */
        .login-btn-desktop, .profile-btn-desktop {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: white;
          border: none;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 100px;
          justify-content: center;
        }

        .login-btn-desktop:hover, .profile-btn-desktop:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .logout-nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-white);
          color: var(--text-dark);
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          background: var(--bg-white);
          z-index: 2000;
          transform: translateX(0);
          animation: slideIn 0.3s ease;
          box-shadow: var(--shadow-heavy);
          overflow-y: auto;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-menu-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-logo h2 {
          font-size: 1rem;
          color: var(--primary-dark);
          margin: 0 0 0.25rem 0;
        }

        .mobile-logo p {
          font-size: 0.75rem;
          color: var(--text-light);
          margin: 0;
        }

        .close-menu {
          background: none;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .close-menu:hover {
          background: var(--border-color);
        }

        .mobile-menu-items {
          padding: 1rem 0;
        }

        .mobile-menu-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: var(--text-dark);
          text-decoration: none;
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-menu-item:last-child {
          border-bottom: none;
        }

        .mobile-menu-item:hover {
          background: rgba(139, 69, 19, 0.05);
          color: var(--primary-color);
        }

        .mobile-item-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
        }

        .mobile-menu-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1rem 1.5rem;
        }

        .mobile-logout-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          width: 100%;
          border: none;
          cursor: pointer;
          text-decoration: none;
          font-size: 1rem;
          color: #EF4444;
          background: none;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-logout-btn:hover {
          background: rgba(239, 68, 68, 0.05);
        }

        .mobile-login-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          width: 100%;
          border: none;
          cursor: pointer;
          text-decoration: none;
          font-size: 1rem;
          color: var(--primary-color);
          background: none;
          font-weight: 600;
        }

        .mobile-login-btn:hover {
          background: rgba(139, 69, 19, 0.05);
        }

        /* Mobile Bottom Navigation */
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-white);
          border-top: 1px solid var(--border-color);
          display: none;
          padding: 0.5rem;
          z-index: 999;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        .bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.25rem;
          color: var(--text-light);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .bottom-nav-item.active {
          color: var(--primary-color);
          background: rgba(255, 215, 0, 0.1);
        }

        .bottom-nav-item:hover {
          color: var(--primary-color);
        }

        .bottom-nav-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bottom-nav-text {
          font-size: 0.625rem;
          font-weight: 600;
          white-space: nowrap;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .nav-container {
            padding: 0.5rem 1rem;
            gap: 1rem;
          }
          
          .logo-text h1 {
            font-size: 1.1rem;
          }
          
          .nav-link {
            padding: 0.75rem 1rem;
            min-width: 70px;
          }
        }

        @media (max-width: 992px) {
          .logo-text h1 {
            display: none;
          }
          
          .nav-links {
            gap: 0.125rem;
          }
          
          .nav-link {
            padding: 0.75rem 0.875rem;
          }
          
          .link-text {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 768px) {
          .nav-center {
            display: none;
          }
          
          .nav-right {
            gap: 0.5rem;
          }
          
          .login-btn-desktop, .profile-btn-desktop {
            display: none;
          }
          
          .mobile-toggle {
            display: flex;
          }
          
          .mobile-bottom-nav {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.5rem;
          }
          
          .icon-circle {
            width: 40px;
            height: 40px;
          }
          
          .temple-icon {
            width: 24px;
            height: 24px;
          }
          
          .subtitle {
            font-size: 0.625rem;
          }
          
          .mobile-menu {
            width: 280px;
          }
        }
      `}</style>
    </>
  );
}