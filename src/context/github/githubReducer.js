import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  GET_PAGINATED_REPOS,
  CLEAR_CURRENT,
  CLEAR_SORTED,
  GET_SORTED_REPOS,
} from "../constants";

import moment from "moment";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        // users: [],
        repos: [],
        loading: true,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    case CLEAR_CURRENT:
      return { ...state, user: {}, loading: false };
    case CLEAR_SORTED:
      return {
        ...state,
        sortedRepos: [],
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loadind: false,
      };
    // @TODO (not properly implemented yet)
    case GET_SORTED_REPOS:
      return {
        ...state,
        sortedRepos: state.repos.sort((a, b) =>
          moment(b.updated_at).diff(moment(a.updated_at))
        ),
      };
    case GET_PAGINATED_REPOS:
      return {
        ...state,
        repos: action.payload,
        loadind: false,
      };
    default:
      return state;
  }
};
