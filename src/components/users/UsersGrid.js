import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner/Spinner";

import GithubContext from "../../context/github/githubContext";

const UsersGrid = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container">
        <div className="usersGrid">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    );
  }
};

export default UsersGrid;
