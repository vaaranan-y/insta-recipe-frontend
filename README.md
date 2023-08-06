# Insta Recipe

Insta Recipe is a website developed using MERN stack (Mongo DB database, React Frontend, Express and Node for Backend).
Here is the link to Insta Recipe: https://instarecipe.netlify.app/

## About this Project

This project was inspired by my hobby of cooking, and was a result of me wanting to share my recipes with others, and 
see and learn new recipes from others as well. It is the same idea as instagram, however posts are more like actual
"recipes" than just photos and videos. 

For this project, all data is stored on an Azure based server, using MongoDB atlas, and it is stored in JSON/BSON format.
The data is queried using REST API concepts, and the API for this app was developed using Heroku (code for this to be 
found in a secondary repository, https://git.heroku.com/insta-recipe-blog-app.git). It uses JSON Web Tokens for authentication and security, and passwords and other confidential
data are encrypted in the database.

The frontend uses React, specifically the Axios library to make API requests, and displays data accordingly.
