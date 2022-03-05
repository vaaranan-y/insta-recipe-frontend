import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

class ShowRecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  custom_sort(a, b) {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
  }
  componentDidMount() {
    axios
      .get('http://localhost:8082/api/recipes')
      .then(res => {
        res.data = res.data.sort(this.custom_sort);
        this.setState({
          recipes: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowRecipeList');
      })
  };

  logout = e => {
    localStorage.removeItem("isAuthenticated");
  };
  

  render() {
    // recipes.sort(this.custom_sort)
    const recipes = this.state.recipes;
    console.log("Print Recipes: " + recipes);
    let recipeList;

    if(!recipes) {
      recipeList = "there is no recipe record!";
    } else {
      recipeList = recipes.map((recipe, k) =>
        <RecipeCard recipe={recipe} key={k} />
      );
      console.log(typeof(recipes));
    }

    return (
      <div className="ShowRecipeList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Insta Recipe</h2>
            </div>

            <div className="col-md-11">
              <Link to="/login" className="btn btn-outline-danger float-left" onClick={this.logout}>
                Logout
              </Link>
              <Link to="/create-recipe" className="btn btn-outline-warning float-right">
                + Create New recipe
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {recipeList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowRecipeList;