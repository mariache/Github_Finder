import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";

const Navbar = ({ icon, title }) => {
  const githubContext = useContext(GithubContext);
  const { clearUsers } = githubContext;
  return (
    <nav className="navbar bg-primary">
      <Link className="logo" to="/" onClick={clearUsers}>
        <h1 className="logo__name">
          <i className={`${icon} logo__icon`} />
          {title}
        </h1>
      </Link>
      <ul className="navbar__list">
        <li>
          <Link className="navbar__item" to="/" onClick={clearUsers}>
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
