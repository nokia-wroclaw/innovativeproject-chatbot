import React, { Component } from "react";
import ModalImage from "react-modal-image";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../config";

class QRCodeComponent extends Component {
  state = {
    data: null
  };

  async getData(params) {
    let res = await axios.post(baseUrl + "/api/services/qrcode", params);
    return await res.data;
  }

  componentDidMount() {
    const params = this.props.params;

    if (!this.state.data) {
      (async () => {
        try {
          this.setState({ data: await this.getData(params) });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  render() {
    let qrcode = "";
    if (this.state.data != null) {
      qrcode = this.state.data;
    }

    return (
      <div>
        <ModalImage small={qrcode.url} large={qrcode.url} alt="Generated QR" />
      </div>
    );
  }
}

QRCodeComponent.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(QRCodeComponent);
