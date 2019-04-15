import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import { ImagePicker } from "react-file-picker";
import { setAvatar } from "../../actions/securityActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Settings extends Component {
  state = {
    showErrorMessage: false,
    errorMessage: "",
    imageLoadedSuccessfully: false
  };

  handleBase64 = base64 => {
    const avatarImg = {
      image: base64
    };
    this.props.setAvatar(avatarImg);
    this.setState({
      showErrorMessage: false,
      errorMessage: "",
      imageLoadedSuccessfully: true
    });
  };

  displayErrorMessage = errMsg => {
    this.setState({
      showErrorMessage: true,
      errorMessage: errMsg,
      imageLoadedSuccessfully: false
    });
  };

  render() {
    let errorMessage;
    if (this.state.showErrorMessage === true) {
      errorMessage = (
        <p className="red-text text-darken-4">{this.state.errorMessage}</p>
      );
    } else {
      errorMessage = "";
    }

    let imageLoadedMessage;
    if (this.state.imageLoadedSuccessfully === true) {
      imageLoadedMessage = (
        <p className="green-text text-darken-4">
          Image has been loaded successfully!
        </p>
      );
    }

    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          <br />
          <h1 className="header center blue-text text-darken-4">Settings</h1>
          <div className="container">
            <div className="row center">
              <h5 className="header col s12 light">Change your avatar.</h5>
              <div>
                <ImagePicker
                  extensions={["jpg", "jpeg", "png"]}
                  dims={{
                    minWidth: 100,
                    maxWidth: 1000,
                    minHeight: 100,
                    maxHeight: 1000
                  }}
                  onChange={base64 => this.handleBase64(base64)}
                  onError={errMsg => this.displayErrorMessage(errMsg)}
                >
                  <Button waves="light" className="blue darken-4">
                    upload avatar
                    <Icon right>cloud_upload</Icon>
                  </Button>
                </ImagePicker>
                {imageLoadedMessage}
                {errorMessage}
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  errors: PropTypes.object.isRequired,
  setAvatar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { setAvatar }
)(Settings);
