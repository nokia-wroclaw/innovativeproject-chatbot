import "./styles/App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Landing from "./components/Layout/Landing"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            {
              // Public Routes
            }
            <Route exact path="/" component={Landing} />
            <Route path="/about" component={About} />
            {
              // Private Routes
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
