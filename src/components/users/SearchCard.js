import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ghb from "../../assets/images/ghb.png";
import GithubContext from "../../context/github/githubContext";
import SearchForm from "./SearchForm";

const SearchCard = () => {
  const githubContext = useContext(GithubContext);
  const { clearUsers, users } = githubContext;
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  return (
    <>
      {!users.length && (
        <div className="wrapper-main">
          <div className="container">
            <div className="card p-3">
              <div className="card__content">
                <div>
                  <h1 className="title">Github Finder</h1>
                  <p className="card__description">
                    Search for a user to see profile details.
                  </p>
                </div>
                <img
                  src={ghb}
                  alt="github logo"
                  style={{ width: 100 }}
                  className="logo"
                />
              </div>
              <SearchForm />
            </div>
          </div>
        </div>
      )}
      {users.length > 0 && (
        <div className="container">
          <div className="search-result">
            <img
              src={ghb}
              alt="github logo"
              className="logo"
              style={{ width: 100, margin: "0 auto 1rem" }}
            />
            {query && (
              <p className="text-secondary" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                Search results for <strong>"{query}"</strong> — {users.length} user{users.length !== 1 ? "s" : ""} found
              </p>
            )}
            <button className="btn btn-ghb" style={{ display: "block", margin: "0.5rem auto" }} onClick={clearUsers}>
              Clear result
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCard;
