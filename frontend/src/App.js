import "./styles/App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Layout/Navbar";
import Chatbot from "./components/Chatbot";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
              {
                // Public Routes
              }
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/chatbot" component={Chatbot} />
              {
                // Private Routes
              }
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
