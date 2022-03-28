import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateRecipe from './components/CreateRecipe';
import ShowRecipeList from './components/ShowRecipeList';
import ShowRecipeDetails from './components/ShowRecipeDetails';
import UpdateRecipeInfo from './components/UpdateRecipeInfo';
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";


class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <Router>
        <div>

          <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          </Routes>
        

        
          <Routes>
            <Route path='/create-recipe' element={<CreateRecipe/>} />
            {/* <Route exact path='/show-recipes' element={<ProtectedRoute/>}>
              <Route exact path='/show-recipes' element={<ShowRecipeList/>}/>
            </Route> */}
            <Route exact path='/show-recipes' element={<ShowRecipeList/>}/>
            <Route path='/edit-recipe/:id' element={<UpdateRecipeInfo/>} />
            <Route path='/show-recipe/:id' element={<ShowRecipeDetails/>} />
          </Routes>  
        </div>
      </Router>
      // </Provider>
    );
  }
}

export default App;
