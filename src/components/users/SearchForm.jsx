import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";

const SearchForm = () => {
  const alertContext = useContext(AlertContext);
  const history = useHistory();
  const location = useLocation();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (q) setSearch(q);
  }, [location.search]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      alertContext.setAlert("Please enter something", "light");
      return;
    }
    history.push(`/?q=${encodeURIComponent(search.trim())}`);
  };

  const onChange = (e) => setSearch(e.target.value);

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div style={{ position: "relative" }}>
          <input
            className="form__input"
            type="text"
            name="text"
            placeholder="Search users..."
            value={search}
            onChange={onChange}
            style={{
              marginTop: "0.5rem",
              paddingRight: search ? "2.2rem" : undefined,
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                history.replace("/");
              }}
              aria-label="Clear search input"
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "calc(50% + 0.25rem)",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "1rem",
                padding: "0.25rem",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>
        <input className="form__button_dark btn" type="submit" value="Search" />
      </form>
    </>
  );
};

export default SearchForm;
