import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";
import moment from "moment";

const Repos = ({ repos }) => {
  return (
    <>
      <h2>Last added repos</h2>

      <div className="card-repo-wrapper">
        {repos
          .sort((a, b) => {
            return moment(b.updated_at).diff(moment(a.updated_at));
          })
          .map((repo) => (
            <RepoItem repo={repo} key={repo.id} />
          ))}
      </div>
    </>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
