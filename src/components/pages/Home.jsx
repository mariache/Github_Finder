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
  const searchFired = useRef(false);
  const [toast, setToast] = useState(null);

  // location.key changes on every history.push, even for the same URL,
  // so same-term re-searches always go through.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (!q) {
      lastQuery.current = null;
      return;
    }
    lastQuery.current = q;
    searchFired.current = false;
    searchUsers(q);
  }, [location.key, searchUsers]); // eslint-disable-line react-hooks/exhaustive-deps

  // Only show the toast after a real search cycle (loading true → false).
  useEffect(() => {
    if (loading) {
      searchFired.current = true;
      return;
    }
    if (!searchFired.current) return;
    searchFired.current = false;
    const q = new URLSearchParams(location.search).get("q");
    if (q && lastQuery.current === q && users.length === 0) {
      setToast("No user with that profile exists 🚫");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
