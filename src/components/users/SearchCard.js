import React, { useContext } from "react";
import ghb from "../../assets/images/ghb.png";
import GithubContext from "../../context/github/githubContext";
import SearchForm from "./SearchForm";

const SearchCard = () => {
  const githubContext = useContext(GithubContext);
  const { clearUsers, users } = githubContext;

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
            <button className="btn btn-ghb btn-block" onClick={clearUsers}>
              Clear Result
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCard;
