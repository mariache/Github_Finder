import React from "react";
//impt as a shortcut
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => {
  //the same
  // const { icon, title } = props;
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
