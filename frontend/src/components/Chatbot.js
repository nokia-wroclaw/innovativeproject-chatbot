import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests, createRequest } from "../actions/requestActions";
import { logout } from "../actions/securityActions"
import PropTypes from "prop-types";
import SingleRequest from "./Chatbot/SingleRequest";

import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../actions/types";
import store from "../store";

class Chatbot extends Component {
  state = {
    question: "",
    message: ""
  };

  componentDidMount() {
    this.props.getRequests();

    // temporary logout handler
    const jwtToken = localStorage.jwtToken;
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded = jwt_decode(jwtToken);
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // handle logout
        console.log("you're logged out")
        window.location.href="/login";
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newRequest = {
      question: this.state.question
    };
    this.props.createRequest(newRequest, this.props.history);

    // temporary refresh update
    this.forceUpdate();
  };

  logout = e => {
    this.props.logout();
    window.location.href = "/";
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { requests } = this.props.request;
    return (
      <div className="container">
        <h4 className="center">Chatbot</h4>
        <div className="row">
          {requests.map(request => (
            <SingleRequest key={request.id} request={request} />
          ))}
        </div>
        <div>
          <form onSubmit={this.onSubmit} className="row">
            <input
              className="col s10"
              name="question"
              id="text"
              type="text"
              placeholder="Your message"
              value={this.state.username}
              onChange={this.onChange}
            />
            <input
              className="waves-effect waves-light btn-small green darken-2 btn-trial-consultor col s2"
              type="submit"
            />
          </form>
        </div>
        <form onSubmit={this.logout} className="row center">
        <input
              className="waves-effect waves-light btn-small red darken-2 btn-trial-consultor"
              type="submit"
              value="logout"
            />
        </form>
      </div>
    );
  }
}

Chatbot.propTypes = {
  request: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRequests, createRequest, logout }
)(Chatbot);
