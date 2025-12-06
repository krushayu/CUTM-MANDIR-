import React, { useState, useEffect, useRef } from 'react';
import './TempleGallery.css';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X, ZoomIn, Heart, Share2, Download, Clock, MapPin, Info } from 'lucide-react';

const TempleGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  const [category, setCategory] = useState('all');
  
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Sample media data (replace with your actual data)
  const templeMedia = [
    {
      id: 1,
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-temple-at-sunset-41509-large.mp4',
      poster: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Golden Temple Sunset',
      description: 'Aerial view of the sacred temple during golden hour',
      duration: '2:45',
      location: 'Amritsar, India',
      category: 'sunset',
      views: '1.2M'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      title: 'Ancient Temple Architecture',
      description: 'Intricate carvings and detailed architecture',
      location: 'Khajuraho, India',
      category: 'architecture',
      likes: '45K'
    },
    {
      id: 3,
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-hindu-temple-with-painted-walls-42593-large.mp4',
      poster: 'https://images.unsplash.com/photo-1593693397692-8d5967f8b5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Temple Rituals',
      description: 'Morning prayers and traditional rituals',
      duration: '3:20',
      location: 'Varanasi, India',
      category: 'rituals',
      views: '850K'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1594736797933-d0ff6e48d5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      title: 'Temple Festival',
      description: 'Vibrant festival celebrations',
      location: 'Kerala, India',
      category: 'festival',
      likes: '78K'
    },
    {
      id: 5,
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-statue-in-a-temple-41508-large.mp4',
      poster: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Sacred Statues',
      description: 'Close-up of ancient temple statues',
      duration: '1:45',
      location: 'Mysore, India',
      category: 'statues',
      views: '520K'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      title: 'Temple Courtyard',
      description: 'Peaceful morning in temple courtyard',
      location: 'Tamil Nadu, India',
      category: 'peace',
      likes: '92K'
    },
    {
      id: 7,
      type: 'video',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-temple-at-night-41507-large.mp4',
      poster: 'https://images.unsplash.com/photo-1594576722519-15dfb49e8c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      title: 'Night Illumination',
      description: 'Temple beautifully lit at night',
      duration: '2:15',
      location: 'Jaipur, India',
      category: 'night',
      views: '1.5M'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      title: 'Temple Reflection',
      description: 'Perfect reflection in temple pond',
      location: 'Udaipur, India',
      category: 'reflection',
      likes: '120K'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Media', count: templeMedia.length },
    { id: 'video', name: 'Videos', count: templeMedia.filter(m => m.type === 'video').length },
    { id: 'image', name: 'Photos', count: templeMedia.filter(m => m.type === 'image').length },
    { id: 'sunset', name: 'Sunsets', count: 2 },
    { id: 'architecture', name: 'Architecture', count: 1 },
    { id: 'rituals', name: 'Rituals', count: 1 },
    { id: 'festival', name: 'Festivals', count: 1 }
  ];

  useEffect(() => {
    setMediaItems(templeMedia);
    
    // Auto-scroll gallery
    if (autoScroll && galleryRef.current) {
      autoScrollRef.current = setInterval(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollLeft += 1;
          if (galleryRef.current.scrollLeft >= galleryRef.current.scrollWidth - galleryRef.current.clientWidth) {
            galleryRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScroll]);

  useEffect(() => {
    // Auto-play next video when current ends
    if (videoRef.current) {
      videoRef.current.onended = () => {
        const videos = mediaItems.filter(item => item.type === 'video');
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        setCurrentVideoIndex(nextIndex);
      };
    }
  }, [currentVideoIndex, mediaItems]);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto';
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const navigateMedia = (direction) => {
    const currentIndex = mediaItems.findIndex(item => item.id === selectedMedia.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % mediaItems.length;
    } else {
      newIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
    }
    
    setSelectedMedia(mediaItems[newIndex]);
  };

  const filteredMedia = category === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => 
        category === 'video' || category === 'image' 
          ? item.type === category 
          : item.category === category
      );

  return (
    <div className="temple-gallery">
      {/* Hero Section with Auto-playing Video */}
      <div className="hero-section">
        <div className="video-overlay"></div>
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-temple-at-sunset-41509-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Sacred</span>
            <span className="title-line">Temple</span>
            <span className="title-line">Gallery</span>
          </h1>
          <p className="hero-subtitle">Experience Divine Architecture & Spiritual Beauty</p>
          
          <div className="video-controls">
            <button onClick={togglePlayPause} className="control-btn">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} className="control-btn">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <span className="live-badge">LIVE</span>
          </div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="gallery-controls">
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>
        
        <div className="gallery-settings">
          <label className="auto-scroll-toggle">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            Auto Scroll
          </label>
        </div>
      </div>

      {/* Main Gallery - Auto Scrolling */}
      <div className="gallery-container" ref={galleryRef}>
        <div className="media-grid">
          {filteredMedia.map(item => (
            <div 
              key={item.id} 
              className={`media-card ${item.type}`}
              onClick={() => handleMediaClick(item)}
            >
              <div className="media-thumbnail">
                {item.type === 'video' ? (
                  <>
                    <img src={item.poster} alt={item.title} />
                    <div className="video-overlay-indicator">
                      <Play size={24} />
                      <span className="duration">{item.duration}</span>
                    </div>
                  </>
                ) : (
                  <img src={item.src} alt={item.title} />
                )}
                
                <button 
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                >
                  <Heart 
                    size={20} 
                    fill={favorites.has(item.id) ? '#ff4757' : 'none'} 
                    color={favorites.has(item.id) ? '#ff4757' : 'white'} 
                  />
                </button>
                
                {item.type === 'video' && (
                  <div className="views-count">
                    <Play size={12} /> {item.views}
                  </div>
                )}
              </div>
              
              <div className="media-info">
                <h3 className="media-title">{item.title}</h3>
                <p className="media-description">{item.description}</p>
                
                <div className="media-meta">
                  <span className="location">
                    <MapPin size={14} /> {item.location}
                  </span>
                  {item.type === 'video' && (
                    <span className="duration-info">
                      <Clock size={14} /> {item.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">150+</div>
          <div className="stat-label">Temples</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2,500+</div>
          <div className="stat-label">Photos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">120+</div>
          <div className="stat-label">Videos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5M+</div>
          <div className="stat-label">Views</div>
        </div>
      </div>

      {/* Featured Video Carousel */}
      <div className="featured-section">
        <h2 className="section-title">Featured Videos</h2>
        <div className="video-carousel">
          {mediaItems
            .filter(item => item.type === 'video')
            .map((video, index) => (
              <div 
                key={video.id}
                className={`video-preview ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  handleMediaClick(video);
                }}
              >
                <div className="video-thumbnail">
                  <img src={video.poster} alt={video.title} />
                  <div className="play-overlay">
                    <Play size={32} />
                  </div>
                </div>
                <h4>{video.title}</h4>
              </div>
            ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="lightbox">
          <div className="lightbox-content">
            <button className="close-lightbox" onClick={closeLightbox}>
              <X size={28} />
            </button>
            
            <div className="lightbox-media">
              {selectedMedia.type === 'video' ? (
                <video
                  key={selectedMedia.id}
                  autoPlay
                  controls
                  muted={isMuted}
                  poster={selectedMedia.poster}
                >
                  <source src={selectedMedia.src} type="video/mp4" />
                </video>
              ) : (
                <img src={selectedMedia.src} alt={selectedMedia.title} />
              )}
              
              <div className="lightbox-navigation">
                <button className="nav-btn prev" onClick={() => navigateMedia('prev')}>
                  <ChevronLeft size={24} />
                </button>
                <button className="nav-btn next" onClick={() => navigateMedia('next')}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="lightbox-info">
              <div className="info-header">
                <h2>{selectedMedia.title}</h2>
                <div className="action-buttons">
                  <button 
                    className="action-btn"
                    onClick={() => toggleFavorite(selectedMedia.id)}
                  >
                    <Heart 
                      size={20} 
                      fill={favorites.has(selectedMedia.id) ? '#ff4757' : 'none'} 
                      color={favorites.has(selectedMedia.id) ? '#ff4757' : 'currentColor'} 
                    />
                  </button>
                  <button className="action-btn">
                    <Share2 size={20} />
                  </button>
                  <button className="action-btn">
                    <Download size={20} />
                  </button>
                  <button className="action-btn">
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>
              
              <p className="lightbox-description">{selectedMedia.description}</p>
              
              <div className="lightbox-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{selectedMedia.location}</span>
                </div>
                {selectedMedia.type === 'video' && (
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{selectedMedia.duration}</span>
                  </div>
                )}
                <div className="meta-item">
                  <Info size={16} />
                  <span>{selectedMedia.type === 'video' ? `${selectedMedia.views} views` : `${selectedMedia.likes} likes`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TempleGallery;