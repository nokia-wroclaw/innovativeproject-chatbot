import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
import classnames from "classnames";
import LoadingSpinner from "../LoadingSpinner";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    loading: false
  };

  onSubmit = e => {
    e.preventDefault();
    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(loginRequest);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/chatbot");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.props;
    let data;
    if (this.state.loading) {
      data = <LoadingSpinner />;
    } else {
      data = (
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br />
            <br />
            <h1 className="header center blue-text text-darken-4">Login</h1>
            <div className="row center">
              <h5 className="header col s12 light">Log In to Your Account.</h5>
            </div>
            <div className="container">
              <div className="row">
                <form
                  onSubmit={this.onSubmit}
                  className="col s12 m12 l12 xl8 offset-xl2"
                >
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="username"
                      id="email"
                      type="email"
                      className={classnames("validate", {
                        "is-invalid": errors.username
                      })}
                      placeholder="Email"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      {errors.username && (
                        <div className="red-text text-darken-2">
                          {errors.username}
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <input
                      name="password"
                      type="password"
                      className={classnames("validate", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      {errors.password && (
                        <div className="red-text text-darken-2">
                          {errors.password}
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                    <div className="input-field col s12 m12 l12 xl8 offset-xl2">
                      <input
                        className="waves-effect waves-light btn-large green darken-2 col col s12 m12 l12 xl8 offset-xl2 btn-trial-consultor valign-wrapper"
                        type="submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      );
    }
    return <div>{data}</div>;
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
