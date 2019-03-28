import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests, createRequest } from "../actions/requestActions";
import PropTypes from "prop-types";
import SingleRequest from "./Chatbot/SingleRequest";
import LoadingSpinner from "./LoadingSpinner";

class Chatbot extends Component {
  state = {
    question: "",
    message: "",
    loading: false
  };

  componentDidMount() {
    this.props.getRequests();
    this.scrollToBottom();
    // if not logged in redirect to login page
    if (!this.props.security.validToken) {
      window.location.href = "/login";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  scrollToBottom = () => {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  componentDidUpdate() {
    this.scrollToBottom();
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
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { requests } = this.props.request;
    let data;
    if (this.state.loading) {
      data = <LoadingSpinner />;
    } else {
      data = (
        <div className="container">
          <h4 className="center">Chatbot</h4>
          <div
            className="chat-box grey lighten-2 MessageList"
            ref={div => {
              this.messageList = div;
            }}
          >
            {requests.map(request => (
              <SingleRequest key={request.id} request={request} />
            ))}
          </div>
          <div>
            <form onSubmit={this.onSubmit} className="row submit-query">
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
        </div>
      );
    }
    return <div>{data}</div>;
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
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getRequests, createRequest }
)(Chatbot);
