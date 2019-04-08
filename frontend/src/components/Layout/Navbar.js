import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  logout = e => {
    this.props.logout();
    window.location.href = "/";
  };

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <ul className="right">
        <li>
          <NavLink to="/chatbot">Chatbot</NavLink>
        </li>
        <li>
          <NavLink to="/logout" onClick={this.logout.bind(this)}>
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink to="/chatbot">
            <FontAwesomeIcon icon={faUser} />
            {" "}{this.props.security.user.fullName}
          </NavLink>
        </li>
      </ul>
    );

    const userIsNotAuthenticated = (
      <ul className="right">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    );

    let headerLinks;
    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="nav-wrapper blue darken-4">
        <div className="container">
          <NavLink to="/" className="brand-logo left">
            Nokia Chatbot
          </NavLink>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
