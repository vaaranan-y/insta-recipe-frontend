import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/example"); // push user to dashboard when they login
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    const api_link_cloud = "http://localhost:8082/api/users/login";
    const api_link_logo = "http://localhost:8082/api/users/login";

    axios
      .post(api_link_logo, userData)
      .then((res) => {
        // console.log(res.data);
        this.props.navigate("/show-recipes", { state: res.data });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          for (var errorType in err.response.data) {
            alert("Error: " + err.response.data[errorType]);
          }
        }
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "90vh",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingTop: "2%" }}>
          <Link
            to="/"
            className="btn-flat waves-effect"
            style={{ verticalAlign: "middle" }}
          >
            <i
              className="material-icons left"
              style={{ verticalAlign: "middle" }}
            >
              keyboard_backspace
            </i>
            Go Back
          </Link>
        </div>

        <div className={"login-panel"}>
          <h4 className="general-text">
            <b>Login Below</b>
          </h4>
          <p style={{ color: "#FAF9F6" }}>
            Don't have an account?{" "}
            <Link style={{ color: "#FAF9F6" }} to="/register">
              <b style={{ fontWeight: 700 }}>Register</b>
            </Link>
          </p>

          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-outline mb-4">
              <input
                onChange={this.onChange}
                error={this.state.errors.email}
                name="email"
                type="email"
                placeholder="Email"
                className={classnames(
                  "",
                  {
                    invalid: this.state.errors.email || errors.emailnotfound,
                  },
                  "form-control"
                )}
              />
              <span className="red-text">
                {this.state.errors.email}
                {this.state.errors.emailnotfound}
              </span>
            </div>
            <div className="form-outline mb-4">
              <input
                onChange={this.onChange}
                error={this.state.errors.password}
                name="password"
                type="password"
                placeholder="Password"
                className={classnames(
                  "",
                  {
                    invalid: errors.password || errors.passwordincorrect,
                  },
                  "form-control"
                )}
              />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div
              style={{
                width: "35%",
              }}
              className="login-button"
            >
              <button
                style={{ width: "100%", margin: "auto 0" }}
                type="submit"
                className="btn btn-primary btn-block mb-4"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default (props) => <Login {...props} navigate={useNavigate()} />;
