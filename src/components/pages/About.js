import React from "react";

const About = (props) => {
  return (
    <>
      <div className="container" style={{ minHeight: "calc(100vh - 78px)" }}>
        <h1 className="title">About this app</h1>
        <p className="subtitle">App to search GitHub users</p>
        <p>Version 1.1.0</p>
      </div>
    </>
  );
};

export default About;
