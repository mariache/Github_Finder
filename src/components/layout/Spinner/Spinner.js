import React from "react";
import "./Spinner.css";

export default () => (
  <div className="flex-container" style={{ height: "200px" }}>
    <div className="lds-dual-ring" />
  </div>
);
