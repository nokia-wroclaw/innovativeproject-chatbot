import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout, getIsAdmin } from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Divider } from "react-materialize";
import { Modal, Button } from "react-materialize";

class Navbar extends Component {
  logout = e => {
    this.props.logout();
    window.location.href = "/";
  };

  componentDidMount() {
    this.props.getIsAdmin();
  }

  render() {
    const { validToken, user } = this.props.security;

    const trigger = <div className="blue-text text-darken-4">New Context</div>;

    let dropdownLinks;
    if (this.props.security.isAdmin) {
      dropdownLinks = (
        <Dropdown
          trigger={
            <li>
              <NavLink to="/chatbot">
                <FontAwesomeIcon icon={faBars} />{" "}
              </NavLink>
            </li>
          }
        >
          <NavLink className="blue-text text-darken-4" to="/chatbot">
            <Modal trigger={trigger}>
              <p>Do you want to create a new conversation with IBM Watson?</p>
              <Button>Yes</Button>
            </Modal>
          </NavLink>
          <Divider />
          <NavLink className="blue-text text-darken-4" to="/dashboard">
            Dashboard
          </NavLink>
          <Divider />
          <NavLink className="blue-text text-darken-4" to="/settings">
            Settings
          </NavLink>
          <Divider />
          <NavLink
            className="blue-text text-darken-4"
            to="/logout"
            onClick={this.logout.bind(this)}
          >
            Logout
          </NavLink>
          <Divider />
        </Dropdown>
      );
    } else {
      dropdownLinks = (
        <Dropdown
          trigger={
            <li>
              <NavLink to="/chatbot">
                <FontAwesomeIcon icon={faBars} />{" "}
              </NavLink>
            </li>
          }
        >
          <NavLink className="blue-text text-darken-4" to="/chatbot">
            <Modal trigger={trigger}>
              <p>Do you want to create a new conversation with IBM Watson?</p>
              <Button>Yes</Button>
            </Modal>
          </NavLink>
          <Divider />
          <NavLink className="blue-text text-darken-4" to="/settings">
            Settings
          </NavLink>
          <Divider />
          <NavLink
            className="blue-text text-darken-4"
            to="/logout"
            onClick={this.logout.bind(this)}
          >
            Logout
          </NavLink>
          <Divider />
        </Dropdown>
      );
    }

    const userIsAuthenticated = (
      <ul className="right">
        <li>
          <NavLink to="/chatbot">
            <FontAwesomeIcon icon={faUser} />{" "}
            {this.props.security.user.fullName}
          </NavLink>
        </li>
        {dropdownLinks}
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
      <div>
        <nav className="nav-wrapper blue darken-4">
          <div className="container">
            <NavLink to="/" className="brand-logo left">
              Nokia Chatbot
            </NavLink>
            {headerLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  getIsAdmin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout, getIsAdmin }
)(withRouter(Navbar));
