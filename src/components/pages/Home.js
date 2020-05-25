import React, { useContext } from "react";
import SearchCard from "../users/SearchCard";
import UsersGrid from "../users/UsersGrid";
import GithubContext from "../../context/github/githubContext";

const Home = () => {
  const githubContext = useContext(GithubContext);

  const { users } = githubContext;
  return (
    <>
      <SearchCard />
      {users.length > 0 && <UsersGrid />}
    </>
  );
};

export default Home;
