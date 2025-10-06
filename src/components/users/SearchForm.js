import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
import Toast from "../layout/Toast";

const SearchForm = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      alertContext.setAlert("Please enter something", "light");
      return;
    }

    // Call GitHub search
    const users = await githubContext.searchUsers(search);

    // Reset search bar
    setSearch("");

    // If no users found, show toast
    if (!users || users.length === 0) {
      setToast("No user with that profile exists 🚫");
    }
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

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default SearchForm;
