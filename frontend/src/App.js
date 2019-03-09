import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

    state = {
        hello: ""
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/test/`)
          .then(res => {
            const response = res.data;
            this.setState({ hello: response.hello });
          })
      }

    render() {
        const name = (this.state.hello)? this.state.hello: "no connection :(";
        return(
            <div>
            <h1 className="alert alert-warning">Hello {name}</h1>
            </div>
        )
    }
}

export default App