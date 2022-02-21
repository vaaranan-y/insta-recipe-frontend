import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateRecipe from './components/CreateRecipe';
import ShowRecipeList from './components/ShowRecipeList';
import ShowRecipeDetails from './components/ShowRecipeDetails';
import UpdateRecipeInfo from './components/UpdateRecipeInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path='/create-recipe' element={<CreateRecipe/>} />
            <Route exact path='/' element={<ShowRecipeList/>} />
            <Route path='/edit-recipe/:id' element={<UpdateRecipeInfo/>} />
            <Route path='/show-recipe/:id' element={<ShowRecipeDetails/>} />
          </Routes>  
        </div>
      </Router>
    );
  }
}

export default App;

