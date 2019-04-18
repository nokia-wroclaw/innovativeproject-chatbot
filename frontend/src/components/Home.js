import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../config";

class Home extends Component {
  state = {
    hello: ""
  };

  componentDidMount() {
    console.log(baseUrl + `/api/test/`);
    axios.get(baseUrl + `/api/test/`).then(res => {
      const response = res.data;
      this.setState({ hello: response.hello });
    });
  }

  render() {
    const name = this.state.hello ? this.state.hello : "no connection :(";
    return (
      <div className="container">
        <div className="center">
          <div className="col s12 m7">
            <div className="card">
              <div className="card-content">
                <h1>Hello {name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
