import React, { Component } from "react";
import "../../styles/RandomImageComponent.css"
import ModalImage from "react-modal-image";

class RandomImageComponent extends Component {
  state = {
    //count : "",
    //urlsBool : "",
    allMemeImgs: [],
    responseImg: ""
  };

  componentDidMount() {
    // this.setState({
    //   count: "1",
    //   urlsBool: "true"
    // })

    let url = "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";
      
    var outside;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        outside = URL.createObjectURL(response);
        this.setState({ responseImg: outside });
      });
  }
  render() {
    var imgdata = this.state.responseImg;

    return (
      <div>
        <div className="randomImg">
          <ModalImage small={imgdata} large={imgdata} alt="Random image!" />
        </div>
      </div>
    );
  }
}

export default RandomImageComponent;
