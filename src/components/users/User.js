import React, { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, loading, getUser, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    email,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    hireable,
  } = user;

  if (loading) return Spinner;

  return (
    <>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-light my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {email && (
                <>
                  <strong>Email: </strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong>
                  <a href={blog} target="_blank" rel="noopener noreferrer">
                    {blog}
                  </a>
                </>
              )}
            </li>
            <li>
              <div className="card text-center">
                <div className="badge badge-primary">
                  Followers: {followers}
                </div>
                <div className="badge badge-success">
                  Following: {following}
                </div>
                <div className="badge badge-danger">
                  Public Repos: {public_repos}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

export default User;
