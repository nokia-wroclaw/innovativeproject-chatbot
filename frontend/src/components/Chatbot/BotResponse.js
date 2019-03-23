import React, { Component } from "react";

class BotResponse extends Component {
  render() {
    const { request } = this.props;
    return (
        <div>
            <div className="card grey lighten-3 text-wrap chat-left box-shadow">
                <p className="black-text">
                     Bot response: 01000011 01101111 01110101 01101100 01100100 00100000 01111001 01101111 01110101 00100000 01110010 01100101 01110000 01100101 01100001 01110100 00111111 
                </p>
                <p className="black-text">
                    Date: {request.date}
                </p>
            </div>
        </div>
    );
  }
}

export default BotResponse;