import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer grey lighten-3">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="black-text">Innovative Chatbot</h5>
              <p className="grey-text text-darken-3">
                The goal of the project is to create interface to available IBM
                Watson Assitance instance. Deliver chatbot with below aspects
                fullfilled: Backend (communication interface (API) to IBM
                Watson), Frontend (dedicated simple GUI with possibility for
                human interaction with bot).
              </p>
            </div>
            <div className="col l3 s12">
              <h5 className="black-text">Stack</h5>
              <ul className="grey-text text-darken-3">
                <li>Spring Boot</li>
                <li>ReactJS</li>
                <li>Heroku</li>
                <li>Docker</li>
                <li>Travis CI</li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="black-text">Links</h5>
              <ul>
                <li>
                  <a
                    className="blue-text text-darken-4"
                    href="https://github.com/nokia-wroclaw/innovativeproject-chatbot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repo
                  </a>
                </li>
                <li>
                  <a
                    className="blue-text text-darken-4"
                    href="https://nokiawroclaw.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nokia Wrocław
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container black-text">
            Chatbot by{" "}
            <a
              className="blue-text text-darken-4"
              href="https://github.com/nokia-wroclaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Innovative Projects
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
