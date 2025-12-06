import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="temple-404">
        <h1 className="error-code">404</h1>
        <p className="error-message">
          The sacred path you seek does not exist in our temple grounds
        </p>
        
        <div className="temple-actions">
          <Link to="/" className="return-home">
            🏛️ Return to Temple
          </Link>
          <Link to="/mantras" className="explore-mantras">
            📿 Explore Mantras
          </Link>
        </div>
        
        <div className="divine-quote">
          "सत्यमेव जयते" - Truth alone triumphs
        </div>
        <p>Contact to Admin or Mail : temple@cutm.ac.in</p>
      </div>

      <style jsx>{`
        .not-found-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%);
        }

        .temple-404 {
          text-align: center;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.9);
          padding: 3rem 2rem;
          border-radius: 15px;
          border: 2px solid #D2691E;
          box-shadow: 0 10px 30px rgba(139, 69, 19, 0.2);
        }

        .broken-bell {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.7;
          animation: swing 2s infinite ease-in-out;
        }

        @keyframes swing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }

        .error-code {
          font-size: 6rem;
          color: #8B4513;
          margin: 0;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .error-title {
          color: #D2691E;
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 600;
        }

        .error-message {
          color: #5D4037;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .temple-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .return-home,
        .explore-mantras {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
        }

        .return-home:hover,
        .explore-mantras:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
        }

        .divine-quote {
          color: #8B4513;
          font-style: italic;
          font-size: 1rem;
          opacity: 0.8;
          border-top: 1px solid #F5E6D3;
          padding-top: 1rem;
        }

        @media (max-width: 480px) {
          .temple-404 {
            padding: 2rem 1rem;
          }
          
          .error-code {
            font-size: 4rem;
          }
          
          .error-title {
            font-size: 1.5rem;
          }
          
          .temple-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}