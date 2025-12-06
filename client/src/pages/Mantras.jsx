import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  BookOpen,
  Heart,
  Eye,
  Lock,
  X,
  ChevronLeft,
  Home,
  ArrowLeft,
  Star,
  Music,
  Sparkles,
  Grid,
  List,
  ChevronRight
} from "lucide-react";

const MantrasPageUser = () => {
  const [mantras, setMantras] = useState([]);
  const [categories, setCategories] = useState([
    "Venkateswara",
    "Sri Vidya",
    "Vishnu",
    "Lakshmi",
    "Shiva",
    "Durga",
    "Narayana",
    "Balaji",
    "Trimurti",
    // "Ganesha",
    // "Saraswati",
    // "Krishna",
    // "Rama",
    // "Hanuman",
    // "Subramanya",
    // "Narasimha",
    // "Dhanvantari",
    // "Surya",
    // "Ganga",
    // "Annapurna",
    // "Navagraha",
    // "Sastha/Ayyappa",
    "General"
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryMantras, setCategoryMantras] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [voice, setVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.8);
  const [previewMantra, setPreviewMantra] = useState(null);
  const [viewMode, setViewMode] = useState("categories"); // "categories" or "mantras"
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const utteranceRef = useRef(null);
  const intervalRef = useRef(null);

  const token = localStorage.getItem("token");

  // Category images mapping
  const categoryImages = {
    "Venkateswara": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGFfDYk1eMW8_siiMfxGQdUhZO6s3O46VEVzEHP7ZDGowfS4dpP9yESRYw-eGOBFT428&usqp=CAU",
    "Sri Vidya": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuJq002_GtzXSRHNkzjEaTKWPky5lnKiXhw&s",
    "Vishnu": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1sfnCLHQ2jlflnXdPUE7qXPI3_mzT1_wZSg&s",
    "Lakshmi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZZr61reSFEoPWpCHrw18d4Yl_uGlqyOQzM1mxhHdTm2LPFmRht4ywMd601G5nPg4Kn8&usqp=CAU",
    "Shiva": "https://images.woodenstreet.de/image/data/Ekaa/lord-shiva-murti-in-cold-cast-bronze/dimensions-cm/S1.jpg",
    "Durga": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWHPT4VLPQmM9Iom2qozXy77A_15_gdQFEA&s",
    "Narayana": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1sfnCLHQ2jlflnXdPUE7qXPI3_mzT1_wZSg&s",
    "Balaji": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRflwwEvsD6Xs1fBrtwNrbJNR4Ob7-4aotxQ&s",
    "Trimurti": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjmcPYBFOLTpvaq3w2PgRll3DY8bJrDxTGOw&s",
    // "Ganesha": "https://img.icons8.com/color/96/ganesha.png",
    // "Saraswati": "https://img.icons8.com/color/96/saraswati.png",
    // "Krishna": "https://img.icons8.com/color/96/krishna.png",
    // "Rama": "https://img.icons8.com/color/96/rama.png",
    // "Hanuman": "https://img.icons8.com/color/96/hanuman.png",
    // "Subramanya": "https://img.icons8.com/color/96/subramanya.png",
    // "Narasimha": "https://img.icons8.com/color/96/narasimha.png",
    // "Dhanvantari": "https://img.icons8.com/color/96/dhanvantari.png",
    // "Surya": "https://img.icons8.com/color/96/surya.png",
    // "Ganga": "https://img.icons8.com/color/96/ganga.png",
    // "Annapurna": "https://img.icons8.com/color/96/annapurna.png",
    // "Navagraha": "https://img.icons8.com/color/96/navagraha.png",
    // "Sastha/Ayyappa": "https://img.icons8.com/color/96/ayyappa.png",
    "General": "https://img.icons8.com/?size=100&id=rVBMJNcDhIaI&format=png&color=000000"
  };

  // For non-logged users, show limited categories
  const previewCategories = ["Venkateswara", "Shiva", "Lakshmi", "Ganesha", "Durga", "General"];

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman')
      );
      setVoice(femaleVoice || voices[0]);
    }
    
    loadFavorites();
  }, [token, navigate]);

  const loadFavorites = () => {
    const saved = localStorage.getItem("mantra_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const handleCategoryClick = async (category) => {
    if (!token) {
      alert("Please login to access mantras!");
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    setSelectedCategory(category);
    
    try {
      const res = await axios.get("/api/mantras", {
        params: { category },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryMantras(res.data.mantras || []);
      setViewMode("mantras");
    } catch (err) {
      console.error(err);
      // Fallback sample data
      const sampleMantras = generateSampleMantras(category);
      setCategoryMantras(sampleMantras);
      setViewMode("mantras");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSampleMantras = (category) => {
    const samples = {
      "Venkateswara": [
        {
          _id: "v1",
          sanskrit: "ॐ नमो वेंकटेशाय",
          hindi_meaning: "श्री वेंकटेश भगवान को नमस्कार",
          english_meaning: "Salutations to Lord Venkateswara",
          category: "Venkateswara"
        },
        {
          _id: "v2",
          sanskrit: "श्रीनिवासाय नमस्तुभ्यं सर्वकामफलप्रद",
          hindi_meaning: "हे श्रीनिवास! आपको नमस्कार, आप सभी इच्छाओं के फल देने वाले हैं",
          english_meaning: "O Srinivasa! Salutations to you, you grant the fruits of all desires",
          category: "Venkateswara"
        }
      ],
      "Shiva": [
        {
          _id: "s1",
          sanskrit: "ॐ नमः शिवाय",
          hindi_meaning: "शिव जी को नमस्कार",
          english_meaning: "Salutations to Lord Shiva",
          category: "Shiva"
        },
        {
          _id: "s2",
          sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
          hindi_meaning: "हम तीन नेत्रों वाले, सुगंधित, समृद्धि बढ़ाने वाले की पूजा करते हैं",
          english_meaning: "We worship the three-eyed one, fragrant, prosperity-increasing",
          category: "Shiva"
        }
      ]
    };
    
    return samples[category] || [
      {
        _id: "g1",
        sanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
        hindi_meaning: "शांति, शांति, शांति",
        english_meaning: "Peace, peace, peace",
        category: category
      }
    ];
  };

  const handleMantraClick = (mantra) => {
    setSelectedMantra(mantra);
    setIsDialogOpen(true);
    stopPlayback();
  };

  const startPlayback = () => {
    if (!selectedMantra) return;
    
    stopPlayback();
    
    const textToSpeak = selectedMantra.sanskrit || selectedMantra.hindi_meaning;
    const words = textToSpeak.split(' ');
    let currentIndex = 0;
    
    setIsPlaying(true);
    setCurrentWordIndex(0);

    if (voice && 'speechSynthesis' in window) {
      utteranceRef.current = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current.voice = voice;
      utteranceRef.current.rate = speechRate;
      utteranceRef.current.lang = 'hi-IN';
      
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
        setCurrentWordIndex(0);
        clearInterval(intervalRef.current);
      };
      
      window.speechSynthesis.speak(utteranceRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentIndex < words.length - 1) {
        currentIndex++;
        setCurrentWordIndex(currentIndex);
      } else {
        clearInterval(intervalRef.current);
      }
    }, (textToSpeak.length / speechRate) / words.length);
  };

  const stopPlayback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setCurrentWordIndex(0);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem("mantra_favorites", JSON.stringify(newFavorites));
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCategoryMantras([]);
    setViewMode("categories");
  };

  const filteredMantras = categoryMantras.filter(mantra =>
    search === "" ||
    mantra.sanskrit?.toLowerCase().includes(search.toLowerCase()) ||
    mantra.hindi_meaning?.toLowerCase().includes(search.toLowerCase()) ||
    mantra.english_meaning?.toLowerCase().includes(search.toLowerCase())
  );

  const currentCategories = token ? categories : previewCategories;

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF8DC 0%, #f5f0e1 100%)",
      padding: "1rem",
      fontFamily: "'Segoe UI', 'Poppins', sans-serif"
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
      padding: "1rem",
      background: "linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(128, 0, 0, 0.9))",
      borderRadius: "20px",
      border: "3px solid #FFD700",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
    },
    title: {
      fontSize: "2.2rem",
      background: "linear-gradient(135deg, #FFD700, #FF9933)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      fontWeight: "700",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem"
    },
    subtitle: {
      color: "#FFF8DC",
      fontSize: "1rem",
      opacity: "0.9"
    },
    controls: {
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      padding: "1.5rem",
      marginBottom: "2rem",
      border: "2px solid #FFD700",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)"
    },
    searchBox: {
      position: "relative",
      marginBottom: "1rem"
    },
    searchInput: {
      width: "100%",
      padding: "1rem 1rem 1rem 3rem",
      fontSize: "1rem",
      border: "3px solid #FFD700",
      borderRadius: "50px",
      background: "white",
      outline: "none"
    },
    categoryHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    backButton: {
      background: "linear-gradient(135deg, #8B0000, #B22222)",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "30px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "1.5rem",
      padding: "1rem"
    },
    categoryCard: {
      background: "white",
      borderRadius: "20px",
      padding: "1.5rem",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "2px solid #FFD700",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem"
    },
    categoryImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #FFD700",
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"
    },
    categoryName: {
      color: "#8B0000",
      fontWeight: "700",
      fontSize: "1rem",
      margin: "0"
    },
    mantrasGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
      padding: "1rem"
    },
    mantraCard: {
      background: "white",
      borderRadius: "20px",
      padding: "1.5rem",
      border: "2px solid #FFD700",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    dialogOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
      padding: "1rem"
    },
    dialogContent: {
      background: "linear-gradient(135deg, white, #FFF8DC)",
      borderRadius: "30px",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "90vh",
      overflowY: "auto",
      border: "4px solid #FFD700",
      boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)"
    }
  };

  // Mobile responsive adjustments
  const mobileStyles = window.innerWidth < 768 ? {
    categoriesGrid: {
      ...styles.categoriesGrid,
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      padding: "0.5rem"
    },
    categoryCard: {
      ...styles.categoryCard,
      padding: "1rem"
    },
    categoryImage: {
      ...styles.categoryImage,
      width: "60px",
      height: "60px"
    },
    mantrasGrid: {
      ...styles.mantrasGrid,
      gridTemplateColumns: "1fr",
      gap: "1rem"
    }
  } : {};

  const finalStyles = {
    ...styles,
    categoriesGrid: { ...styles.categoriesGrid, ...mobileStyles.categoriesGrid },
    categoryCard: { ...styles.categoryCard, ...mobileStyles.categoryCard },
    categoryImage: { ...styles.categoryImage, ...mobileStyles.categoryImage },
    mantrasGrid: { ...styles.mantrasGrid, ...mobileStyles.mantrasGrid }
  };

  return (
    <div style={finalStyles.container}>
      {/* Header */}
      <header style={finalStyles.header}>
        <h1 style={finalStyles.title}>
          <BookOpen size={32} />
          Divine Mantras Library
        </h1>
        <p style={finalStyles.subtitle}>
          {viewMode === "categories" 
            ? "Select a category to explore mantras" 
            : `Exploring ${selectedCategory} Mantras`}
        </p>
      </header>

      {/* Controls */}
      <div style={finalStyles.controls}>
        {viewMode === "mantras" && (
          <div style={finalStyles.categoryHeader}>
            <button 
              style={finalStyles.backButton}
              onClick={handleBackToCategories}
            >
              <ArrowLeft size={20} />
              Back to Categories
            </button>
            <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#8B0000" }}>
              {categoryMantras.length} Mantras
            </div>
          </div>
        )}
        
        <div style={finalStyles.searchBox}>
          <Search size={20} style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#8B4513"
          }} />
          <input
            type="text"
            placeholder={viewMode === "categories" 
              ? "Search categories..." 
              : `Search in ${selectedCategory} mantras...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={finalStyles.searchInput}
          />
        </div>
      </div>

      {/* Categories View */}
      {viewMode === "categories" && (
        <div style={finalStyles.categoriesGrid}>
          {currentCategories.map((category) => (
            <div
              key={category}
              style={{
                ...finalStyles.categoryCard,
                opacity: !token && !previewCategories.includes(category) ? 0.5 : 1
              }}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <img
                src={categoryImages[category] || "https://img.icons8.com/color/96/pray.png"}
                alt={category}
                style={finalStyles.categoryImage}
              />
              <h3 style={finalStyles.categoryName}>{category}</h3>
              {!token && !previewCategories.includes(category) && (
                <div style={{
                  background: "rgba(255, 0, 0, 0.1)",
                  color: "#B22222",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "15px",
                  fontSize: "0.8rem",
                  fontWeight: "600"
                }}>
                  Login to Access
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mantras View */}
      {viewMode === "mantras" && (
        <>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <div style={{
                width: "50px",
                height: "50px",
                border: "5px solid rgba(255, 215, 0, 0.3)",
                borderTop: "5px solid #FFD700",
                borderRadius: "50%",
                margin: "0 auto 1rem",
                animation: "spin 1s linear infinite"
              }} />
              <p style={{ color: "#8B4513" }}>Loading mantras...</p>
            </div>
          ) : (
            <div style={finalStyles.mantrasGrid}>
              {filteredMantras.map((mantra) => (
                <div
                  key={mantra._id}
                  style={{
                    ...finalStyles.mantraCard,
                    background: favorites.includes(mantra._id) 
                      ? "linear-gradient(135deg, rgba(255, 248, 220, 0.9), rgba(255, 228, 181, 0.9))" 
                      : "white"
                  }}
                  onClick={() => handleMantraClick(mantra)}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem"
                  }}>
                    <div>
                      <div style={{
                        background: "linear-gradient(135deg, #8B0000, #B22222)",
                        color: "white",
                        padding: "0.3rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        display: "inline-block",
                        marginBottom: "0.5rem"
                      }}>
                        {mantra.category}
                      </div>
                      <h3 style={{
                        fontSize: "1.3rem",
                        color: "#2C1810",
                        margin: "0",
                        lineHeight: "1.4",
                        fontFamily: "'Noto Sans Devanagari', sans-serif"
                      }}>
                        {mantra.sanskrit}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(mantra._id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: favorites.includes(mantra._id) ? "#FF4444" : "#8B4513",
                        cursor: "pointer",
                        padding: "0.5rem"
                      }}
                    >
                      <Heart 
                        size={20} 
                        fill={favorites.includes(mantra._id) ? "currentColor" : "none"} 
                      />
                    </button>
                  </div>
                  
                  <p style={{
                    color: "#8B4513",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    margin: "0"
                  }}>
                    {mantra.hindi_meaning?.substring(0, 100)}
                    {mantra.hindi_meaning?.length > 100 ? "..." : ""}
                  </p>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px dashed rgba(139, 69, 19, 0.2)"
                  }}>
                    <span style={{
                      color: "#8B4513",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem"
                    }}>
                      <Music size={14} />
                      Click to Listen
                    </span>
                    <ChevronRight size={18} color="#8B4513" />
                  </div>
                </div>
              ))}
              
              {filteredMantras.length === 0 && (
                <div style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "3rem",
                  color: "#8B4513"
                }}>
                  <BookOpen size={48} style={{ marginBottom: "1rem", opacity: "0.5" }} />
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No mantras found</h3>
                  <p>Try a different search in {selectedCategory} category</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Mantra Detail Dialog */}
      {isDialogOpen && selectedMantra && (
        <div style={finalStyles.dialogOverlay} onClick={() => setIsDialogOpen(false)}>
          <div style={finalStyles.dialogContent} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: "2rem 2rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid rgba(255, 215, 0, 0.3)"
            }}>
              <div>
                <div style={{
                  background: "linear-gradient(135deg, #8B0000, #B22222)",
                  color: "white",
                  padding: "0.3rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  display: "inline-block",
                  marginBottom: "0.5rem"
                }}>
                  {selectedMantra.category}
                </div>
                <h2 style={{ fontSize: "1.8rem", color: "#8B0000", margin: "0" }}>
                  <BookOpen size={24} style={{ marginRight: "0.75rem", verticalAlign: "middle" }} />
                  Mantra Details
                </h2>
              </div>
              <button 
                onClick={() => {
                  setIsDialogOpen(false);
                  stopPlayback();
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#8B4513",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  transition: "all 0.3s ease"
                }}
              >
                <X size={28} />
              </button>
            </div>

            <div style={{ padding: "2rem" }}>
              {/* Highlighted Mantra */}
              <div style={{
                fontSize: "2rem",
                lineHeight: "1.8",
                marginBottom: "2rem",
                textAlign: "center",
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                padding: "1.5rem",
                background: "rgba(255, 215, 0, 0.1)",
                borderRadius: "15px",
                border: "2px solid rgba(255, 215, 0, 0.3)",
                minHeight: "120px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center"
              }}>
                {(selectedMantra.sanskrit || selectedMantra.hindi_meaning).split(' ').map((word, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "0.1rem 0.3rem",
                      margin: "0.1rem",
                      borderRadius: "5px",
                      transition: "all 0.3s ease",
                      fontWeight: index === currentWordIndex ? "700" : "500",
                      background: index === currentWordIndex 
                        ? "linear-gradient(135deg, #FFD700, #FF9933)" 
                        : "transparent",
                      color: index === currentWordIndex ? "#8B0000" : "#2C1810",
                      boxShadow: index === currentWordIndex 
                        ? "0 0 15px rgba(255, 153, 51, 0.5)" 
                        : "none"
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Playback Controls */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
                marginBottom: "2rem",
                padding: "1.5rem",
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "20px",
                border: "2px solid #FFD700"
              }}>
                <button 
                  onClick={togglePlayback}
                  style={{
                    background: isPlaying 
                      ? "linear-gradient(135deg, #B22222, #8B0000)" 
                      : "linear-gradient(135deg, #2E7D32, #4CAF50)",
                    color: "white",
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={20} />
                      Pause Mantra
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Play Mantra
                    </>
                  )}
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#8B4513", fontWeight: "600" }}>Speed:</span>
                  {[0.5, 0.8, 1.0, 1.2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => {
                        setSpeechRate(rate);
                        if (isPlaying) {
                          stopPlayback();
                          setTimeout(startPlayback, 100);
                        }
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        border: "2px solid #8B4513",
                        background: speechRate === rate ? "linear-gradient(135deg, #8B0000, #B22222)" : "white",
                        borderRadius: "20px",
                        color: speechRate === rate ? "white" : "#8B4513",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Meanings */}
              <div style={{
                display: "grid",
                gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginTop: "2rem"
              }}>
                {selectedMantra.hindi_meaning && (
                  <div style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    border: "2px solid rgba(139, 69, 19, 0.2)",
                    transition: "all 0.3s ease"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(139, 69, 19, 0.1)"
                    }}>
                      <div style={{ color: "#8B4513", fontWeight: "600", fontSize: "1.1rem" }}>
                        <span>🇮🇳</span> Hindi Meaning
                      </div>
                    </div>
                    <p style={{ color: "#2C1810", lineHeight: "1.6", fontSize: "1rem" }}>
                      {selectedMantra.hindi_meaning}
                    </p>
                  </div>
                )}
                
                {selectedMantra.english_meaning && (
                  <div style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    border: "2px solid rgba(139, 69, 19, 0.2)",
                    transition: "all 0.3s ease"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(139, 69, 19, 0.1)"
                    }}>
                      <div style={{ color: "#8B4513", fontWeight: "600", fontSize: "1.1rem" }}>
                        <span>🇬🇧</span> English Meaning
                      </div>
                    </div>
                    <p style={{ color: "#2C1810", lineHeight: "1.6", fontSize: "1rem" }}>
                      {selectedMantra.english_meaning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
          .title { font-size: 1.8rem; }
          .dialogContent { width: 95%; padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default MantrasPageUser;