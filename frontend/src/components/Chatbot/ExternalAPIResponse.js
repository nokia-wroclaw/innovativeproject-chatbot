import React, { Component } from "react";
import ForecastComponent from "./externalAPIComponents/ForecastComponent";
import MemeComponent from "./externalAPIComponents/MemeComponent";
import QRCodeComponent from "./externalAPIComponents/QRCodeComponent";
import BtcPriceComponent from "./externalAPIComponents/BtcPriceComponent";

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

      case "QRcode":
        displayedComponent = <QRCodeComponent params={request.responseParams} />
        break;
      case "Bitcoin":
          displayedComponent = <BtcPriceComponent params={request.responseParams} />
          break;

      default:
        displayedComponent = "";
    }

    return <div>{displayedComponent}</div>;
  }
}

export default ExternalAPIResponse;
