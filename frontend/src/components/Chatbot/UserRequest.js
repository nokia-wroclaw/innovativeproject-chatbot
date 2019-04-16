import React, { Component } from "react";
import userDefaultAvatar from "../../assets/avatars/userDefault.png";
import { connect } from "react-redux";

class UserRequest extends Component {
  render() {
    const { request } = this.props;

    let avatar;
    if (this.props.security.avatar === "") {
      avatar = (
        <div className="avatar-bg">
          <img
            src={userDefaultAvatar}
            alt="user-default-avatar"
            className="avatar-image"
          />
        </div>
      );
    } else {
      avatar = <div className="avatar-bg">
        <img
          src={this.props.security.avatar}
          alt="user-avatar"
          className="avatar-image"
        />
      </div>;
    }

    return (
      <div>
        <div className="card indigo lighten-5 text-wrap chat-right box-shadow">
          {avatar}
          <div className="message-text">
            <div>{request.question}</div>
          </div>
          <div className="message-date">{request.date}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  null
)(UserRequest);
