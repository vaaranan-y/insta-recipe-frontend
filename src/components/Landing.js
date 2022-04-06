import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Insta Recipe</h2>
            </div>
            <br />
            <div class="card text-center border-secondary" style={{width: "18rem", margin: "0 auto"}}>
                <div class="card-body">
                    <h5 class="card-title">Join Today!</h5>
                    <p class="card-text">Start sharing your recipes now!</p>
                    <Link to="/register" className="btn btn-success">Register</Link>
                    <br/>
                    <br/>
                    <p class="card-text">Or login with your email!</p>
                    <Link to="/login" className="btn btn-inverse btn-success">Login</Link>
                    <br/>
                </div>
            </div>
            
            
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;