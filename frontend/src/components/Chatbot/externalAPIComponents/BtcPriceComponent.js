import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../config";

class BtcPriceComponent extends Component {
  state = {
    data: null
  };

  async getBTCPrice(params) {
    let res = await axios.post(baseUrl + "/api/services/btcPrice", params);
    return await res.data;
  }

  componentDidMount() {
    const params = this.props.params;
    if (!this.state.data) {
      (async () => {
        try {
          this.setState({ data: await this.getBTCPrice(params) });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  render() {
    let btcPrice = "";
    if (this.state.data != null) {
      btcPrice = this.state.data;
    }

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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(BtcPriceComponent);
