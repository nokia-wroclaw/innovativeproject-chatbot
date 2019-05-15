import React, { Component } from "react";
import watsonAvatar from "../../assets/avatars/watson.png";

class EmptyResponse extends Component {

  render() {
    const avatar = (
      <div className="avatar-bg">
        <img src={watsonAvatar} alt="watson-avatar" className="avatar-image" />
      </div>
    );

    let data = (
      <div>
        <div className="card grey lighten-3 text-wrap chat-left box-shadow">
          {avatar}
          <div className="message-text">
            Welcome to the Innovative Nokia Chatbot!
          </div>
        </div>
      </div>
    );
    return <div>{data}</div>;
  }
}

export default EmptyResponse;
