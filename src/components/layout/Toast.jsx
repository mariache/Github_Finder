import React, { useEffect, useState } from "react";

const Toast = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div
      style={{
        position: "fixed",
        top: visible ? "1.5rem" : "-4rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#ff4d4f",
        color: "white",
        padding: "0.75rem 1.25rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1000,
        fontSize: "0.95rem",
        opacity: visible ? 1 : 0,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        minWidth: "200px",
        maxWidth: "90%",
        transition: "all 0.3s ease-out",
      }}
    >
      <span style={{ flex: 1, textAlign: "center" }}>{message}</span>
      <button
        onClick={handleClose}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          lineHeight: 1,
        }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
