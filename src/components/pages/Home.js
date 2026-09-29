import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../users/SearchCard";
import UsersGrid from "../users/UsersGrid";
import Toast from "../layout/Toast";
import GithubContext from "../../context/github/githubContext";

const Home = () => {
  const githubContext = useContext(GithubContext);
  const { users, searchUsers, loading } = githubContext;
  const location = useLocation();
  const lastQuery = useRef(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (q && q !== lastQuery.current) {
      lastQuery.current = q;
      searchUsers(q);
    }
  }, [location.search, searchUsers]);

  useEffect(() => {
    if (!loading && lastQuery.current && users.length === 0) {
      setToast("No user with that profile exists 🚫");
    }
  }, [loading, users]);

  return (
    <>
      <SearchCard />
      {users.length > 0 && <UsersGrid />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default Home;
