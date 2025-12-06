import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { 
  GiPrayer, 
  GiCandleLight, 
  GiTempleGate, 
  GiLotus,
  GiStoneTablet,
  GiScrollQuill,
  GiAncientColumns
} from "react-icons/gi";
import { FaOm, FaUserAlt, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Register({ onAuthChange }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    role: "devotee"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Check your password!");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/auth/register", { 
        email: formData.email, 
        password: formData.password,
        role: formData.role,
        fullName: formData.fullName,
        phone: formData.phone
      });
      
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      if (onAuthChange) onAuthChange();
      
      setSuccess("Registration Successfull..");
      
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed! Try Again..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mandir-register-page">
      {/* Main Register Card */}
      <div className="mandir-register-card">
        {/* Temple Arch Header */}
        <div className="mandir-arch-header">
          <div className="mandir-title-section">
            <h1 className="hindi-title">श्री विद्या वेंकटेश्वर स्वामी मंदिर</h1>
            <p className="subtitle">Divine Registration Portal</p>
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="success-message">
            <GiLotus className="success-icon" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="error-message">
            <GiLotus className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mandir-register-form">
          <div className="form-row">
            <div className="form-group">
              <div className="input-shrine">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                  className="sacred-input"
                />
                <div className="input-border"></div>
              </div>
              <label className="input-label">Full Name</label>
            </div>

            <div className="form-group">
              <div className="input-shrine">
                <GiPrayer className="input-icon" />
                <input
                  type="email"
                  placeholder="mandir@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="sacred-input"
                />
                <div className="input-border"></div>
              </div>
              <label className="input-label">Enter Email</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="input-shrine">
                <GiCandleLight className="input-icon" />
                <input
                  type="password"
                  placeholder="* * * * * * * *"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="sacred-input"
                />
                <div className="input-border"></div>
              </div>
              <label className="input-label">Enter Password</label>
            </div>

            <div className="form-group">
              <div className="input-shrine">
                <GiCandleLight className="input-icon" />
                <input
                  type="password"
                  placeholder="* * * * * * * *"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  className="sacred-input"
                />
                <div className="input-border"></div>
              </div>
              <label className="input-label">Confirm Password</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <div className="input-shrine">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="tel"
                  placeholder="+91 920*****14"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="sacred-input"
                />
                <div className="input-border"></div>
              </div>
              <label className="input-label">Enter Contact</label>
            </div>

            <div className="form-group">
              <div className="input-shrine">
                <GiScrollQuill className="input-icon" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="sacred-select"
                >
                  <option value="devotee">🙏 Devotee (Bhakt)</option>
                </select>
                <div className="input-border"></div>
              </div>
              <label className="input-label">Role</label>
            </div>
          </div>
          <button
            type="submit"
            className={`register-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <GiTempleGate className="button-icon" />
                <span>Submit</span>
              </>
            )}
            <div className="button-glow"></div>
          </button>
        </form>

        {/* Login Link */}
        <div className="login-link-section">
          <div className="link-divider">
            <span className="divider-text">Already Register?</span>
          </div>
          <Link to="/login" className="login-button-link">
            <GiLotus className="link-icon" />
            <span>Click Here</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Temple Footer */}
        <div className="mandir-footer">
          <p className="sanskrit-mantra">सर्वे भवन्तु सुखिनः</p>
          <p className="blessing">May all beings be happy and blessed</p>
        </div>
      </div>

      <style jsx>{`
        /* ===== BASE STYLES ===== */
        .mandir-register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #FFF8E1 0%,
            #FFECB3 30%,
            #FFD54F 100%
          );
          font-family: 'Poppins', sans-serif;
        }

        /* Temple Background Elements */
        .temple-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .temple-arch-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 80px;
          background: linear-gradient(to bottom, #FF9800, #F57C00);
          border-radius: 150px 150px 0 0;
          opacity: 0.1;
        }

        .temple-arch-left,
        .temple-arch-right {
          position: absolute;
          top: 40px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #FF9800, #E65100);
          border-radius: 50%;
          opacity: 0.1;
        }

        .temple-arch-left {
          left: calc(50% - 130px);
          transform: rotate(45deg);
        }

        .temple-arch-right {
          right: calc(50% - 130px);
          transform: rotate(-45deg);
        }

        .floating-diya {
          position: absolute;
          top: 50%;
          width: 50px;
          text-align: center;
        }

        .left-diya {
          left: 10%;
        }

        .right-diya {
          right: 10%;
        }

        .diya-flame {
          width: 20px;
          height: 40px;
          margin: 0 auto 8px;
          background: radial-gradient(circle, #FFD700, #FF9800, transparent);
          border-radius: 50% 50% 20% 20%;
          animation: flicker 1.5s infinite alternate;
          filter: blur(1px);
        }

        @keyframes flicker {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .diya-base {
          font-size: 1.8rem;
          color: #FF9800;
          opacity: 0.6;
        }

        .om-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20rem;
          color: rgba(255, 152, 0, 0.03);
          font-family: 'Segoe UI', sans-serif;
          z-index: 1;
        }

        .left-pillar,
        .right-pillar {
          position: absolute;
          bottom: 50px;
          font-size: 4rem;
          color: rgba(255, 152, 0, 0.05);
        }

        .left-pillar {
          left: 5%;
        }

        .right-pillar {
          right: 5%;
        }

        /* Main Register Card */
        .mandir-register-card {
          width: 100%;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 40px 40px 20px 20px;
          padding: 40px 35px;
          position: relative;
          z-index: 2;
          border: 3px solid #FFD700;
          box-shadow: 
            0 20px 50px rgba(255, 152, 0, 0.2),
            inset 0 0 30px rgba(255, 215, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        /* Temple Arch Header */
        .mandir-arch-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .arch-decoration {
          margin-bottom: 20px;
        }

        .arch-icon {
          font-size: 3rem;
          color: #FF9800;
          filter: drop-shadow(0 4px 8px rgba(255, 152, 0, 0.3));
        }

        .mandir-title-section {
          position: relative;
        }

        .om-symbol {
          font-size: 2.5rem;
          color: #FF9800;
          margin-bottom: 10px;
          display: block;
          animation: rotateOm 10s linear infinite;
        }

        @keyframes rotateOm {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hindi-title {
          font-size: 1.8rem;
          color: #D84315;
          margin: 10px 0;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }

        .subtitle {
          color: #5D4037;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        /* Messages */
        .success-message,
        .error-message {
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .success-message {
          background: rgba(237, 247, 237, 0.8);
          border: 2px solid #C8E6C9;
          color: #2E7D32;
        }

        .error-message {
          background: rgba(255, 235, 238, 0.8);
          border: 2px solid #FFCDD2;
          color: #D32F2F;
          animation: shake 0.5s ease-in-out;
        }

        .success-icon {
          color: #2E7D32;
          font-size: 1.2rem;
        }

        .error-icon {
          color: #D32F2F;
          font-size: 1.2rem;
        }

        /* Registration Form */
        .mandir-register-form {
          margin-bottom: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        .form-group {
          position: relative;
        }

        .input-shrine {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 2px solid #FFD700;
          padding-bottom: 8px;
          transition: all 0.3s ease;
        }

        .input-shrine:focus-within {
          border-bottom-color: #FF9800;
        }

        .input-icon {
          color: #FF9800;
          font-size: 1.2rem;
          margin-right: 12px;
          opacity: 0.8;
        }

        .sacred-input,
        .sacred-select {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          color: #5D4037;
          font-family: 'Poppins', sans-serif;
          padding: 8px 0;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        .sacred-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FF9800' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 12px;
          cursor: pointer;
          padding-right: 30px;
        }

        .sacred-input::placeholder {
          color: #A1887F;
          font-style: italic;
          font-size: 0.9rem;
        }

        .input-border {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF9800, #FFD700, #FF9800);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .sacred-input:focus ~ .input-border,
        .sacred-select:focus ~ .input-border {
          transform: scaleX(1);
        }

        .input-label {
          position: absolute;
          top: -22px;
          left: 0;
          color: #FF9800;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Terms Section */
        .terms-section {
          background: rgba(255, 248, 225, 0.5);
          border: 1px solid #FFECB3;
          border-radius: 10px;
          padding: 20px;
          margin: 25px 0;
        }

        .temple-checkbox {
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          color: #5D4037;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .temple-checkbox input {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #FF9800;
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .temple-checkbox input:checked ~ .checkmark {
          background: #FF9800;
        }

        .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .temple-checkbox input:checked ~ .checkmark::after {
          opacity: 1;
        }

        .checkbox-icon {
          color: #FF9800;
          font-size: 1.1rem;
          margin-right: 5px;
        }

        .checkbox-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Register Button */
        .register-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(
            135deg,
            #FF9800 0%,
            #F57C00 100%
          );
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 10px;
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .register-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 152, 0, 0.6);
          letter-spacing: 2px;
        }

        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-button.loading {
          background: linear-gradient(
            135deg,
            rgba(255, 152, 0, 0.7) 0%,
            rgba(245, 124, 0, 0.7) 100%
          );
        }

        .button-icon {
          font-size: 1.3rem;
        }

        .button-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .button-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .register-button:hover .button-glow {
          transform: translateX(100%);
        }

        /* Login Link Section */
        .login-link-section {
          margin: 30px 0;
        }

        .link-divider {
          display: flex;
          align-items: center;
          margin: 20px 0;
          color: #A1887F;
          font-size: 0.9rem;
        }

        .divider-text {
          padding: 0 15px;
          background: white;
          position: relative;
          z-index: 1;
        }

        .link-divider::before,
        .link-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #FFD700,
            transparent
          );
        }

        .login-button-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.1),
            rgba(255, 152, 0, 0.05)
          );
          color: #D84315;
          padding: 16px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          border: 2px solid #FFD700;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.95rem;
        }

        .login-button-link:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 215, 0, 0.2),
            rgba(255, 152, 0, 0.15)
          );
          border-color: #FF9800;
          transform: translateY(-2px);
          gap: 15px;
          letter-spacing: 2px;
        }

        .link-icon {
          font-size: 1.3rem;
          color: #FF9800;
        }

        .arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .login-button-link:hover .arrow {
          transform: translateX(5px);
        }

        /* Temple Footer */
        .mandir-footer {
          text-align: center;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 215, 0, 0.3);
          margin-top: 20px;
        }

        .sanskrit-mantra {
          font-size: 1.5rem;
          color: #FF9800;
          margin-bottom: 10px;
          font-weight: bold;
          letter-spacing: 3px;
        }

        .blessing {
          color: #5D4037;
          font-size: 0.85rem;
          opacity: 0.8;
          font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .mandir-register-page {
            padding: 15px;
          }

          .mandir-register-card {
            padding: 30px 25px;
            border-radius: 30px 30px 15px 15px;
          }

          .hindi-title {
            font-size: 1.5rem;
          }

          .floating-diya {
            display: none;
          }

          .om-watermark {
            font-size: 15rem;
          }

          .left-pillar,
          .right-pillar {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .mandir-register-card {
            padding: 25px 20px;
            border-radius: 25px 25px 15px 15px;
          }

          .hindi-title {
            font-size: 1.3rem;
          }

          .om-symbol {
            font-size: 2rem;
          }

          .register-button {
            padding: 15px;
            font-size: 1rem;
          }

          .login-button-link {
            padding: 14px;
            font-size: 0.9rem;
          }

          .terms-section {
            padding: 15px;
          }

          .temple-checkbox {
            font-size: 0.85rem;
          }
        }

        /* Safe Area Support */
        @supports (padding: max(0px)) {
          .mandir-register-page {
            padding-left: max(20px, env(safe-area-inset-left));
            padding-right: max(20px, env(safe-area-inset-right));
            padding-bottom: max(20px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}