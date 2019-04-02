import React, { Component } from "react";
import ExternalAPIResponse from "./ExternalAPIResponse";

class BotResponse extends Component {
  render() {
    const { request } = this.props;
    const externalAPIResponse = request.responseType ? (
      <ExternalAPIResponse request={request} />
    ) : (
      ""
    );

    let data;
    if (request.responseText === "") {
      data = (
        <div>
          <div className="card grey lighten-3 text-wrap chat-left box-shadow">
            bot is thinking...
            <div className="progress">
              <div className="indeterminate" />
            </div>
          </div>
        </div>
      );
    } else {
      data = (
        <div>
          <div className="card grey lighten-3 text-wrap chat-left box-shadow">
            <p className="black-text">Bot: {request.responseText}</p>
            <div>{externalAPIResponse}</div>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

export default BotResponse;
