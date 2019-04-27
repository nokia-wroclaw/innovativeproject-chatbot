import React, { Component } from "react";
import "../../styles/MemeComponent.css";
import ModalImage from "react-modal-image";

class MemeComponent extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allMemeImgs: [],
    responseImg: ""
  };

  componentDidMount() {
    this.setState({
      topText: this.props.params.top_text,
      bottomText: this.props.params.bottom_text
    });

    let tText = this.props.params.top_text;
    tText = tText.replace(" ", "+");
    let bText = this.props.params.bottom_text;
    bText = bText.replace(" ", "+");
    let url =
      "https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=" +
      tText +
      "&bottom=" +
      bText;

    let config = {
      headers: {
        "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
        "X-RapidAPI-Key": "a081a965a4mshf1c0e056cc36ca2p10ab90jsncdd6144f1f95"
      }
    };

    var outside;

    fetch(url, config)
      .then(response => response.blob())
      .then(images => {
        outside = URL.createObjectURL(images);
        this.setState({ responseImg: outside });
      });
  }
  render() {
    var imgdata = this.state.responseImg;

    return (
      <div>
        <div className="meme">
          <ModalImage small={imgdata} large={imgdata} alt="Created meme!" />
        </div>
      </div>
    );
  }
}

export default MemeComponent;
