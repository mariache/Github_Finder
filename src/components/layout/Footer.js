import React from "react";

const Footer = () => (
  <div className="footer">
    <h4>Github Finder</h4>
    <p>
      {new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
  </div>
);
export default Footer;
