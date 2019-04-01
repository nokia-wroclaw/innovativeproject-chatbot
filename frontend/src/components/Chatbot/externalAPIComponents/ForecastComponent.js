import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDataFromExternalAPI } from "../../../actions/externalAPIActions";
import "../../styles/ForecastComponent.css";

class ForecastComponent extends Component {
  componentDidMount() {
    this.props.getDataFromExternalAPI(this.props.params);
  }

  render() {
    const forecast = this.props.externalData.data;
    const params = this.props.params;
    console.log(forecast);

    let data;
    if (forecast.length !== 0) {
      data = (
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <div className="row">
                <div className="col">
                  <i className="large material-icons icon-sun">wb_sunny</i>
                </div>
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
  externalData: PropTypes.object.isRequired,
  getDataFromExternalAPI: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  externalData: state.externalData,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getDataFromExternalAPI }
)(ForecastComponent);

// <div>
//           city: {params.location} <br />
//           status: {forecast.main} <br />
//           temperature: {forecast.temperature}
//         </div>
