import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const RecipeCard = (props) => {
    const  recipe  = props.recipe;

    return(
        <div className="card border-secondary mb-3" style={{display: "inline-block", width: "100%", height: "250px"}}>
            <img src={recipe.imageURL} alt="Recipe" style={{height: "100%", width:"50%", objectFit: "cover"}}/>
            <div className="desc text-right" style={{float: "right", width:"50%", height: "100%"}}>
                <Link to={`/show-recipe/${recipe._id}`} className="h4">{ recipe.name } </Link>
                <p className="text-muted overflow:hidden">{recipe.author}</p>
            </div>
        </div>
    )
};

export default RecipeCard;


