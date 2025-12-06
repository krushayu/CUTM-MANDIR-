import { Link } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Heart, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link to="/mantras">
              <BookOpen size={16} />
              <span>Mantras</span>
            </Link>
            <Link to="/upcoming-events">
              <Calendar size={16} />
              <span>Events</span>
            </Link>
            <Link to="/seva">
              <Heart size={16} />
              <span>Seva Booking</span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={16} />
              <span>CUTM Campus, Paralakhemundi, Odisha 761200</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@venkatswamitemple.org</span>
            </div>
          </div>
        </div>

        {/* Temple Timings */}
        <div className="footer-section">
          <h4>Temple Timings</h4>
          <div className="timings">
            <div className="timing">
              <span>Morning:</span>
              <span>5:00 AM - 12:00 PM</span>
            </div>
            <div className="timing">
              <span>Evening:</span>
              <span>4:00 PM - 9:00 PM</span>
            </div>
            <div className="timing">
              <span>Special Days:</span>
              <span>Open 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link">
              <Youtube size={20} />
            </a>
          </div>
          
          <div className="newsletter">
            <p>Subscribe for updates</p>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {currentYear} श्री वेंकटस्वामी मंदिर, CUTM Paralakhemundi. 
          All rights reserved.
        </p>
        <p className="prayer">ॐ शान्तिः शान्तिः शान्तिः</p>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(135deg, #1A0F0A 0%, #8B4513 100%);
          color: #FFFFFF;
          padding: 2rem 1rem;
          position: relative;
          z-index: 100;
          width: 100%;
          margin-top: auto;
        }

        .footer::before {
          content: '🛕';
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 3rem;
          opacity: 0.1;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-section h4 {
          color: #FFD700;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #FFD700;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #FFFFFF;
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0.9;
        }

        .footer-links a:hover {
          color: #FFD700;
          transform: translateX(5px);
          opacity: 1;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          opacity: 0.9;
        }

        .contact-item svg {
          color: #FFD700;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .timings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .timing {
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #FFD700;
          color: #8B4513;
          transform: translateY(-3px);
        }

        .newsletter p {
          margin-bottom: 0.75rem;
          opacity: 0.9;
        }

        .newsletter-input {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input input {
          flex: 1;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .newsletter-input input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input button {
          padding: 0.5rem 1rem;
          background: #FFD700;
          color: #8B4513;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-input button:hover {
          background: white;
          transform: scale(1.05);
        }

        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          text-align: center;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .prayer {
          margin-top: 0.5rem;
          font-size: 1.2rem;
          color: #FFD700;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .footer {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}