import React, { Component } from "react";
import ModalImage from "react-modal-image";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRandomImageFromExternalAPI } from "../../../actions/externalAPIActions";

class RandomImageComponent extends Component {
  componentDidMount() {
    this.props.getRandomImageFromExternalAPI(this.props.params);
  }

  render() {
    const randomimg = this.props.externalData.data;

    return (
      <div>
        <ModalImage small={randomimg.url} large={randomimg.url} alt="Random image!" />
      </div>
    );
  }
}

RandomImageComponent.propTypes = {
  externalData: PropTypes.object.isRequired,
  getRandomImageFromExternalAPI: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  externalData: state.externalData,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRandomImageFromExternalAPI }
)(RandomImageComponent);