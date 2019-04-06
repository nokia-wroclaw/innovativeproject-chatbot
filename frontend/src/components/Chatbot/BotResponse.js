import React, { Component } from "react";
import ExternalAPIResponse from "./ExternalAPIResponse";

class BotResponse extends Component {
  state = {
    responseRating: ""
  };

  handleBtnClick = id => {
    this.setState({
      responseRating: id
    });
    console.log(this.state.responseRating);
  };

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
            <div className="like-icons">
              <div className="row">
                <span onClick={() => this.handleBtnClick("like")}>
                  <i className="tiny material-icons icon-green">thumb_up</i>
                </span>
                <span onClick={() => this.handleBtnClick("dislike")}>
                  <i className="tiny material-icons icon-red">thumb_down</i>
                </span>
              </div>
            </div>
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
