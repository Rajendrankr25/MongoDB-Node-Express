//const express = require("express"); // third party package import
import express from 'express'; // latest export method
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import movieRouter from "./routes/movies.route.js" //importing routes
dotenv.config()

const app = express(); // calling the express package

const PORT = process.env.PORT; //auto assign port

//mongodb connection
//const MONGO_URL = "mongodb://127.0.0.1"; //default ip of mongo
// connection guide - https://ragavkumarv.com/blog/mongo-atlas-setup/
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // creating new client 
await client.connect(); //top level await can be used without async function
console.log('mongo is connected');

//declare conversion - converts json data to js object - app. will apply of all api requests
app.use(express.json());

app.get("/", function (request, response) { //get method
    response.send("This is the home page 😍😍😍😍");
});

app.use("/movies", movieRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client }; //exporting client to routes
