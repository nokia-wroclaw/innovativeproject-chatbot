import React, { Component } from "react";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;
    return (
      <div className="card blue darken-4">
      <p className="white-text">
          <b>query ID:</b> {request.id}
        </p>
        <p className="white-text">
          <b>username:</b> {request.requestOwner}
        </p>
        <p className="white-text">
        <b>query:</b> {request.question}
        </p>
        <p className="white-text">
          <b>date:</b> {request.date}
        </p>
      </div>
    );
  }
}

export default SingleRequest;
