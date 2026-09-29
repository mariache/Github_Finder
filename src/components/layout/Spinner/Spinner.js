import React from "react";
import "./Spinner.css";

const Spinner = () => (
  <div className="flex-container" style={{ height: "200px" }}>
    <div className="lds-dual-ring" />
  </div>
);

export default Spinner;
