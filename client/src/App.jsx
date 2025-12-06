import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Mantras from "./pages/Mantras";
import Seva from "./pages/Seva";
import Darshan from "./pages/Darshan";
import Donation from "./pages/Donation";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Footer from "./components/footer";
import BrahmotsavaPage from "./pages/Brahmotsava" 
import './i18n/i18n';
import EventsPage from "./pages/EventsPage";
import TempleGallery from "./pages/TempleGallery";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthChange = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  return (
    <Router>
      <Layout>
        <Navbar onAuthChange={handleAuthChange} />

        <main className="main-content">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login onAuthChange={handleAuthChange} />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register onAuthChange={handleAuthChange} />
                </PublicRoute>
              } 
            />

            <Route path="/mantras" element={<Mantras />} />
            <Route path="/darshan" element={<Darshan />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/upcoming-events" element={<EventsPage />} />
            <Route path="/templegallery" element={<TempleGallery />} />
            <Route
              path="/seva"
              element={
                <ProtectedRoute>
                  <Seva />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/brahmotsava" element={<ProtectedRoute><BrahmotsavaPage /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </Layout>
    </Router>
  );
}
