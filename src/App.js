import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import CreateRecipe from "./components/CreateRecipe";
import ShowRecipeList from "./components/ShowRecipeList";
import ShowRecipeDetails from "./components/ShowRecipeDetails";
import UpdateRecipeInfo from "./components/UpdateRecipeInfo";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
const currentYear = new Date().getFullYear();
const copyrightSymbol = "\u00A9";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-style">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route exact path="/show-recipes" element={<ShowRecipeList />} />
            <Route path="/edit-recipe/:id" element={<UpdateRecipeInfo />} />
            <Route path="/show-recipe/:id" element={<ShowRecipeDetails />} />
          </Routes>
          <div style={{ height: "10vh" }} className="footer-div">
            <p
              style={{
                textAlign: "center",
                color: "#FDDFEF",
                fontSize: "100%",
              }}
            >
              {copyrightSymbol} {currentYear} Insta Recipe. All rights reserved.
              <br></br>Created by Vaaranan Yogalingam
            </p>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
