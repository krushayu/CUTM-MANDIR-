import { useEffect, useState } from "react";
import { Calendar, Volume2, Clock, BookOpen, ChevronRight } from "lucide-react";
import './Home.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [mantras, setMantras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingMantra, setPlayingMantra] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const fallbackEvents = [
        { date: "15 Jan", title: "Makar Sankranti Mahapooja", time: "6:00 AM", type: "festival", priority: "high" },
        // { date: "20 Jan", title: "Special Milk Abhishekam", time: "8:00 AM", type: "ritual", priority: "medium" },
        // { date: "25 Jan", title: "Bhajan Sandhya & Aarti", time: "6:00 PM", type: "event", priority: "low" },
        // { date: "30 Jan", title: "Full Moon Pooja", time: "7:00 PM", type: "ritual", priority: "medium" },
      ];

      const fallbackMantras = [
        {
          sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
          hindi: "ऊँ पृथ्वी, अंतरिक्ष और स्वर्ग लोक, उस प्रकाशमान सूर्य के योग्य, हम उस देवता के तेज का ध्यान करते हैं, जो हमारी बुद्धि को प्रेरित करे",
          english: "Om, the Earth, Atmosphere and Heaven realms, that adorable splendor of Savitr, we meditate upon the divine glory, may He inspire our intellect",
          meaning: "The Gayatri Mantra - For divine enlightenment and wisdom",
          category: "Morning"
        },
        {
          sanskrit: "ॐ नमो भगवते वासुदेवाय",
          hindi: "ऊँ भगवान वासुदेव को नमस्कार",
          english: "Om, obeisance to Lord Vasudeva",
          meaning: "Vishnu Mantra - For protection and prosperity",
          category: "Vishnu"
        },
        {
          sanskrit: "ॐ श्री महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि तन्नो लक्ष्मी प्रचोदयात्",
          hindi: "ऊँ श्री महालक्ष्मी को हम जानते हैं, विष्णु की पत्नी का हम ध्यान करते हैं, वह लक्ष्मी हमें प्रेरित करें",
          english: "Om, we know Mahalakshmi, we meditate upon the wife of Vishnu, may that Lakshmi inspire us",
          meaning: "Lakshmi Mantra - For wealth, prosperity and abundance",
          category: "Goddess"
        },
        {
          sanskrit: "ॐ नमः शिवाय",
          hindi: "ऊँ शिव को नमस्कार",
          english: "Om, salutations to Shiva",
          meaning: "Panchakshari Mantra - For destruction of sins and liberation",
          category: "Shiva"
        },
      ];

      setUpcomingEvents(fallbackEvents);
      setMantras(fallbackMantras);
    } catch (error) {
      console.log("Using fallback data");
    } finally {
      setLoading(false);
    }
  };

  const playMantraAudio = (mantraIndex) => {
    setPlayingMantra(playingMantra === mantraIndex ? null : mantraIndex);
  };

  const templePhotos = [
    "Poster.png",
    "img1.png",
    "img2.png",
    "img3.png",
    "bg.png",
    "Poster.png",
    "img1.png",
    "img2.png",
    "img3.png",
    "bg.png",
    "Poster.png",
    "img1.png"
  ];

  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="divine-bg-elements">
        <div className="floating-om">ॐ</div>
        <div className="floating-om">ॐ</div>
        <div className="floating-lotus">🪷</div>
        <div className="floating-lotus">🪷</div>
      </div>

      <header className="divine-header">
        <div className="header-ornament"></div>
        <div className="header-content">
          <div className="temple-name-glow">
            <h1 className="glowing-text">श्री विद्या वेंकटेश्वर स्वामी मंदिर</h1>
            <div className="divine-subtitle">
              <span className="subtitle-line"></span>
              <span className="subtitle-text">Centurion University, Paralakhemundi</span>
              <span className="subtitle-line"></span>
            </div>
          </div>
          <p className="header-tagline">Where Divinity Meets Devotion in Eternal Harmony</p>
        </div>
        <div className="header-ornament"></div>
      </header>

      <section className="divine-hero">
        <div className="hero-carousel">
          <div className="carousel-slides">
          {/* <Link to="/brahmotsava"> */}
            <div className="slide" onClick={() => navigate("/brahmotsava")}>
              <img src="Posterr.png" alt="Main Temple Entrance" className="temple-image" />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h3>Brahmotsav 2025</h3>
                  <p>December 21st-23rd</p>
                </div>
              </div>
            </div>
          {/* </Link> */}
            <div className="slide">
              <img src="img2.png" alt="Sacred Sanctum" className="temple-image" />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h3>Sacred Sanctum</h3>
                  <p>Inner sanctum with divine deity</p>
                </div>
              </div>
            </div>
            <div className="slide">
              <img src="img3.png" alt="Evening Aarti" className="temple-image" />
              <div className="slide-overlay">
                <div className="slide-content">
                  <h3>Evening Aarti</h3>
                  <p>Divine aarti ceremony</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="divine-main">
        <section className="divine-gallery">
          <div className="section-header-divine">
            <div className="section-title-divine">
              <span className="title-icon-glow">🖼️</span>
              <h2>Temple Divine Gallery</h2>
              <span className="title-underline"></span>
              <Link to="/templegallery">
                <button className="explore-gallery-btn">
                  Explore Temple Gallery
                </button>
              </Link>
            </div>
          </div>

          <div className="auto-scroll-gallery">
            <div className="gallery-row first-row">
              {[...templePhotos, ...templePhotos].map((photo, index) => (
                <div key={index} className="gallery-item">
                  <div className="item-image-container">
                    <img 
                      src={photo} 
                      alt={`Temple View ${index + 1}`}
                      className="gallery-image"
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <span className="view-number">View #{index % templePhotos.length + 1}</span>
                        {/* <span className="zoom-icon">🔍</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gallery-row second-row">
              {[...templePhotos.slice().reverse(), ...templePhotos.slice().reverse()].map((photo, index) => (
                <div key={index} className="gallery-item">
                  <div className="item-image-container">
                    <img 
                      src={photo} 
                      alt={`Temple View ${index + 1}`}
                      className="gallery-image"
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <span className="photo-count">Photo #{index + 1}</span>
                        {/* <span className="click-hint">Click to View</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="scroll-indicators">
            <div className="indicator-text">
              <span className="indicator-icon">⇢</span>
              Auto Scrolling Gallery
              <span className="indicator-icon">⇠</span>
            </div>
          </div> */}
        </section>

        <section className="divine-history">
          <div className="history-header">
            <div className="history-title">
              <span className="history-icon">📜</span>
              <h2>Temple History & Divine Significance</h2>
              <div className="history-ribbon"></div>
            </div>
          </div>

          <div className="history-content-divine">
            <div className="divine-story">
              <div className="story-intro">
                <h3>The Eternal Abode of Lord Venkateswara</h3>
                <p className="story-text">
                  Established in the sacred year of 2015 within the spiritual campus of Centurion University, 
                  Paralakhemundi, the <strong>श्री विद्या वेंकटेश्वर स्वामी मंदिर</strong> stands as a magnificent testament 
                  to divine architecture and eternal spirituality. Consecrated with Vedic rituals by renowned 
                  spiritual masters, this temple has become a beacon of peace, drawing thousands of devotees 
                  seeking divine blessings and spiritual enlightenment.
                </p>
              </div>

              <div className="divine-features-grid">
                <div className="divine-feature-card">
                  <div className="feature-icon-divine">🏛️</div>
                  <h4>Architectural Marvel</h4>
                  <p>Built in authentic Dravidian style with intricate stone carvings depicting scenes from sacred scriptures.</p>
                </div>

                <div className="divine-feature-card">
                  <div className="feature-icon-divine">🙏</div>
                  <h4>Daily Rituals</h4>
                  <p>Following ancient Vedic traditions with precision and devotion.</p>
                </div>

                <div className="divine-feature-card">
                  <div className="feature-icon-divine">🗓️</div>
                  <h4>Festivals & Events</h4>
                  <p>Celebrating divine occasions with grandeur and devotion.</p>
                </div>

                <div className="divine-feature-card">
                  <div className="feature-icon-divine">🌠</div>
                  <h4>Spiritual Activities</h4>
                  <p>Promoting spiritual growth and community service.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="divine-events">
          <div className="events-header">
            <div className="events-title">
              <Calendar size={24} />
              <h2>Events</h2>
              <div className="events-count">{upcomingEvents.length} Events</div>
            </div>
            <Link to="/upcoming-events">
              <button className="view-calendar-btn">
                <Calendar size={18} />
                View Full Calendar
              </button>
            </Link>
          </div>

          <div className="divine-events-grid">
            {loading ? (
              <div className="loading-divine">Loading divine events...</div>
            ) : (
              upcomingEvents.map((event, index) => (
                <div key={index} className={`divine-event-card priority-${event.priority}`}>
                  <div className="event-date-divine">
                    <div className="date-day">{event.date.split(' ')[0]}</div>
                    <div className="date-month">{event.date.split(' ')[1]}</div>
                    <div className="event-badge">{event.type}</div>
                  </div>
                  <div className="event-content-divine">
                    <h4>{event.title}</h4>
                    <div className="event-time-divine">
                      <Clock size={14} />
                      <span>{event.time}</span>
                      <span className="event-type">{event.type}</span>
                      <span className="event-type">All India</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

<section className="divine-mantras">
  <div className="mantras-header">
    <div className="mantras-title">
      <BookOpen size={24} />
      <h2>Sacred Mantras & Divine Chants</h2>
      <div className="mantras-count">{mantras.length} Mantras</div>
    </div>
    {!token && (
      <div className="divine-locked">
        <Volume2 size={18} />
        <span>Login to Listen Audio</span>
      </div>
    )}
  </div>

  {/* Mantra Container */}
  <div className="mantras-container-divine">
    {/* Always show preview, but full access only with token */}
    <div className="mantras-preview-section">
      {/* Preview Header */}
      <div className="preview-header">
        <h3>Divine Mantra Collection</h3>
        <div className="preview-status">
          <span className="status-dot"></span>
          {token ? "Full Access" : "Preview Mode"}
        </div>
      </div>

      {/* Mantras Grid - Always Visible */}
      <div className="divine-mantras-grid">
        {mantras.map((mantra, index) => (
          <div key={index} className="mantra-card-divine">
            <div className="mantra-header-divine">
              <div className="mantra-meta">
                <span className="mantra-number">#{index + 1}</span>
                <span className="mantra-category">{mantra.category}</span>
              </div>
              {token ? (
                <button 
                  className={`play-btn-divine ${playingMantra === index ? 'playing' : ''}`}
                  onClick={() => playMantraAudio(index)}
                >
                  <span className="play-icon">ॐ</span>
                </button>
              ) : (
                <div className="preview-lock">
                  🔒
                </div>
              )}
            </div>
            
            {/* Mantra Text - Always Visible */}
            <div className="mantra-text-divine">
              <p className="sanskrit-text">{mantra.sanskrit}</p>
              <div className="preview-translation">
                <p className="hindi-preview">{mantra.hindi.substring(0, 80)}...</p>
              </div>
            </div>
            
            {/* Full Details - Only show if logged in */}
            {token && (
              <div className="mantra-details">
                <div className="detail-section">
                  <label>Hindi Meaning:</label>
                  <p>{mantra.hindi}</p>
                </div>
                <div className="detail-section">
                  <label>English Translation:</label>
                  <p>{mantra.english}</p>
                </div>
                <div className="detail-section">
                  <label>Divine Significance:</label>
                  <p className="significance">{mantra.meaning}</p>
                </div>
              </div>
            )}
            
            {/* Login Prompt for non-logged users */}
            {!token && (
              <div className="preview-login-prompt">
                <Volume2 size={18} />
                <span>Login to see full meaning & listen audio</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        <section className="divine-quick-links">
          <div className="links-header">
            <h2>Quick Divine Access</h2>
            <p>Connect with divinity instantly</p>
          </div>
          
          <div className="divine-links-grid">
            <Link to="/online-darshan" className="divine-link">
              <div className="link-icon-divine">🖥️</div>
              <div className="link-content">
                <h4>Live Darshan</h4>
                <p>24/7 Temple Live</p>
              </div>
              <ChevronRight size={20} />
            </Link>
            
            <Link to="/seva" className="divine-link">
              <div className="link-icon-divine">🪔</div>
              <div className="link-content">
                <h4>Book Seva</h4>
                <p>Online Booking</p>
              </div>
              <ChevronRight size={20} />
            </Link>
            
            <Link to="/donation" className="divine-link">
              <div className="link-icon-divine">💰</div>
              <div className="link-content">
                <h4>Donate Online</h4>
                <p>Support Temple</p>
              </div>
              <ChevronRight size={20} />
            </Link>
            
            <Link to="/seva" className="divine-link">
              <div className="link-icon-divine">📞</div>
              <div className="link-content">
                <h4>Contact Priest</h4>
                <p>Spiritual Guidance</p>
              </div>
              <ChevronRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="divine-footer">
        <div className="footer-ornament"></div>
        <div className="footer-content">
          <div className="footer-mantra">
            <p className="footer-sanskrit">ॐ शान्तिः शान्तिः शान्तिः</p>
            <p className="footer-translation">Om Peace, Peace, Peace</p>
          </div>
          <div className="footer-logo">
            <img src="/logo.png" alt="Temple Logo" className="logo-img" />
          </div>
          <div className="footer-info">
            <p>श्री विद्या वेंकटेश्वर स्वामी मंदिर, Centurion University Campus</p>
            <p>Paralakhemundi, Odisha - 761211</p>
            <p>&copy; 2025 All Rights Reserved | Divine Blessings Always</p>
          </div>
        </div>
        <div className="footer-ornament"></div>
        <div className="credit-text">
          <p>Design and Develop By :
            <a href="https://www.linkedin.com/in/krushayu/" target="_blank" rel="noopener noreferrer">Aayush</a> & 
            <a href="https://www.linkedin.com/in/hariomsonihs/" target="_blank" rel="noopener noreferrer">Hariom</a>
          </p>
        </div>
      </footer>
    </div>
  );
}