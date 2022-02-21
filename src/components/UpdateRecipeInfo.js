import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useParams } from "react-router-dom";

class UpdateRecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      author: '',
      ingredients: [],
      steps: [],
      timers: [],
      imageURL: '',
      originalURL: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/'+id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          name: res.data.name,
          author: res.data.author,
          ingredients: res.data.ingredients,
          steps: res.data.steps,
          timers: res.data.timers,
          imageURL: res.data.imageURL,
          originalURL: res.data.originalURL
        })
      })
      .catch(err => {
        console.log("Error from UpdateRecipeInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      author: this.state.author,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      timers: this.state.timers,
      imageURL: this.state.imageURL,
      originalURL: this.state.originalURL
    };

    axios
      .put('http://localhost:8082/api/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-recipe/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateRecipeInfo!");
      })
  };


  render() {
    //var ingredients = 
    return (
      <div className="UpdateRecipeInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
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
              {this.state.ingredients.map((ingredient)=>(
                <div class="form-inline">
                  <input
                  type='text'
                  placeholder='Ingredient'
                  name='ingredient'
                  className='form-control'
                  defaultValue={ingredient.name}
                  onChange={this.onChange}
                  
                  />
                  <input
                    type='text'
                    placeholder='Quantity'
                    name='quantity'
                    className='form-control'
                    defaultValue={ingredient.quantity}
                    onChange={this.onChange}
                  />
                </div>
                
              ))}
            </div>

            <div className='form-group'>
            <label htmlFor="steps">Steps</label>
              <ol>
                {this.state.steps.map((step)=>(
                    <li>
                      <input
                        type='text'
                        placeholder='Step'
                        name='step'
                        className='form-control'
                        defaultValue={step}
                        onChange={this.onChange}
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
/>
);

{/* <input
                type='text'
                placeholder='Ingredients'
                name='ingredients'
                className='form-control'
                value={this.state.ingredients}
                onChange={this.onChange}
              /> */}