import React, { Component } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyDgtiwm65VYWDWsvoNXWKcV2lbcCTkYypY",
  authDomain: "innovativeproject-chatbot.firebaseapp.com"
})

class Landing extends Component {
  state = {
    isSignedIn: false
  } 
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  componentDidMount = () => {
    console.log(this.state.isSignedIn);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user});
      if(this.state.isSignedIn) {
        //  this.props.history.push("/chatbot");
      }
    })
  }

  firebaseSignOut = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br />
            <br />
            <h1 className="header center blue-text text-darken-4">
              Nokia Chatbot
            </h1>
            <div className="row center">
              <h5 className="header col s12 light">
                Innovative Projects. A modern chatbot with IMB Watson.
              </h5>
              {this.state.isSignedIn ? (
                 <div>
                    <button onClick={this.firebaseSignOut}>Sign out!</button>
                </div>
                  ) : (
                    <StyledFirebaseAuth
                      uiConfig={this.uiConfig}
                      firebaseAuth={firebase.auth()}
                    />
              )}
            </div>
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                  <Link
                    to="/register"
                    id="download-button"
                    className="waves-effect waves-light btn-large green darken-2 col s12 btn-trial-consultor valign-wrapper"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="col m6 s12">
                  <Link
                    to="/login"
                    id="download-button"
                    className="waves-effect waves-light btn-large blue darken-4 col s12 btn-trial-consultor valign-wrapper"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>

        <div className="container">
          <div className="section">
            {
              // Icon section
            }

            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text text-darken-4">
                    <i className="medium material-icons">data_usage</i>
                  </h2>
                  <h5 className="center">Based on IBM Watson</h5>

                  <p className="light">
                    Innovative Nokia Chatbot uses Watson Assistant
                    developed and povided by IBM.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text text-darken-4">
                    <i className="medium material-icons">devices</i>
                  </h2>
                  <h5 className="center">Available everywhere</h5>

                  <p className="light">
                    Innovative Nokia Chatbot is available on all 
                    Internet-connected devices via browser. Now you
                    can use our application wherever you want!
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center blue-text text-darken-4">
                    <i className="medium material-icons">chat</i>
                  </h2>
                  <h5 className="center">AI Based</h5>

                  <p className="light">
                    Innovative Nokia Chatbot uses advanced AI 
                    algorithms and neural networks to processing
                    and understanding natural language.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>

        <Footer />
      </div>
    );
  }
}

export default Landing;
