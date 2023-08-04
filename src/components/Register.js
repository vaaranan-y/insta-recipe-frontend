import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    // console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
    // console.log(this.state.name)
    // console.log(this.state.email)
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
  
// console.log(newUser);
axios
  .post("http://localhost:8082/api/users/register", newUser)
  .then((res) => {
    console.log("new user created");
    this.props.navigate("/login");
  })
  .catch((err) => {
    console.log(err.response);
    for (var errorType in err.response.data) {
      alert("Error: " + err.response.data[errorType]);
    }
  });
  };
  
  render(){
    return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                    <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
              
              
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-outline mb-4">
                  <input
                    onChange={this.onChange}
                    error={this.state.errors.name}
                    name="name"
                    type="text"
                    placeholder="Name"
                    className={classnames("", {
                      invalid: this.state.errors.name
                    })}
                    onChange={this.onChange}
                    class="form-control"
                  />
                  <span className="red-text">{this.state.errors.name}</span>
                </div>
                <div className="form-outline mb-4">
                  <input
                    onChange={this.onChange}
                    error={this.state.errors.name}
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={classnames("", {
                      invalid: this.state.errors.email
                    })}
                    onChange={this.onChange}
                    class="form-control"
                  />
                  <span className="red-text">{this.state.errors.email}</span>
                </div>
                <div className="form-outline mb-4">
                  <input
                    onChange={this.onChange}
                    error={this.state.errors.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={classnames("", {
                      invalid: this.state.errors.passowrd
                    })}
                    onChange={this.onChange}
                    class="form-control"
                  />
                  <span className="red-text">{this.state.errors.password}</span>
                </div>
                <div className="form-outline mb-4">
                  <input
                    onChange={this.onChange}
                    error={this.state.errors.password2}
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames("", {
                      invalid: this.state.errors.password2
                    })}
                    onChange={this.onChange}
                    class="form-control"
                  />
                  <span className="red-text">{this.state.errors.password2}</span>
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
                    class="btn btn-inverse btn-success"
                  >
                    Sign up
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
  <Register
  {...props}
  navigate={useNavigate()}
/>);
