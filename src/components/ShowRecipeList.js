import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

class ShowRecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: this.props.userData.email,
      // password: this.props.userData.password,
      recipes: [],
    };
  }

  custom_sort(a, b) {
    return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  }
  componentDidMount() {
    // const state = this.props.location();

    axios
      .get(
        "http://localhost:8082/api/recipes?token=" +
          this.props.location.state.token
      )
      .then((res) => {
        res.data = res.data.sort(this.custom_sort);
        this.setState({
          recipes: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowRecipeList");
        this.props.navigate("/login");
      });
  }

  logout = (e) => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  render() {
    // recipes.sort(this.custom_sort)
    const recipes = this.state.recipes;
    let recipeList;

    if (!recipes) {
      recipeList = "there is no recipe record!";
    } else {
      recipeList = recipes.map((recipe, k) => (
        <RecipeCard token={this.props.location.state} recipe={recipe} key={k} />
      ));
    }

    return (
      <div className="ShowRecipeList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2
                className="text-center title-logo"
                style={{
                  fontFamily: "unset",
                  fontWeight: 700,
                }}
              >
                Insta Recipe
              </h2>
            </div>

            <div className="col-md-12">
              <Link
                to="/login"
                className="btn btn-outline-danger float-left"
                onClick={this.logout}
              >
                Logout
              </Link>
              <Link
                to="/create-recipe"
                state={{ token: this.props.location.state }}
                className="btn btn-outline-warning float-right"
              >
                + Create New recipe
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{recipeList}</div>
        </div>
      </div>
    );
  }
}

// export default ShowRecipeList;

export default (props) => (
  <ShowRecipeList
    {...props}
    location={useLocation()}
    navigate={useNavigate()}
  />
);
