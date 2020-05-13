import React, { useState, useContext } from "react";

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
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search users..."
          value={search}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear result
        </button>
      )}
    </div>
  );
};

export default Search;
