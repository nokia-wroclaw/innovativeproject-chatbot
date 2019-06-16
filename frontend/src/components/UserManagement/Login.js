import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../config';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';


class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to SpringSocial</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm {...this.props} />
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>
            </div>
        );
    }
}


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("You're successfully logged in!");
            this.props.history.push("/");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>                    
        );
    }
}

export default Login




// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { login, getIsAdmin } from "../../actions/securityActions";
// import classnames from "classnames";
// import LoadingSpinner from "../LoadingSpinner";

// class Login extends Component {
//   state = {
//     username: "",
//     password: "",
//     errors: {},
//     loading: false
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.setState({
//       loading: true
//     })
//     const loginRequest = {
//       username: this.state.username,
//       password: this.state.password
//     };
//     this.props.login(loginRequest);
//     this.props.getIsAdmin();
//     this.setState({
//       loading: false
//     })
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.security.validToken) {
//       this.props.history.push("/chatbot");
//     }

//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

//   render() {
//     const { errors } = this.props;
//     let data;
//     if (this.state.loading) {
//       data = <LoadingSpinner />;
//     } else {
//       data = (
//         <div className="section no-pad-bot" id="index-banner">
//           <div className="container">
//             <br />
//             <br />
//             <h1 className="header center blue-text text-darken-4">Login</h1>
//             <div className="row center">
//               <h5 className="header col s12 light">Log In to Your Account.</h5>
//             </div>
//             <div className="container">
//               <div className="row">
//                 <form
//                   onSubmit={this.onSubmit}
//                   className="col s12 m12 l12 xl8 offset-xl2"
//                 >
//                   <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                     <input
//                       name="username"
//                       id="email"
//                       type="email"
//                       className={classnames("validate", {
//                         "is-invalid": errors.username
//                       })}
//                       placeholder="Email"
//                       value={this.state.username}
//                       onChange={this.onChange}
//                     />
//                     <span
//                       className="helper-text"
//                     >
//                       {errors.username && (
//                         <div className="red-text text-darken-2">
//                           {errors.username}
//                         </div>
//                       )}
//                     </span>
//                   </div>
//                   <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                     <input
//                       name="password"
//                       type="password"
//                       className={classnames("validate", {
//                         "is-invalid": errors.password
//                       })}
//                       placeholder="Password"
//                       value={this.state.password}
//                       onChange={this.onChange}
//                     />
//                     <span
//                       className="helper-text"
//                     >
//                       {errors.password && (
//                         <div className="red-text text-darken-2">
//                           {errors.password}
//                         </div>
//                       )}
//                     </span>
//                   </div>
//                   <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                     <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                       <input
//                         className="waves-effect waves-light btn-large green darken-2 col col s12 m12 l12 xl8 offset-xl2 btn-trial-consultor valign-wrapper"
//                         type="submit"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <br />
//             <br />
//           </div>
//         </div>
//       );
//     }
//     return <div>{data}</div>;
//   }
// }

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   security: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   security: state.security,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { login, getIsAdmin }
// )(Login);
