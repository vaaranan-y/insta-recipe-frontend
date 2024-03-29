import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    // console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.name)
    // console.log(this.state.email)
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
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

  render() {
    return (
      <div>
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
              Back to Home
            </Link>
          </div>
          <div className={"login-panel"}>
            <h4 className="general-text">
              <b>Register</b> Now
            </h4>
            <p style={{ color: "#FAF9F6" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#FAF9F6" }}>
                <b style={{ fontWeight: 700 }}>Log in</b>
              </Link>
            </p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-outline mb-4">
                <input
                  onChange={this.onChange}
                  error={this.state.errors.name}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className={classnames("", {
                    invalid: this.state.errors.name,
                  })}
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
                    invalid: this.state.errors.email,
                  })}
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
                    invalid: this.state.errors.passowrd,
                  })}
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
                    invalid: this.state.errors.password2,
                  })}
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
                    marginTop: "1rem",
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

export default (props) => <Register {...props} navigate={useNavigate()} />;
