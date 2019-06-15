import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBtcFromExternalAPI } from "../../../actions/externalAPIActions";

class BtcPriceComponent extends Component {
  componentDidMount() {
    this.props.getBtcFromExternalAPI(this.props.params);
  }

  render() {
    const btcPrice = this.props.externalData.data;

    let data;
    if (btcPrice.length !== 0) {
      data = (
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h3>{btcPrice.last} USD</h3>
              <h5>24H High: {btcPrice.high} USD</h5>
              <h5>24H Low: {btcPrice.low} USD</h5>
            </div>
          </div>
        </div>
      );
    } else {
      data = (
        <div>
          <blockquote>Cannot get Bitcoin price from API...</blockquote>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

BtcPriceComponent.propTypes = {
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
  { getBtcFromExternalAPI }
)(BtcPriceComponent);
