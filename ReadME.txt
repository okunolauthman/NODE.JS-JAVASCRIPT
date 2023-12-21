
# Project Name: Node Mongoose/Api * Mongodb

## Overview
This is a backend project that aims to combine Database Mangment system(mongodb) through Serverside node.js/mongoose and api links. It also has a soft touch of architecture and program design

## Tools
Mongodb*Postman*Node.js

## Project Structure

- /models
  - insert.js ##Code of data-entry to test schema
  - schema.js ##code contains mongoose schema

- /routes
  - smartphoneRoutes.js ##API routes to test on postman

-/server.js ##creates server that makes all operation live & active
- .env    ##connection string of mongodb
- README.txt


Installation
Install all the required dependencies ie express framework to ensure a smooth workflow:

###  CREATING A ENV variable
To create an environmental variable for the MongoDB URI, you can use the dotenv package. This package allows you to store configuration in the environment separate from your code. 

First, install the dotenv package using npm:
npm install dotenv

Create a file named .env in the root of your project and add the following line:

MONGO_URI=mongodb+srv://okunolauthman:FP2sY3vZhneNBZQm@cluster0.9liicgv.mongodb.net/test; 

Update your code to use dotenv. Add the following lines at the top of your file:
require('dotenv').config();

## Modify the MongoDB connection code to use process.env:

// Connect to MongoDB and a specific database
const mongoURI = process.env.MONGO_URI;

## MongoDB URI is stored in the .env file, and you can use process.env.MONGO_URI to access it in your code. This approach helps keep sensitive information, such as connection strings, separate from your source code and allows for easier configuration management.

##To Test API through Postman 
--make sure server is life
-- In postman copy the link and add the route ie http://localhost:3050/api/smartphones


