import React from "react";
import { Navigate, Route } from "react-router-dom";
import axios from 'axios';
import ShowRecipeList from './ShowRecipeList';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  // const token = localStorage.getItem("token");
  // console.log("this", token);

  let authorization = {
    credentials: 'include',
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  }

  // console.log("here")
  // axios.post("http://localhost:8082/api/users/test", authorization).then(res => {
  //     console.log("here")
  //     return <ShowRecipeList/>
  //   }).catch(err => {
  //     return  <Navigate to="/login" replace/>
  //   })

  
  // return isAuthenticated ? <ShowRecipeList/> : <Navigate to="/login" replace/>;
  return <ShowRecipeList/>;
  // return token ? children : <Navigate to="/login" replace/>;
}

export default ProtectedRoute;
