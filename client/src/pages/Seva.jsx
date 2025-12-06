import React from "react";

const Upcoming = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#333" }}>
        Coming Soon
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#666" }}>
        This page is under development.
      </p>
    </div>
  );
};

export default Upcoming;
