import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from "react-router-dom";

class ShowRecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      ingredients: [],
      steps: [],
      uploadDate: ''
    };
  }

  componentDidMount() {
    
    const { id } = this.props.params;
    axios
      .get('http://localhost:8082/api/'+id+'?token='+this.props.location.state.token.token)
      .then(res => {
        this.setState({
          recipe: res.data,
          ingredients: res.data.ingredients,
          steps: res.data.steps,
          uploadDate: res.data.uploadDate
        })
      })
      .catch(err => {
        console.log("Error from ShowRecipeDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/'+id)
      .then(res => {
        alert("Recipe Deleted");
        // this.props.history.push("/show-recipes");
        this.props.navigate("/show-recipes", { state : this.props.location.state.token });
      })
      .catch(err => {
        console.log("Error form ShowRecipeDetails_deleteClick");
      })
  };


  render() {

    var recipe = this.state.recipe;
    var ingredients = this.state.ingredients;
    var stepsPrint = []
      for(var i = 0; i < this.state.steps.length; i++){
        stepsPrint.push(this.state.steps[i])
      }
    // var ingredientList = recipe.ingredients;
    // var ingredientList = recipe.ingredients.map((ingredient, k) =>
    //       <tr>ingredient</tr>
    //   );
    var show = String(this.props.location.state.token.email) === this.state.recipe.email
    
    let RecipeItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>Name</td>
            <td>{ recipe.name }</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Author</td>
            <td>{ recipe.author }</td>
          </tr>
          {/* <tr>
            <th scope="row"></th>
            <td>Image URL</td>
            <td>{ recipe.imageURL }</td>
          </tr> */}
          <tr>
            <th scope="row"></th>
            <td>Ingredients</td>
            <td>
              <div>
              {this.state.ingredients.map((ingredient) => (
                <p key={ingredient.name}>{ingredient.name} ({ingredient.quantity})</p>
              ))}
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Steps</td>
            <td>
              <div>
              <ol>
                {stepsPrint.map((step) => (
                  <li>{step}</li>
                ))}
              </ol>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Upload Date</td>
            <td>{ recipe.uploadDate }</td>
          </tr>
          
          
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowRecipeDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/show-recipes" state = {this.props.location.state.token} className="btn btn-outline-warning float-left">
                  Show Recipe List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Recipe's Record</h1>
              <p className="lead text-center">
                  View Recipe's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { RecipeItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,recipe._id)} style={{ visibility: show ? "visible" : "hidden" }}>Delete Recipe</button><br />
            </div>

            <div className="col-md-6">
              <Link to={show ? `/edit-recipe/${recipe._id}` : `/show-recipe/${recipe._id}`} state = {show ? this.props.location.state.token : { token:this.props.location.state.token }} className="btn btn-outline-info btn-lg btn-block" style={{ visibility: show ? "visible" : "hidden" }}>
                    Edit Recipe
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

        </div>
      </div>
    );
  }
}

export default (props) => (
  <ShowRecipeDetails
    {...props}
    location={useLocation()}
    params={useParams()}
    navigate={useNavigate()}
  />
);


