import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import UserItem from "./components/users/UserItem";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <UserItem />
        <header className="App-header" />
        <h1>hi</h1>
      </div>
    );
  }
}
