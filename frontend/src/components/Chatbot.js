import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequests, createRequest } from "../actions/requestActions";
import { logout } from "../actions/securityActions";
import PropTypes from "prop-types";
import UserRequest from "./Chatbot/UserRequest";
import BotResponse from "./Chatbot/BotResponse";
import IdleTimer from "react-idle-timer";

class Chatbot extends Component {
  state = {
    question: "",
    message: "",
    loading: false,
    currentQuestion: "",
    requestsLength: ""
  };

  onIdle = e => {
    this.props.logout();
    window.location.href = "/login";
  };

  componentDidMount() {
    this.props.getRequests();
    this.scrollToBottom();
    this.nameInput.focus();
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

  onSubmit = length => e => {
    e.preventDefault();
    const len = length + 1;
    this.setState({
      currentQuestion: this.state.question,
      requestsLength: len
    });
    this.getRequest(len);
  };

  getRequest = (len) => {
    const newRequest = {
      question: this.state.question
    };
    this.props.createRequest(newRequest, this.props.history);
    this.setState({
      requestsLength: len
    });
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
    let stateLength = this.state.requestsLength;
    console.log("render: " + length);
    console.log("state: " + stateLength);

    let temporaryQuestion;
    if (length >= this.state.requestsLength) {
      temporaryQuestion = "";
    } else {
      const tempRequest = {
        requestOwner: "User",
        question: this.state.currentQuestion,
        responseText: "",
        responseType: ""
      };
      temporaryQuestion = (
        <div>
          <UserRequest key={"temp"} request={tempRequest} />
          <BotResponse key={"tempbot"} request={tempRequest} />
        </div>
      );
    }

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
            ref={div => {
              this.messageList = div;
            }}
          >
            {requests.map(request => (
              <div key={request.id}>
                <UserRequest request={request} />
                <BotResponse request={request} />
              </div>
            ))}
            {temporaryQuestion}
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
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getRequests, createRequest, logout }
)(Chatbot);
