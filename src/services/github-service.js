import axios from "axios";

export default class GithubService {
  _apiBase = "https://api.github.com/";
  _imageBase = "https://starwars-visualguide.com/assets/img";

  // getResource = async (url) => {
  //   const res = await fetch(`${this._apiBase}${url}`);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}` +
  //       `, received ${res.status}`)
  //   }
  //   return await res.json();
  // };
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITHB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  };

  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
        ${process.env.REACT_APP_GITHB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  };
}
