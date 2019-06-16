import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../styles/ForecastComponent.css";
import { baseUrl } from "../../../config";
import axios from "axios";

class ForecastComponent extends Component {
  state = {
    data: null
  };

  async getForecast(params) {
    let res = await axios.post(baseUrl + "/api/services/weather", params);
    return await res.data;
  }

  componentDidMount() {
    const params = this.props.params;
    if (!this.state.data) {
      (async () => {
        try {
          this.setState({ data: await this.getForecast(params) });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  render() {
    const params = this.props.params;

    let forecast = "";
    if (this.state.data != null) {
      forecast = this.state.data;
    }

    let icon;
    if (forecast.main === "Clear") {
      icon = <i className="large material-icons icon-sun">wb_sunny</i>;
    } else {
      icon = <i className="large material-icons icon-cloud">cloud</i>;
    }

    let data;
    if (forecast.length !== 0) {
      data = (
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <div className="row">
                <div className="col">{icon}</div>
                <div className="col">
                  <h5>{params.location}</h5>
                  <h3>{forecast.temperature} ℃</h3>
                </div>
              </div>
            </div>
            <div className="card-action">{params.date}</div>
          </div>
        </div>
      );
    } else {
      data = (
        <div>
          <blockquote>Cannot get weather from API...</blockquote>
        </div>
      );
    }

    return <div>{data}</div>;
  }
}

ForecastComponent.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(ForecastComponent);
