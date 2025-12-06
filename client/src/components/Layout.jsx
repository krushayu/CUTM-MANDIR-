export default function Layout({ children }) {
  return (
    <div className="layout-container">
      {children}
      
      <style jsx>{`
        .layout-container {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        
        /* Ensure proper spacing for mobile */
        @media (max-width: 768px) {
          .layout-container {
            padding-bottom: 80px; /* Space for mobile bottom nav */
          }
        }
      `}</style>
    </div>
  );
}