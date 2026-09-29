import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";

const SearchForm = () => {
  const alertContext = useContext(AlertContext);
  const history = useHistory();

  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      alertContext.setAlert("Please enter something", "light");
      return;
    }
    history.push(`/?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  const onChange = (e) => setSearch(e.target.value);

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
        <input
          className="form__button_dark btn"
          type="submit"
          value="Search"
        />
      </form>

    </>
  );
};

export default SearchForm;
