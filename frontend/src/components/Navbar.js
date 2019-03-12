import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-wrapper blue darken-4">
        <div className="container">
          <NavLink to="/" className="brand-logo left">
            Nokia Chatbot
          </NavLink>
          <ul className="right">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
