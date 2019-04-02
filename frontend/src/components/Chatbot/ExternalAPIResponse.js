import React, { Component } from "react";
import ForecastComponent from "./externalAPIComponents/ForecastComponent";
import MemeComponent from "./externalAPIComponents/MemeComponent";

class ExternalAPIResponse extends Component {
  render() {
    const { request } = this.props;
    var displayedComponent = "";

    switch (request.responseType) {
      case "weather":
        displayedComponent = (
          <ForecastComponent params={request.responseParams} />
        );
        break;

      case "meme":
        displayedComponent = <MemeComponent params={request.responseParams} />;
        break;

      default:
        displayedComponent = "";
    }

    return <div>{displayedComponent}</div>;
  }
}

export default ExternalAPIResponse;
