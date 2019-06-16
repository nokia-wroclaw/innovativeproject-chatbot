import "./styles/App.css";


// import jwt_decode from "jwt-decode";
// import setJWTToken from "./securityUtils/setJWTToken";
// import { SET_CURRENT_USER } from "./actions/types";
// import { logout } from "./actions/securityActions";

import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/Layout/Landing";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import Dashboard from "./components/UserManagement/Dashboard";
import Chatbot from "./components/Chatbot";
import Settings from "./components/UserManagement/Settings";
import OAuth2RedirectHandler from './components/UserManagement/OAuth2RedirectHandler';
import Navbar from "./components/Layout/Navbar";
// import Profile from '../user/profile/Profile';
import { getCurrentUser } from '../src/util/APIUtils';
import { ACCESS_TOKEN } from '../src/config';
// import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// const jwtToken = localStorage.jwtToken;
// if (jwtToken) {
//   setJWTToken(jwtToken);
//   const decoded = jwt_decode(jwtToken);
//   store.dispatch({
//     type: SET_CURRENT_USER,
//     payload: decoded
//   });
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logout());
//     window.location.href = "/login";
//   }
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    return (
     <Provider store={store}>
       <BrowserRouter>
       <div className="App">
       <Navbar authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        <Switch>
              <Route exact path="/" component={Landing} />          
              <Route path="/login"
                render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/register"
                render={(props) => <Register authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/chatbot" component={Chatbot} />
              <Route path="/settings" component={Settings} />
          </Switch>
       </div>
       </BrowserRouter>
       <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
     </Provider>
    );
  }
}

export default App;




// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <BrowserRouter>
//           <div className="App">
//             <Navbar />
//             <Switch>
//               {
//                 // Public Routes
//               }
//               <Route exact path="/" component={Landing} />
//               <Route exact path="/register" component={Register} />
//               <Route exact path="/login" component={Login} />
//               <Route path="/chatbot" component={Chatbot} />
//               <Route path="/settings" component={Settings} />
//               <Route path="/dashboard" component={Dashboard} />
//               {
//                 // Private Routes
//               }
//             </Switch>
//           </div>
//         </BrowserRouter>
//       </Provider>
//     );
//   }
// }

// export default App;
