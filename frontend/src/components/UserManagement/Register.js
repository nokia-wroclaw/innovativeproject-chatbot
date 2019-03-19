import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  state = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.createNewUser(newUser, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br />
            <br />
            <h1 className="header center blue-text text-darken-4">Register</h1>
            <div className="row center">
              <h5 className="header col s12 light">
                Sign Up. Enter Your details.
              </h5>
            </div>
            <div className="container">
              <div className="row">
                <form
                  onSubmit={this.onSubmit}
                  className="col s12 m12 l12 xl8 offset-xl2"
                >
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="fullName"
                      type="text"
                      className="validate"
                      placeholder="Full Name"
                      value={this.state.fullName}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      Please enter Your full name
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="username"
                      type="email"
                      className="validate"
                      placeholder="Email"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      Please enter Your e-mail
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="password"
                      type="password"
                      className="validate"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      Please enter Your password
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="confirmPassword"
                      type="password"
                      className="validate"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      Please confirm Your password
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      className="waves-effect waves-light btn-large green darken-2 col col s12 m12 l12 xl8 offset-xl2 btn-trial-consultor valign-wrapper"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);
