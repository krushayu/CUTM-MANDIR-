import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { GiPrayer, GiCandleLight } from "react-icons/gi"; 
import "./Login.css";

export default function Login({ onAuthChange }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      if (onAuthChange) onAuthChange();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mandir-login-container">
      <div className="login-arch-card">

        {/* Header Section */}
        <div className="login-header">
          <div className="om-icon"><img src="https://img.icons8.com/?size=100&id=Fiu0gI5wAoLI&format=png&color=000000" alt="Om Icon"style={{ width: "60px", filter: "invert(84%) sepia(44%) saturate(828%) hue-rotate(4deg)" }} /></div> 
          <h2 className="mandir-title">श्री विद्या वेंकटेश्वर स्वामी मंदिर</h2>
        </div>
        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <GiPrayer className="input-icon" />
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mandir-input"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <GiCandleLight className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mandir-input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Submit"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="signup-link">
          New Register? <Link to="/register">Click Here</Link>
        </div>

      </div>
    </div>
  );
}