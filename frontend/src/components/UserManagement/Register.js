import React, { Component } from 'react';
import './Register.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../config';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import { signup } from '../../util/APIUtils';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

class Register extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with SpringSocial</h1>
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a>
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Sign up with Github</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
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

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name" 
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
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
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>                    

        );
    }
}

export default Register






// import React, { Component } from "react";
// import { createNewUser } from "../../actions/securityActions";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import classnames from "classnames";
// import LoadingSpinner from "../LoadingSpinner";

// class Register extends Component {
//   state = {
//     username: "",
//     fullName: "",
//     password: "",
//     confirmPassword: "",
//     errors: {},
//     loading: false
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.setState({
//       loading: true
//     })
//     const newUser = {
//       username: this.state.username,
//       fullName: this.state.fullName,
//       password: this.state.password,
//       confirmPassword: this.state.confirmPassword
//     };
//     this.props.createNewUser(newUser, this.props.history);
//     this.setState({
//       loading: false
//     })
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

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
//             <h1 className="header center blue-text text-darken-4">Register</h1>
//             <div className="row center">
//               <h5 className="header col s12 light">
//                 Sign Up. Enter Your details.
//               </h5>
//             </div>
//             <div className="container">
//               <div className="row">
//                 <form
//                   onSubmit={this.onSubmit}
//                   className="col s12 m12 l12 xl8 offset-xl2"
//                 >
//                   <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                     <input
//                       name="fullName"
//                       type="text"
//                       className={classnames("validate", {
//                         "is-invalid": errors.fullName
//                       })}
//                       placeholder="Full Name"
//                       value={this.state.fullName}
//                       onChange={this.onChange}
//                     />
//                     <span
//                       className="helper-text"
//                     >
//                       {errors.fullName && (
//                         <div className="red-text text-darken-2">
//                           {errors.fullName}
//                         </div>
//                       )}
//                     </span>
//                   </div>
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
//                     <input
//                       name="confirmPassword"
//                       type="password"
//                       className={classnames("validate", {
//                         "is-invalid": errors.confirmPassword
//                       })}
//                       placeholder="Confirm Password"
//                       value={this.state.confirmPassword}
//                       onChange={this.onChange}
//                     />
//                     <span
//                       className="helper-text"
//                     >
//                       {errors.confirmPassword && (
//                         <div className="red-text text-darken-2">
//                           {errors.confirmPassword}
//                         </div>
//                       )}
//                     </span>
//                   </div>
//                   <div className="input-field col s12 m12 l12 xl8 offset-xl2">
//                     <input
//                       className="waves-effect waves-light btn-large green darken-2 col col s12 m12 l12 xl8 offset-xl2 btn-trial-consultor valign-wrapper"
//                       type="submit"
//                     />
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

// Register.propTypes = {
//   createNewUser: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { createNewUser }
// )(Register);
