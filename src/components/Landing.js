import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "black", height: "90vh" }}>
        <div className="row">
          <div className="col s12 center-align">
            <div className="col-md-12">
              <br />
              <h2
                className="display-4 text-center title-logo"
                style={{
                  fontFamily: "unset",
                  fontWeight: 700,
                  paddingTop: "7.5vh",
                }}
              >
                Insta Recipe
              </h2>
            </div>
            <br />
            <div
              className="card text-center border-secondary"
              style={{ width: "18rem", margin: "0 auto" }}
            >
              <div className="landing-panel">
                <h5 className="card-title">Join Today!</h5>
                <p className="card-text">Start sharing your recipes now!</p>
                <Link to="/register" className="btn login-btn">
                  Register
                </Link>
                <br />
                <br />
                <p className="card-text">Or login with your email!</p>
                <Link to="/login" className="btn register-btn">
                  Login
                </Link>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
