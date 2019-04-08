import React, { Component } from "react";
import ExternalAPIResponse from "./ExternalAPIResponse";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { rateResponse } from "../../actions/requestActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

class BotResponse extends Component {
  state = {
    responseRating: ""
  };

  handleBtnClick = id => {
    var ratingNumb = id === "liked" ? 1 : -1;
    var rating = {
      id: this.props.request.id,
      username: this.props.request.requestOwner,
      rating: ratingNumb
    };
    this.props.rateResponse(rating);
  };

  createMarkup = msg => {
    return { __html: msg };
  };

  render() {
    const { request } = this.props;
    const externalAPIResponse = request.responseType ? (
      <ExternalAPIResponse request={request} />
    ) : (
      ""
    );
    const responseText = request.responseText;
    const responseDate = request.date;

    let data;
    if (request.responseText === "") {
      data = (
        <div>
          <div className="card grey lighten-3 text-wrap chat-left box-shadow">
            IBM Watson is thinking...
            <div id="wave">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
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
                <div
                  onClick={() => this.handleBtnClick("liked")}
                  className="btn-floating btn blue"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div
                  onClick={() => this.handleBtnClick("disliked")}
                  className="btn-floating btn red"
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </div>
              </div>
            </div>
            <div className="message-text"><div dangerouslySetInnerHTML={this.createMarkup(responseText)} /></div>
            <div>{externalAPIResponse}</div>
            <div className="message-date">{responseDate}</div>
          </div>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

BotResponse.propTypes = {
  rateResponse: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { rateResponse }
)(BotResponse);
