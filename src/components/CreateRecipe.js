import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

class CreateRecipe extends Component {
  constructor() {
    super();
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    const data = {
      name: this.state.name,
      author: this.state.author,
      email: this.props.location.state.token.email,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      uploadDate: Date(),
      imageURL: this.state.imageURL,
      originalURL: ""
    };

    axios
      .post('http://localhost:8082/api', data)
      .then(res => {
        alert("Recipe Successfully Uploaded");
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateRecipe!");
      })
  };


  render() {
    console.log(this.state.ingredients)
    console.log(this.props.location.state.token.email);
    if(this.state.ingredients.length === 0){
      var ingredientStr = {"quantity": "0", "name": "", "type": "Unknown"}
      this.state.ingredients.push(ingredientStr)
    }

    if(this.state.steps.length === 0){
      var stepStr = ""
      var stepsTemp = [...this.state.steps]
      stepsTemp.push(stepStr)
      this.setState(prevState => ({
        steps: stepsTemp
      }));
    }
    // this.renderIngredients()

    return (
      <div className="CreateRecipe">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-recipes" state = {this.props.location.state.token} className="btn btn-outline-warning float-left">
                  Show Recipe List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Recipe</h1>
              <p className="lead text-center">
                  Create new recipe
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <label htmlFor="name">Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Recipe'
                    name='name'
                    className='form-control'
                    value={this.state.name}
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
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>


                <div className='form-group'>
                  <label htmlFor="ingredients">Ingredients</label>
                  <div class="btn-group" style={{padding: "25px"}}>
                    <a class="btn btn-danger minusStep"onClick={() => {
                       var ingredientsTemp = [...this.state.ingredients]
                       ingredientsTemp.pop()
                       this.setState(prevState => ({
                         ingredients: ingredientsTemp
                       }));
                       console.log(this.state.ingredients.length)
                    }}>-</a>
                    <a class="btn btn-success addStep" onClick={() => {
                      var ingredientStr = {"quantity": "0", "name": "", "type": "Unknown"}
                      var ingredientsTemp = [...this.state.ingredients]
                      ingredientsTemp.push(ingredientStr)
                      this.setState(prevState => ({
                        ingredients: ingredientsTemp
                      }));
                      console.log(this.state.ingredients.length)
                      
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
                            console.log(e.target.name)
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
                              console.log(e.target.name)
                              // create shallow copy of ingredients, modify name of ingredient in question, then put it back
                              var ingredientsTemp = [...this.state.ingredients]
                              ingredientsTemp[index].quantity = e.target.value
                              this.setState({ingredientsTemp});
                            }}/>
                        </div>
                      ))}
                      
                </div>
   
                <div className='form-group'>
                  <label htmlFor="steps">Steps</label>
                  <div class="btn-group" style={{padding: "25px"}}>
                      <a class="btn btn-danger minusStep"onClick={() => {
                        var stepsTemp = [...this.state.steps]
                        stepsTemp.pop()
                        this.setState(prevState => ({
                          steps: stepsTemp
                        }));
                        console.log(this.state.steps.length)
                      }}>-</a>
                      <a class="btn btn-success addStep" onClick={() => {
                        var stepStr = ""
                        var stepsTemp = [...this.state.steps]
                        stepsTemp.push(stepStr)
                        this.setState(prevState => ({
                          steps: stepsTemp
                        }));
                        console.log(this.state.steps.length)
                        
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
                              console.log(e.target.name)
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
                  <label htmlFor="imageURL">Image URL</label>
                  <input
                    type='text'
                    placeholder='Image URL'
                    name='imageURL'
                    className='form-control'
                    value={this.state.imageURL}
                    onChange={this.onChange}
                  />
                </div>
                
                <div className='form-group'>
                  <label htmlFor="originalURL">Original URL</label>
                  <input
                    type='text'
                    placeholder='Original URL'
                    name='originalURL'
                    className='form-control'
                    defaultValue={this.state.originalURL}
                    onChange={this.value}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <CreateRecipe
    {...props}
    location={useLocation()}
  />
);