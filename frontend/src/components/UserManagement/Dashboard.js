import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { baseUrl } from "../../config";
import Select from "react-select";

class Dashboard extends Component {
  state = {
    usernames: {},
    selectedOption: null,
    adminAdded: false,
    adminAddedResponse: ""
  };

  componentDidMount() {
    axios
      .get(baseUrl + "/api/users/getAllUsernames")
      .then(response => {
        this.setState({ usernames: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setSelectedUsername = item => {
    console.log(item);
  };

  handleChange = selectedOption => {
    const toUsername = selectedOption.value;
    const toUser = {
      username: toUsername
    };
    axios
      .post(baseUrl + "/api/users/giveAdmin", toUser)
      .then(response => {
        this.setState({
          adminAddedResponse: response.data.status
        });
      })
      .catch(function(error) {
        this.setState({
          adminAddedResponse: error
        });
      });

    this.setState({ selectedOption });
    this.setState({
      adminAdded: true
    });
  };

  render() {
    let options = [];
    const names = this.state.usernames;

    for (let name in names) {
      let newItem = {
        value: name,
        label: name
      };
      options.push(newItem);
    }

    let adminAddedMessage;
    if (this.state.adminAdded === true && this.state.selectedOption != null) {
      adminAddedMessage = (
        <p className="green-text text-darken-4">
          {this.state.adminAddedResponse}
        </p>
      );
    }

    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          <br />
          <h1 className="header center blue-text text-darken-4">
            Admin Dashboard
          </h1>
          <div className="container">
            <div className="row center">
              <h5 className="header col s12 light">Add admin rights.</h5>
              <div>
                <div>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={options}
                  />
                </div>
                {adminAddedMessage}
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
