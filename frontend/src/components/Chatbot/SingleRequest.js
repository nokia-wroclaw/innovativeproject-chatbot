import React, { Component } from "react";

class SingleRequest extends Component {
  render() {
    const { request } = this.props;
    return (
      <div className="card blue darken-4 text-wrap">
        <p className="white-text">
          query: {request.question}
        </p>
        <p className="white-text">
          date: {request.date}
        </p>
      </div>
    );
  }
}

export default SingleRequest;
