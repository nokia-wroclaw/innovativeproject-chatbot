import React, { Component } from "react";
import BotResponse from "./BotResponse";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;

    let data;

    if(this.props.showBotAnswer === true) {
      data = (
        <div>
          <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
            <p className="black-text">{request.question}</p>
            <div className="like-icons">{request.date}</div>
          </div>
          <BotResponse request={request} />
        </div>
      );
    } else {
      data = (<div>
        <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
          <p className="black-text">{request.question}</p>
          <div className="like-icons">{request.date}</div>
        </div>
      </div>)
    }

    return (<div>{data}</div>);
  }
}

export default SingleRequest;
