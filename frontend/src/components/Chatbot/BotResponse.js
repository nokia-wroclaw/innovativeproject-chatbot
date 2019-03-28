import React, { Component } from "react";

class BotResponse extends Component {
  render() {
    const { request } = this.props;
    return (
        <div>
            <div className="card grey lighten-3 text-wrap chat-left box-shadow">
                <p className="black-text">
                     Bot: {request.responseText} 
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