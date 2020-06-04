import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";
import moment from "moment";

const Repos = ({ repos }) => {
  return (
    <>
      <h2 className="title">Last updated repos</h2>
      <div className="card-wrapper">
        {repos.length > 0 ? (
          repos
            .sort((a, b) => {
              return moment(b.updated_at).diff(moment(a.updated_at));
            })
            .map((repo) => <RepoItem repo={repo} key={repo.id} />)
        ) : (
          <p className="all-center p-1" style={{ fontStyle: "italic" }}>
            No repos yet
          </p>
        )}
      </div>
    </>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
