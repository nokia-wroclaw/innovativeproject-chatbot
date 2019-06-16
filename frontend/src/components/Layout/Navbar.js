import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import {
//   getRequests,
// } from "../../actions/requestActions";
// import {
//   logout,
//   getIsAdmin,
//   clearConversation
// } from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-materialize";
import { Modal, Button } from "react-materialize";

class Navbar extends Component {
  logout = e => {
    this.props.logout();
    window.location.href = "/";
  };

  componentDidMount() {
    // this.props.getIsAdmin();
  }

  clearUserConversation = () => {
    this.props.clearConversation();
    let pages = {
      page: 0
    };
    this.props.getRequests(pages);
  };

  render() {
    //do poprawienia -> w jaki sposob rozpoznawac bedziemy admina?
    // const isAdmin = this.props.security.isAdmin;
    const isAdmin = false;

    const trigger = <div className="blue-text text-darken-4">New Context</div>;

    let dropdownLinks;
    
    if (isAdmin) {
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
              <Button
                waves="light"
                className="blue darken-4"
                onClick={() => this.clearUserConversation()}
              >
                Yes
              </Button>
            </Modal>
          </NavLink>

          <NavLink className="blue-text text-darken-4" to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink className="blue-text text-darken-4" to="/settings">
            Settings
          </NavLink>

          <NavLink
            className="blue-text text-darken-4"
            to="/logout"
            onClick={this.logout.bind(this)}
          >
            Logout
          </NavLink>
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
              <Button
                waves="light"
                className="blue darken-4"
                onClick={() => this.clearUserConversation()}
              >
                Yes
              </Button>
            </Modal>
          </NavLink>

          <NavLink className="blue-text text-darken-4" to="/settings">
            Settings
          </NavLink>
          <NavLink className="blue-text text-darken-4" to="/">
              <p onClick={this.props.onLogout}>Logout</p>
          </NavLink>
        </Dropdown>
      );
    }

    return (
      <div>
        <nav className="nav-wrapper blue darken-4">
          <div className="container">
            <NavLink to="/" className="brand-logo left">
            Innovative Chatbot
            </NavLink>
              { this.props.authenticated ? (
                    <ul className="right">
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        {dropdownLinks}
                    </ul>
                ): (
                  <ul className="right">
                      <li>
                          <NavLink to="/">Home</NavLink>
                      </li>
                      <li>
                          <NavLink to="/login">Login</NavLink>        
                      </li>
                      <li>
                          <NavLink to="/register">Register</NavLink>        
                      </li>
                  </ul>
              )}
          </div>
        </nav>
      </div>
    );
  }
}

// Navbar.propTypes = {
//   logout: PropTypes.func.isRequired,
//   security: PropTypes.object.isRequired,
//   getIsAdmin: PropTypes.func.isRequired,
//   clearConversation: PropTypes.func.isRequired,
//   getRequests: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   security: state.security
// });

// export default connect(
//   mapStateToProps,
//   { logout, getIsAdmin, clearConversation, getRequests }
// )(withRouter(Navbar));

export default Navbar;