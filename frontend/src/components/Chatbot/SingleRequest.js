import React, { Component } from "react";
import BotResponse from "./BotResponse";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;
    return (
    <div>
      <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
        <p className="black-text">
          {request.requestOwner}: {request.question}
        </p>
        <p className="black-text">
          Date: {request.date}
        </p>
      </div>
      <BotResponse request={request}/>
    </div>
    );
  }
}

export default SingleRequest;
