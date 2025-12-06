import React from "react";

export default function BrahmotsavaPage() {
  return (
    <>
      <style>{`
        /* ====== GLOBAL RESET ====== */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #f8f5f0; }

        /* ====== HERO ====== */
        .hero {
          position: relative;
          height: 70vh;
          background: url('https://templenet.files.wordpress.com/2016/09/tirumala.jpg') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
        .hero::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
        }
        .hero-content {
          position: relative;
          max-width: 900px;
          padding: 20px;
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          text-shadow: 0px 4px 10px rgba(0,0,0,0.6);
        }
        .hero-sub {
          margin-top: 10px;
          font-size: 1.2rem;
          opacity: 0.9;
        }

        /* ====== CONTAINER ====== */
        .page-wrapper {
          width: 90%;
          max-width: 1200px;
          margin: 40px auto;
        }

        /* ====== CARD SECTIONS ====== */
        .section {
          background: white;
          padding: 30px;
          margin-bottom: 30px;
          border-radius: 14px;
          box-shadow: 0px 6px 20px rgba(0,0,0,0.1);
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .section h2 {
          margin-bottom: 15px;
          font-size: 1.8rem;
          font-weight: 700;
          color: #8b0000;
        }

        .section p, .section li {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #333;
        }

        .list {
          padding-left: 20px;
          margin-top: 10px;
        }

        /* ====== YOUTUBE VIDEO ====== */
        .video-box {
          margin-top: 20px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
        }

        /* ====== GALLERY ====== */
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 25px;
        }
        .gallery img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
          transition: 0.3s;
          cursor: pointer;
        }
        .gallery img:hover {
          transform: scale(1.05);
        }

      `}</style>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Brahmotsava — The Divine Festival</h1>
          <p className="hero-sub">
            The grand celebration started by Lord Brahma himself in honor of Sri Venkateswara.
          </p>
        </div>
      </section>

      {/* ==================== CONTENT ==================== */}
      <div className="page-wrapper">

        <div className="section">
          <h2>History of Brahmotsava</h2>
          <p>
            Brahmotsava is a thousand-year-old divine festival originating from Lord Brahma’s
            devotion towards Lord Venkateswara. Scriptures like Vishnu Purana, Padma Purana,
            Skanda Purana and Vaikhanasa Agama describe how Brahma conducted the first
            Utsavam to thank Vishnu for protecting the universe.
          </p>
        </div>

        <div className="section">
          <h2>Why the Name “Brahmotsavam”?</h2>
          <p>
            “Brahma + Utsava” → Festival conducted by Brahma.
            It symbolizes cosmic purification and divine protection.
          </p>
        </div>

        <div className="section">
          <h2>Scriptural References</h2>
          <ul className="list">
            <li>Vishnu Purana</li>
            <li>Padma Purana</li>
            <li>Skanda Purana</li>
            <li>Vaikhanasa Agama</li>
          </ul>
        </div>

        <div className="section">
          <h2>9-Day Brahmotsava Schedule</h2>
          <ul className="list">
            <li><b>Day 1:</b> Dwajarohanam – Garuda flag hoisting.</li>
            <li><b>Day 2:</b> Pedda Sesha Vahanam.</li>
            <li><b>Day 3:</b> Chinna Sesha Vahanam.</li>
            <li><b>Day 4:</b> Garuda Vahanam – Lakhs attend.</li>
            <li><b>Day 5:</b> Hanumantha Vahanam.</li>
            <li><b>Day 6:</b> Gaja Vahanam.</li>
            <li><b>Day 7:</b> Rathotsavam – Chariot procession.</li>
            <li><b>Day 8:</b> Ashwa Vahanam.</li>
            <li><b>Day 9:</b> Chakrasnanam – Closing ritual.</li>
          </ul>
        </div>

        {/* VIDEO */}
        <div className="section">
          <h2>Brahmotsavam Full Video</h2>
          <div className="video-box">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/9Wb5Kx1uuJk"
              title="Brahmotsavam Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* GALLERY */}
        <div className="section">
          <h2>Brahmotsava Gallery</h2>
          <div className="gallery">
            <img src="https://www.ttdsevaonline.net/wp-content/uploads/2018/09/ttd-brahmotsavam-images.jpg" />
            <img src="https://www.telugutimes.net/wp-content/uploads/2018/10/Garuda-Seva-Tirumala.jpg" />
            <img src="https://i.ytimg.com/vi/aEeZBfR5t-k/maxresdefault.jpg" />
            <img src="https://www.ttdsevaonline.com/wp-content/uploads/2020/09/TTD-Brahmotsavam-details.jpg" />
          </div>
        </div>

      </div>
    </>
  );
}
