import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const RecipeCard = (props) => {
    const  recipe  = props.recipe;

    return(
        <div className="card-container">
            <img src={recipe.imageURL} alt="Recipe Image" width="250"/>
            <div className="desc">
                <Link to={`/show-recipe/${recipe._id}`}> { recipe.name } </Link>
                <p>{recipe.author}</p>
            </div>
        </div>
    )
};


export default RecipeCard;


