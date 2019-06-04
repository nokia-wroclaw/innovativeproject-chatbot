import React, { Component } from "react";
import ForecastComponent from "./externalAPIComponents/ForecastComponent";
import MemeComponent from "./externalAPIComponents/MemeComponent";
import RandomImageComponent from "./externalAPIComponents/RandomImageComponent";

class ExternalAPIResponse extends Component {
  render() {
    const { request } = this.props;
    var displayedComponent = "";

    switch (request.responseType) {
      case "General_Weather":
        displayedComponent = (
          <ForecastComponent params={request.responseParams} />
        );
        break;

      case "Memes":
        displayedComponent = <MemeComponent params={request.responseParams} />;
        break;

      case "Random":
        console.log('Udalo sie')
        displayedComponent = <RandomImageComponent />;
        break;

      default:
        displayedComponent = "";
    }

    return <div>{displayedComponent}</div>;
  }
}

export default ExternalAPIResponse;
