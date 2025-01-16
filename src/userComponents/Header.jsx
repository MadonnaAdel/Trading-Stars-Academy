import React from 'react';

export default function Header({ title, width }) {
  return (
    <div className="Header text-center mx-auto">
      <h2
        className="fw-bold"
        style={{
          fontSize: "clamp(30px, 5vw, 70px)",
          textShadow: 'rgba(2, 119, 244, 0.65) 9px 4px 15px',
        }}
      >
        {title}
      </h2>
      <div
        className="bg-primary mx-auto mt-2"
        style={{
          height: "2px",
          width: width || '50%', 
        }}
      ></div>
    </div>
  );
}
