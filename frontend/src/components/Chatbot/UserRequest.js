import React, { Component } from "react";

class UserRequest extends Component {
  render() {
    const { request } = this.props;

    return (
      <div>
          <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
            <div className="message-text">
              <div>{request.question}</div>
            </div>
            <div className="message-date">{request.date}</div>
          </div>
      </div>
    );
  }
}

export default UserRequest;
