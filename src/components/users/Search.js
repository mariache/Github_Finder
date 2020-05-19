import React, { useState, useContext } from "react";
import ghb from "../../assets/images/ghb.png";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { clearUsers, users } = githubContext;

  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(search);
      setSearch("");
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="card-search">
      {!users.length && (
        <div className="card p-3">
          <div className="card-text-wrapper">
            <div>
              <h1>Github Finder</h1>
              <p class="subTitle-text">
                Search for a user to see profile details.
              </p>
            </div>
            <img src={ghb} alt="github logo" style={{ width: 100 }} />
          </div>
          <form onSubmit={onSubmit} className="form">
            <input
              type="text"
              name="text"
              placeholder="Search users..."
              value={search}
              onChange={onChange}
              style={{ marginTop: "0.5rem" }}
            />
            <input
              type="submit"
              value="Search"
              className="btn btn-dark btn-block"
            />
          </form>
        </div>
      )}
      {users.length > 0 && (
        <div className="flex-column">
          <img
            src={ghb}
            alt="github logo"
            style={{ width: 100, margin: "0 auto 1rem" }}
          />
          <button className="btn btn-ghb btn-block" onClick={clearUsers}>
            Clear result
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
