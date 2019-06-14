import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import { Search } from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

//rce as a shortcut
export default class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    });
    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { users, loading, alert } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
