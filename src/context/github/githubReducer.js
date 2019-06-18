import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from "../constants";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        users: [],
        loading: true
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loadind: false
      };
    default:
      return state;
  }
};
