import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRequests,
  createRequest,
  addTempRequest
} from "../actions/requestActions";
import { logout, getAvatar } from "../actions/securityActions";
import PropTypes from "prop-types";
import UserRequest from "./Chatbot/UserRequest";
import BotResponse from "./Chatbot/BotResponse";
import IdleTimer from "react-idle-timer";
import EmptyResponse from "./Chatbot/EmptyResponse";

class Chatbot extends Component {
  state = {
    question: "",
    message: "",
    getRequestPages: 0
  };

  onIdle = e => {
    this.props.logout();
    window.location.href = "/login";
  };

  getUserRequestsPages = numbOfPages => {
    let pages = {
      page: numbOfPages
    };
    this.props.getRequests(pages);
  };

  loadMoreMessagesAction = () => {
    this.setState((prevState, props) => ({
      getRequestPages: prevState.getRequestPages + 1
    }));
    this.getUserRequestsPages(this.state.getRequestPages + 1);
  };

  componentDidMount() {
    this.getUserRequestsPages(this.state.getRequestPages);
    this.scrollToBottom();
    this.nameInput.focus();
    // if not logged in redirect to login page
    if (!this.props.security.validToken) {
      window.location.href = "/login";
    }
    // set user avatar (if not set)
    this.props.getAvatar();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.state.getRequestPages === 0) {
      const scrollHeight = this.messageList.scrollHeight;
      const height = this.messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  LoadMoreMessages = () => {
    if (this.messageList.scrollTop === 0) {
      var element = document.getElementById("loader");
      element.classList.add("spinner");
      this.loadMoreMessagesAction();
      setTimeout(function() {
        element.classList.remove("spinner");
      }, 500);
      this.messageList.scrollTop = 1;
    }
  };

  onSubmit = length => e => {
    e.preventDefault();

    // save temp question in redux store
    this.props.addTempRequest(this.state.question);

    // set default number of pages to 0
    this.setState({
      getRequestPages: 0
    });

    // get response from backend
    const newRequest = {
      question: this.state.question
    };
    this.props.createRequest(newRequest, this.props.history);
    this.scrollToBottom();
  };

  logout = e => {
    this.logout.bind(this);
    window.location.href = "/";
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { requests } = this.props.request;
    let length = Object.keys(requests).length;

    let requestList = requests.map(request => (
      <div key={request.id}>
        <UserRequest request={request} />
        <BotResponse request={request} />
      </div>
    ));

    requestList.unshift(<div key="hello"><EmptyResponse /></div>);

    return (
      <div>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onIdle={this.onIdle}
          debounce={250}
          timeout={1000 * 60 * 5}
        />
        <div className="container">
          <h4 className="center">Chatbot</h4>
          <div
            className="chat-box grey lighten-2 MessageList"
            onScroll={this.LoadMoreMessages}
            ref={div => {
              this.messageList = div;
            }}
          >
            <div id="loader">
              <div />
              <div />
              <div />
              <div />
            </div>
            {requestList}
          </div>
          <div>
            <form onSubmit={this.onSubmit(length)} className="row submit-query">
              <input
                ref={input => {
                  this.nameInput = input;
                }}
                className="col s10"
                name="question"
                id="text"
                type="text"
                placeholder="Your message"
                value={this.state.question}
                onChange={this.onChange}
              />
              <input
                className="waves-effect waves-light btn-small green darken-2 btn-trial-consultor col s2"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Chatbot.propTypes = {
  request: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getAvatar: PropTypes.func.isRequired,
  addTempRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getRequests, createRequest, logout, getAvatar, addTempRequest }
)(Chatbot);
