import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  GET_PAGINATED_REPOS,
  GET_SORTED_REPOS,
  CLEAR_CURRENT,
  CLEAR_SORTED,
} from "../constants";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    sortedRepos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  const clearSorted = () => {
    dispatch({
      type: CLEAR_SORTED,
    });
  };

  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  const getPaginatedUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?page=1&per_page=6&sort=created:asc&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);

    dispatch({
      type: GET_PAGINATED_REPOS,
      payload: res.data,
    });
  };

  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=
    ${githubClientId}&client_secret=
    ${githubClientSecret}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  const getSortedRepos = (order) => dispatch({ type: GET_SORTED_REPOS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        repos: state.repos,
        loading: state.loading,
        sortedRepos: state.sortedRepos,
        searchUsers,
        clearUsers,
        clearCurrent,
        clearSorted,
        getUser,
        getUserRepos,
        getSortedRepos,
        getPaginatedUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
