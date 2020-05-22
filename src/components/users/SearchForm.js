import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const SearchForm = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

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
    <>
      <form onSubmit={onSubmit} className="form">
        <input
          className="form__input"
          type="text"
          name="text"
          placeholder="Search users..."
          value={search}
          onChange={onChange}
          style={{ marginTop: "0.5rem" }}
        />
        <input className="form__button_dark btn" type="submit" value="Search" />
      </form>
    </>
  );
};

export default SearchForm;
