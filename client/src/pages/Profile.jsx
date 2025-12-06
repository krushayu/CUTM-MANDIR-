import { useEffect, useState } from "react";
import { User, Calendar, Phone, MapPin, Star, Edit3, Save, X, Award, Eye, Heart, Clock, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    gender: "",
    dob: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    mobileNumber: "",
    location: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const devoteeStats = {
    visits: 47,
    sevas: 12,
    events: 8,
    mantras: 25
  };

  const recentActivities = [
    { type: "seva", title: "Abhishekam Seva", date: "2 days ago", icon: "🪔" },
    { type: "event", title: "Bhajan Sandhya", date: "1 week ago", icon: "🎵" },
    { type: "mantra", title: "Gayatri Mantra", date: "2 weeks ago", icon: "📿" }
  ];

  const [donations, setDonations] = useState([]);
  const [showAllDonations, setShowAllDonations] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch user profile from backend
  useEffect(() => {
    fetchProfile();
    fetchDonations();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching donations with token:', token ? 'Present' : 'Missing');
      
      const response = await fetch('http://localhost:5000/api/donations/user/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Donation response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Donation data received:', data);
        setDonations(data.donations || []);
      } else {
        console.log('Donation fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      
      if (response.ok) {
        setMessage("Profile updated successfully! 🎉");
        setIsEditing(false);
      } else {
        setMessage("Error updating profile");
      }
    } catch (err) {
      setMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const formatMemberSince = (dateString) => {
  if (!dateString) return "NA";
  
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  return `${month} ${year}`;
  };
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="header-background">
          <div className="floating-elements">
            <span className="float-element">ॐ</span>
            <span className="float-element">🪷</span>
            <span className="float-element">📿</span>
            
          </div>
        </div>
        
        <div className="header-content">
          <div className="avatar-section">
            <div className="avatar">🙏</div>
            <div className="avatar-info">
              <h1>{profile.fullName || "Devotee"}</h1>
              <p className="email">{profile.email}</p>
              <div className="member-badge">
                <Award size={16} />
                <span>Member since {formatMemberSince(profile.createdAt)}</span>
              </div>
            </div>
          </div>

          <button 
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X size={18} /> : <Edit3 size={18} />}
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
          <span>Complete your Profile.. to click Edit Profile</span>
        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Main Profile Section */}
        <div className="profile-section">
          {!isEditing ? (
            // View Mode
            <>
              <div className="section-header">
                <User size={24} />
                <h3>Personal Information</h3>
              </div>
              
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <User size={18} />
                    Full Name
                  </div>
                  <div className="info-value">{profile.fullName || "Not provided"}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <Calendar size={18} />
                    Date of Birth
                  </div>
                  <div className="info-value">
                    {profile.dob ? new Date(profile.dob).toLocaleDateString() : "Not provided"}
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <User size={18} />
                    Gender
                  </div>
                  <div className="info-value">{profile.gender || "Not provided"}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <Phone size={18} />
                    Mobile Number
                  </div>
                  <div className="info-value">{profile.mobileNumber || "Not provided"}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={18} />
                    Location
                  </div>
                  <div className="info-value">{profile.location || "Not provided"}</div>
                </div>
              </div>

              {/* Astrological Information */}
              <div className="section-header">
                <Star size={24} />
                <h3>Astrological Details</h3>
              </div>
              
              <div className="astro-grid">
                <div className="astro-card">
                  <div className="astro-icon">🌟</div>
                  <div className="astro-content">
                    <h4>Gotra</h4>
                    <p>{profile.gotra || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="astro-card">
                  <div className="astro-icon">♈</div>
                  <div className="astro-content">
                    <h4>Rashi</h4>
                    <p>{profile.rashi || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="astro-card">
                  <div className="astro-icon">⭐</div>
                  <div className="astro-content">
                    <h4>Nakshatra</h4>
                    <p>{profile.nakshatra || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Edit Mode
            <>
              <div className="section-header">
                <Edit3 size={24} />
                <h3>Edit Profile</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <User className="form-icon" size={18} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <Calendar className="form-icon" size={18} />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob ? profile.dob.split("T")[0] : ""}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <User className="form-icon" size={18} />
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <Phone className="form-icon" size={18} />
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={profile.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <MapPin className="form-icon" size={18} />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <Star className="form-icon" size={18} />
                      Gotra
                    </label>
                    <input
                      type="text"
                      name="gotra"
                      value={profile.gotra}
                      onChange={handleChange}
                      placeholder="Your Gotra"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <Star className="form-icon" size={18} />
                      Rashi
                    </label>
                    <input
                      type="text"
                      name="rashi"
                      value={profile.rashi}
                      onChange={handleChange}
                      placeholder="Your Rashi"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <Star className="form-icon" size={18} />
                      Nakshatra
                    </label>
                    <input
                      type="text"
                      name="nakshatra"
                      value={profile.nakshatra}
                      onChange={handleChange}
                      placeholder="Your Nakshatra"
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={loading}
                  >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar-section">
          {/* Donation History */}
          <div className="donation-history">
            <h3>🙏 Donation History</h3>
            {donations.length > 0 ? (
              <div className="donation-list">
                {donations.slice(0, 2).map((donation) => (
                  <div key={donation.donationId} className="donation-item" onClick={() => setSelectedDonation(donation)}>
                    <div className="donation-info">
                      <div className="donation-amount">₹{donation.amount}</div>
                      <div className="donation-purpose">{donation.purpose}</div>
                      <div className="donation-date">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`donation-status ${donation.status}`}>
                      {donation.status === 'pending' && '⏳'}
                      {donation.status === 'verified' && '✅'}
                      {donation.status === 'rejected' && '❌'}
                    </div>
                  </div>
                ))}
                {donations.length > 2 && (
                  <button className="view-more-btn" onClick={() => setShowAllDonations(true)}>
                    View More ({donations.length - 2} more)
                  </button>
                )}
              </div>
            ) : (
              <p className="no-donations">No donations yet. <a href="/donation">Make your first donation</a></p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="action-btn" onClick={() => window.location.href = '/donation'}>
              <span>💰 Make Donation</span>
              <span>→</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/seva'}>
              <span>🪔 Book Seva</span>
              <span>→</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/upcoming-events'}>
              <span>🎭 View Events</span>
              <span>→</span>
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/mantras'}>
              <span>📿 Learn Mantras</span>
              <span>→</span>
            </button>
            <button className="action-btn logout-btn" onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}>
              <span><LogOut size={18} /> Logout</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* All Donations Modal */}
      {showAllDonations && (
        <div className="modal-overlay" onClick={() => setShowAllDonations(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 All Donations</h3>
              <button className="close-btn" onClick={() => setShowAllDonations(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="all-donations-list">
                {donations.map((donation) => (
                  <div key={donation.donationId} className="donation-item-modal" onClick={() => {
                    setSelectedDonation(donation);
                    setShowAllDonations(false);
                  }}>
                    <div className="donation-info">
                      <div className="donation-amount">₹{donation.amount}</div>
                      <div className="donation-purpose">{donation.purpose}</div>
                      <div className="donation-date">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </div>
                      <div className="donation-id">ID: {donation.donationId}</div>
                    </div>
                    <div className={`donation-status ${donation.status}`}>
                      {donation.status === 'pending' && '⏳'}
                      {donation.status === 'verified' && '✅'}
                      {donation.status === 'rejected' && '❌'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="modal-overlay" onClick={() => setSelectedDonation(null)}>
          <div className="modal-content donation-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📝 Donation Details</h3>
              <button className="close-btn" onClick={() => setSelectedDonation(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="donation-details">
                <div className="detail-row">
                  <span className="detail-label">Donation ID:</span>
                  <span className="detail-value">{selectedDonation.donationId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value amount-highlight">₹{selectedDonation.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Purpose:</span>
                  <span className="detail-value">{selectedDonation.purpose}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-${selectedDonation.status}`}>
                    {selectedDonation.status === 'pending' && '⏳ Pending Verification'}
                    {selectedDonation.status === 'verified' && '✅ Verified'}
                    {selectedDonation.status === 'rejected' && '❌ Rejected'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{new Date(selectedDonation.createdAt).toLocaleString()}</span>
                </div>
                {selectedDonation.receiptNumber && (
                  <div className="detail-row">
                    <span className="detail-label">Receipt Number:</span>
                    <span className="detail-value">{selectedDonation.receiptNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%);
          min-height: 100vh;
        }

        /* Profile Header */
        .profile-header {
          position: relative;
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin-bottom: 2rem;
          overflow: hidden;
          color: white;
        }

        .header-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .float-element {
          position: absolute;
          font-size: 4rem;
          color: rgba(255, 215, 0, 0.2);
          animation: float 8s ease-in-out infinite;
        }

        .float-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .float-element:nth-child(2) { top: 60%; right: 15%; animation-delay: 2s; }
        .float-element:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 4s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }

        .header-content {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          border: 4px solid white;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .avatar-info h1 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          font-weight: bold;
        }

        .email {
          margin: 0 0 1rem 0;
          opacity: 0.9;
        }

        .member-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .edit-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .message {
          padding: 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          font-weight: 500;
        }

        .message.success {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #BBF7D0;
        }

        .message.error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #FECACA;
        }

        /* Profile Content Layout */
        .profile-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .profile-content {
            grid-template-columns: 1fr;
          }
        }

        /* Profile Sections */
        .profile-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: #8B4513;
        }

        .section-header h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        /* View Mode - Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-item {
          padding: 1.5rem;
          background: #FFF8F0;
          border-radius: 12px;
          border: 1px solid #F5E6D3;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #D2691E;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .info-value {
          color: #1E293B;
          font-size: 1.1rem;
          font-weight: 600;
        }

        /* Astrological Cards */
        .astro-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .astro-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%);
          border-radius: 12px;
          border: 1px solid rgba(212, 105, 30, 0.2);
        }

        .astro-icon {
          font-size: 2rem;
        }

        .astro-content h4 {
          margin: 0 0 0.25rem;
          color: #8B4513;
          font-size: 1rem;
        }

        .astro-content p {
          margin: 0;
          color: #1E293B;
          font-weight: 600;
        }

        /* Edit Form */
        .edit-form {
          margin-top: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #8B4513;
          font-weight: 500;
        }

        .form-icon {
          font-size: 1.2rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.875rem 1rem;
          border: 2px solid #F5E6D3;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #D2691E;
          box-shadow: 0 0 0 3px rgba(212, 105, 30, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #F5E6D3;
        }

        .cancel-btn,
        .save-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
        }

        .cancel-btn {
          background: #F1F5F9;
          color: #64748B;
          border: 2px solid #E2E8F0;
        }

        .cancel-btn:hover {
          background: #E2E8F0;
        }

        .save-btn {
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
        }

        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Sidebar */
        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .stats-card h3 {
          color: #8B4513;
          margin: 0 0 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem 1rem;
          background: #FFF8F0;
          border-radius: 12px;
          border: 1px solid #F5E6D3;
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #8B4513;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #64748B;
          font-size: 0.875rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #FFF8F0;
          border-radius: 10px;
          border: 1px solid #F5E6D3;
        }

        .activity-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activity-title {
          font-weight: 600;
          color: #8B4513;
          margin-bottom: 0.25rem;
        }

        .activity-date {
          font-size: 0.875rem;
          color: #64748B;
        }

        .quick-actions {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .quick-actions h3 {
          color: #8B4513;
          margin: 0 0 1.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem;
          background: #FFF8F0;
          border: 2px solid #F5E6D3;
          border-radius: 12px;
          color: #1E293B;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 0.75rem;
        }

        .action-btn:hover {
          background: #F5E6D3;
          transform: translateX(5px);
        }

        .logout-btn {
          background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
          color: white;
          border-color: #DC143C;
        }

        .logout-btn:hover {
          background: linear-gradient(135deg, #8B0000 0%, #DC143C 100%);
          transform: translateX(5px);
        }

        /* Donation History */
        .donation-history {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }

        .donation-history h3 {
          color: #8B4513;
          margin: 0 0 1.5rem;
        }

        .donation-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .donation-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #FFF8F0;
          border-radius: 10px;
          border: 1px solid #F5E6D3;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .donation-item:hover {
          background: #F5E6D3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .donation-info {
          flex: 1;
        }

        .donation-amount {
          font-size: 1.2rem;
          font-weight: bold;
          color: #8B4513;
          margin-bottom: 0.25rem;
        }

        .donation-purpose {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .donation-date {
          color: #999;
          font-size: 0.8rem;
        }

        .donation-status {
          font-size: 1.5rem;
        }

        .donation-status.pending {
          color: #FFA500;
        }

        .donation-status.verified {
          color: #228B22;
        }

        .donation-status.rejected {
          color: #DC143C;
        }

        .no-donations {
          text-align: center;
          color: #666;
          font-style: italic;
        }

        .no-donations a {
          color: #8B4513;
          text-decoration: none;
          font-weight: bold;
        }

        .no-donations a:hover {
          text-decoration: underline;
        }

        .view-more-btn {
          width: 100%;
          padding: 0.8rem;
          background: #8B4513;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .view-more-btn:hover {
          background: #A0522D;
          transform: translateY(-1px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #F5E6D3;
          background: linear-gradient(135deg, #8B4513, #D2691E);
          color: white;
          border-radius: 15px 15px 0 0;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.3rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .all-donations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .donation-item-modal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #FFF8F0;
          border-radius: 10px;
          border: 1px solid #F5E6D3;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .donation-item-modal:hover {
          background: #F5E6D3;
          transform: translateX(5px);
        }

        .donation-id {
          color: #999;
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        /* Donation Details Modal */
        .donation-details-modal {
          max-width: 500px;
        }

        .donation-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          background: #FFF8F0;
          border-radius: 8px;
          border: 1px solid #F5E6D3;
        }

        .detail-label {
          font-weight: 600;
          color: #8B4513;
        }

        .detail-value {
          font-weight: 500;
          color: #333;
        }

        .status-pending {
          color: #FFA500;
        }

        .status-verified {
          color: #228B22;
        }

        .status-rejected {
          color: #DC143C;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .modal-content {
            margin: 0.5rem;
            max-height: 90vh;
          }
          
          .modal-header {
            padding: 1rem;
          }
          
          .modal-body {
            padding: 1rem;
          }
          
          .donation-item-modal {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3rem;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-header {
            padding: 1.5rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }

          .avatar-section {
            width: 100%;
          }

          .profile-section {
            padding: 1.5rem;
          }

          .info-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .avatar {
            width: 60px;
            height: 60px;
          }

          .avatar-info h1 {
            font-size: 1.5rem;
          }

          .astro-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

