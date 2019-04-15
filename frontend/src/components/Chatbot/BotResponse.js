import React, { Component } from "react";
import ExternalAPIResponse from "./ExternalAPIResponse";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { rateResponse } from "../../actions/requestActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import watsonAvatar from "../../assets/avatars/watson.png";

class BotResponse extends Component {
  state = {
    responseRating: "",
    classButtonUp: "btn-floating btn blue",
    classButtonDown: "btn-floating btn red"
  };

  handleBtnClick = id => {
    var ratingNumb = id === "liked" ? 1 : -1;
    var rating = {
      id: this.props.request.id,
      username: this.props.request.requestOwner,
      rating: ratingNumb
    };
    this.props.rateResponse(rating);
    if(ratingNumb === 1){
      this.setState({
        classButtonUp: "btn-floating btn green",
        classButtonDown: "btn-floating btn red"
      })
      } else{
      this.setState({ 
        classButtonUp: "btn-floating btn blue",
        classButtonDown: "btn-floating btn green"
      })
    }
  };

  createMarkup = msg => {
    return { __html: msg };
  };

  render() {
    const avatar = (
      <div className="avatar-bg">
        <img src={watsonAvatar} alt="watson-avatar" className="avatar-image" />
      </div>
    );

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
                <button
                  onClick={(e) => {
                    this.handleBtnClick("liked");
                    e.preventDefault()
                  }}
                  className={this.state.classButtonUp}
                  id={request.id}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button
                  onClick={() => this.handleBtnClick("disliked")}
                  className={this.state.classButtonDown}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
              </div>
            </div>
            {avatar}
            <div className="message-text">
              <div dangerouslySetInnerHTML={this.createMarkup(responseText)} />
            </div>
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
