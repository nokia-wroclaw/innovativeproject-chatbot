import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
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
                <form className="col s12 m12 l12 xl8 offset-xl2">
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      id="email"
                      type="email"
                      className="validate"
                      placeholder="Email"
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
                      id="password"
                      type="password"
                      className="validate"
                      placeholder="Password"
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
                      id="password"
                      type="password"
                      className="validate"
                      placeholder="Confirm Password"
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
                    <Link
                      to="/register"
                      id="download-button"
                      className="waves-effect waves-light btn-large green darken-2 col col s12 m12 l12 xl8 offset-xl2 btn-trial-consultor valign-wrapper"
                    >
                      Sign Up
                    </Link>
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

export default Register;
