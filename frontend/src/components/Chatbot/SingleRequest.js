import React, { Component } from "react";
import BotResponse from "./BotResponse";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;

    let data;

    if (this.props.showBotAnswer === true) {
      data = (
        <div>
        <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
        <div className="message-text"><div>{request.question}</div></div>
        <div className="message-date">{request.date}</div>
          </div>
          <BotResponse request={request} />
        </div>
      );
    } else {
      data = (
        <div>
          <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
            <div className="message-text"><div>{request.question}</div></div>
            <div className="message-date">{request.date}</div>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

export default SingleRequest;
