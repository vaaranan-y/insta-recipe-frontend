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

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/recipes')
      .then(res => {
        this.setState({
          recipes: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowRecipeList');
      })
  };


  render() {
    const recipes = this.state.recipes;
    console.log("PrintRecipe: " + recipes);
    let recipeList;

    if(!recipes) {
      recipeList = "there is no recipe record!";
    } else {
      recipeList = recipes.map((recipe, k) =>
        <RecipeCard recipe={recipe} key={k} />
      );
    }

    return (
      <div className="ShowRecipeList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Recipes List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-recipe" className="btn btn-outline-warning float-right">
                + Add New recipe
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