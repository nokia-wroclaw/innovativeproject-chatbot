import React, { Component } from "react";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;
    return (
    <div>
      <div className="card blue darken-3 text-wrap chat-right box-shadow">
        <p className="black-text">
          query: {request.question}
        </p>
        <p className="black-text">
          date: {request.date}
        </p>
      </div>
      <div className="card grey lighten-1 text-wrap chat-left box-shadow">
        <p className="black-text">
          Bot
        </p>
        <p className="black-text">
          Bot
        </p>
      </div>
    </div>
    );
  }
}

export default SingleRequest;
