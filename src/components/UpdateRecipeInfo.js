import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useParams, useLocation } from "react-router-dom";

class UpdateRecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      author: '',
      email: '',
      ingredients: [],
      steps: [],
      uploadDate: '',
      imageURL: '',
      originalURL: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    axios
      .get('https://insta-recipe-blog-app.herokuapp.com/api/'+id+'?token='+this.props.location.state.token)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          name: res.data.name,
          author: res.data.author,
          email: res.data.email,
          ingredients: res.data.ingredients,
          steps: res.data.steps,
          uploadDate: res.data.uploadDate,
          imageURL: res.data.imageURL,
          originalURL: res.data.originalURL
        })
      })
      .catch(err => {
        console.log("Error from UpdateRecipeInfo");
      })
  };

  onChange = e => {
    // console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // var ingredientsTotal = []
    // for(var i = 0; i < this.state.ingredients.length; i++){

    // }
    const { id } = this.props.params;
    const data = {
      name: this.state.name,
      author: this.state.author,
      email: this.state.email,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      uploadDate: this.state.uploadDate,
      imageURL: this.state.imageURL,
      originalURL: this.state.originalURL
    };

    axios
      .put('https://insta-recipe-blog-app.herokuapp.com/api/'+id, data)
      .then(res => {
        alert("Recipe Successfully Updated");
        this.props.navigate("/show-recipes", { state : this.props.location.state });
      })
      .catch(err => {
        console.log("Error in UpdateRecipeInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateRecipeInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-recipes" state = {this.props.location.state} className="btn btn-outline-warning float-left">
                  Show Recipe List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Recipe</h1>
              <p className="lead text-center">
                  Update Recipe's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="name">Name</label>
              <input
                type='text'
                placeholder='Name of the Recipe'
                name='name'
                className='form-control'
                defaultValue={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                defaultValue={this.state.author}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="imageURL">Image URL</label>
              <input
                type='text'
                placeholder='Image URL'
                name='imageURL'
                className='form-control'
                defaultValue={this.state.imageURL}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="ingredients">Ingredients</label>
              <div class="btn-group" style={{padding: "25px"}}>
                <a href="#ingredientsSection" class="btn btn-danger minusStep"onClick={() => {
                  this.state.ingredients.pop()
                }}>-</a>
                <a href="#ingredientsSection" class="btn btn-success addStep" onClick={() => {
                  var ingredientStr = {"quantity": "0", "name": "", "type": "Unknown"}
                  this.state.ingredients.push(ingredientStr)
                }}>+</a>
              </div>

              {this.state.ingredients.map((ingredient, index)=>(
                <div class="form-inline">
                  <input
                  type='text'
                  placeholder='Ingredient'
                  name="name"
                  className='form-control'
                  defaultValue={ingredient.name}
                  onChange={(e)=>{
                    // console.log(e.target.name)
                    // create shallow copy of ingredients, modify name of ingredient in question, then put it back
                    var ingredientsTemp = [...this.state.ingredients]
                    ingredientsTemp[index].name = e.target.value
                    this.setState({ingredientsTemp});
                  }}/>

                  <input
                    type='text'
                    placeholder='Quantity'
                    name='quantity'
                    className='form-control'
                    defaultValue={ingredient.quantity}
                    onChange={(e)=>{
                      // console.log(e.target.name)
                      // create shallow copy of ingredients, modify name of ingredient in question, then put it back
                      var ingredientsTemp = [...this.state.ingredients]
                      ingredientsTemp[index].quantity = e.target.value
                      this.setState({ingredientsTemp});
                    }}/>
                </div>
              ))}
            </div>

            <div className='form-group'>
              <label htmlFor="steps" id="stepsSection">Steps</label>
              
              <div class="btn-group" style={{padding: "25px"}}>
                <a href="#stepsSection" class="btn btn-danger minusStep"onClick={() => {
                  this.state.steps.pop()
                }}>-</a>
                <a href="#stepsSection" class="btn btn-success addStep" onClick={() => {
                  var stepStr = ""
                  this.state.steps.push(stepStr)
                }}>+</a>
              </div>

              <ol>
                {this.state.steps.map((step, index)=>(
                    <li>
                      <input
                        type='text'
                        placeholder='Step'
                        name='step'
                        className='form-control'
                        defaultValue={step}
                        onChange={(e)=>{
                          // console.log(e.target.name)
                          // create shallow copy of steps, modify name of step in question, then put it back
                          var stepsTemp = [...this.state.steps]
                          stepsTemp[index] = e.target.value
                          this.setState({steps:stepsTemp});
                        }}
                      />
                    </li>
                  ))}
              </ol>
            </div>

            <div className='form-group'>
            <label htmlFor="originalURL">Original URL</label>
              <input
                type='text'
                placeholder='Original URL'
                name='originalURL'
                className='form-control'
                defaultValue={this.state.originalURL}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Recipe</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default (props) => (
  <UpdateRecipeInfo
  {...props}
  params={useParams()}
  location={useLocation()}
  navigate={useNavigate()}
/>
);
