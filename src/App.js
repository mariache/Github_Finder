import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";
import { ErrorBoundry } from "./components/layout/ErrorBoundry";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <ErrorBoundry>
          <Router>
            <div className="App">
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </ErrorBoundry>
      </AlertState>
    </GithubState>
  );
};

export default App;
