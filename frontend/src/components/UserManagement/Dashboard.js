import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { baseUrl } from "../../config";
import Select from "react-select";
import { Table, Tabs, Tab, Button, Icon } from "react-materialize";

class Dashboard extends Component {
  state = {
    usernames: {},
    selectedOption: null,
    adminAdded: false,
    adminAddedResponse: "",
    negativeRatedResponses: [],
    positiveRatedResponses: [],
    backupFile: ""
  };

  componentDidMount() {
    // get user list
    axios
      .get(baseUrl + "/api/users/getAllUsernames")
      .then(response => {
        this.setState({ usernames: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    // get negative & positive rated responses
    const posRating = { rating: "1" };
    const negRating = { rating: "-1" };
    axios
      .post(baseUrl + "/api/request/getRatedRequests", posRating)
      .then(response => {
        this.setState({ positiveRatedResponses: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .post(baseUrl + "/api/request/getRatedRequests", negRating)
      .then(response => {
        this.setState({ negativeRatedResponses: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setSelectedUsername = item => {
    console.log(item);
  };

  downloadBackup = type => {
    axios({
      url: baseUrl + "/api/" + type + "/getBackupFile",
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.json");
      document.body.appendChild(link);
      link.click();
    });
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
    console.log(this.state.backupFile);
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
              <h5 className="header col s12 light">Download backup file.</h5>
              <div className="row">
                <Button
                  waves="light"
                  className="blue darken-4"
                  onClick={() => this.downloadBackup("request")}
                >
                  Download requests
                  <Icon right>cloud_upload</Icon>
                </Button>
                <Button
                  waves="light"
                  className="blue darken-4"
                  onClick={() => this.downloadBackup("users")}
                >
                  Download user data
                  <Icon right>cloud_upload</Icon>
                </Button>
              </div>
            </div>
          </div>
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
          <div className="container">
            <div className="row center">
              <h5 className="header col s12 light">
                Recent negative rated responses
              </h5>
              <div>
                <div>
                  <Tabs className="tab-demo z-depth-1">
                    <Tab title="Negative rated">
                      <Table>
                        <thead>
                          <tr>
                            <th data-field="id">Request ID</th>
                            <th data-field="username">User</th>
                            <th data-field="query">Query</th>
                            <th data-field="intent">Intent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.negativeRatedResponses.map(request => (
                            <tr key={request.id}>
                              <td>{request.id}</td>
                              <td>{request.requestOwner}</td>
                              <td>{request.question}</td>
                              <td>{request.questionIntent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab title="Positive rated" active>
                      <Table>
                        <thead>
                          <tr>
                            <th data-field="id">Request ID</th>
                            <th data-field="username">User</th>
                            <th data-field="query">Query</th>
                            <th data-field="intent">Intent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.positiveRatedResponses.map(request => (
                            <tr key={request.id}>
                              <td>{request.id}</td>
                              <td>{request.requestOwner}</td>
                              <td>{request.question}</td>
                              <td>{request.questionIntent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
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
