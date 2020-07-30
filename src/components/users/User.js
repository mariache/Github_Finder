import React, { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner/Spinner";
import { useHistory } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";
import moment from "moment";
import { languageColors, favouriteLanguage } from "../../utils";

const User = ({ match }) => {
  const history = useHistory();
  const githubContext = useContext(GithubContext);
  const {
    user,
    loading,
    getUser,
    repos,
    getUserRepos,
    clearCurrent,
    clearSorted,
  } = githubContext;

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
    created_at,
  } = user;

  const onHandleBack = () => {
    history.push("/");
    clearCurrent();
    clearSorted();
  };

  if (loading) return Spinner;

  return (
    <div className="container">
      <button onClick={onHandleBack} className="btn-ghb">
        <i className="fas fa-angle-double-left"></i>
        Back to search
      </button>

      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt="user's avatar"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>
            Hireable:
            {hireable ? (
              <i className="fas fa-check text-success" />
            ) : (
              <i className="fas fa-times-circle text-danger" />
            )}
          </p>
          <p>
            <i
              className="fas fa-star"
              style={{ color: languageColors(favouriteLanguage(repos)) }}
            ></i>
            Favorite language: {favouriteLanguage(repos)}
          </p>
          {location && (
            <p>
              <i className="fas fa-map-marker-alt"></i>Location: {location}
            </p>
          )}
          <p>
            <i className="far fa-calendar-alt"></i>Member since:{" "}
            {moment(created_at).format("YYYY-MM-DD")}
          </p>
        </div>
        <div className="flex-column">
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <div className="btn-ghb-wrapper">
            <a
              href={html_url}
              className="btn-ghb my-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
              Visit Github profile
            </a>
          </div>
          <ul>
            <li>
              {login && (
                <>
                  <i className="far fa-user"></i>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <i className="fas fa-laptop-code"></i>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {email && (
                <>
                  <i className="far fa-envelope"></i> <strong>Email: </strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <i className="fas fa-link"></i> <strong>Website: </strong>
                  <a href={blog} target="_blank" rel="noopener noreferrer">
                    {blog}
                  </a>
                </>
              )}
            </li>
          </ul>
          <ul className="badge-wrapper" style={{ marginTop: "1rem" }}>
            <li>
              Public repos
              <span className="badge" style={{ backgroundColor: "#DEEFB7" }}>
                {public_repos}
              </span>
            </li>
            <li>
              Followers
              <span className="badge" style={{ backgroundColor: "#FFC6AC" }}>
                {followers}
              </span>
            </li>
            <li>
              Following
              <span className="badge" style={{ backgroundColor: "#BBDEF0" }}>
                {following}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Repos repos={repos} />
    </div>
  );
};

export default User;
