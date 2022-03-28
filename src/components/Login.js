import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/example"); // push user to dashboard when they login
    // }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    console.log(userData);
    axios.post("http://localhost:8082/api/users/login", userData).then(res => {
      
      console.log(res.data.token);
      this.props.navigate("/show-recipes", { state : res.data.token});
    }).catch(err => {
      console.log(err.response);
      for (var errorType in err.response.data) {
        alert("Error: " + err.response.data[errorType]);
    }
    })
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  error={this.state.errors.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("", {
                    invalid: this.state.errors.email || errors.emailnotfound
                  })}
                />
                <span className="red-text">
                  {this.state.errors.email}
                  {this.state.errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  error={this.state.errors.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <Login
  {...props}
  navigate={useNavigate()}
/>);
// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(Login);