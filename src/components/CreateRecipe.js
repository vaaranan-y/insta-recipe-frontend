import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateRecipe extends Component {
  constructor() {
    super();
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
      .post('http://localhost:8082/api/recipes', data)
      .then(res => {
        this.setState({
          name: '',
          author: '',
          ingredients: [],
          steps: [],
          timers: [],
          imageURL: '',
          originalURL: ''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateRecipe!");
      })
  };

  render() {
    return (
      <div className="CreateRecipe">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Recipe List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Recipe</h1>
              <p className="lead text-center">
                  Create new recipe
              </p>

              <form noValidate onSubmit={this.onSubmit}>
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
                <br />

                <div className='form-group'>
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
                  <input
                    type='text'
                    placeholder='Original URL'
                    name='originalURL'
                    className='form-control'
                    value={this.state.originalURL}
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

export default CreateRecipe;


// <div className='form-group'>
//                   <input
//                     type='text'
//                     placeholder='Author'
//                     name='author'
//                     className='form-control'
//                     value={this.state.author}
//                     onChange={this.onChange}
//                   />
//                 </div>

//                 <div className='form-group'>
//                   <input
//                     type='text'
//                     placeholder='Describe this book'
//                     name='description'
//                     className='form-control'
//                     value={this.state.description}
//                     onChange={this.onChange}
//                   />
//                 </div>
