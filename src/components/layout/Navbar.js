import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <Link className="logo" to="/">
        <h1 className="logo__name">
          <i className={`${icon} logo__icon`} />
          {title}
        </h1>
      </Link>
      <ul className="navbar__list">
        <li>
          <Link className="navbar__item" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar__item" to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
