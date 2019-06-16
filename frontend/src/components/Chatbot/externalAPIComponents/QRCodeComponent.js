import React, { Component } from "react";
import ModalImage from "react-modal-image";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQRFromExternalAPI } from "../../../actions/externalAPIActions";

class QRCodeComponent extends Component {
  componentDidMount() {
    this.props.getQRFromExternalAPI(this.props.params);
  }

  render() {
    const qrcode = this.props.externalData.data;

    return (
      <div>
        <ModalImage small={qrcode.url} large={qrcode.url} alt="Generated QR" />
      </div>
    );
  }
}

QRCodeComponent.propTypes = {
  externalData: PropTypes.object.isRequired,
  getQRFromExternalAPI: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  externalData: state.externalData,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getQRFromExternalAPI }
)(QRCodeComponent);
