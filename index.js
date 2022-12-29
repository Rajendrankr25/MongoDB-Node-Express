//const express = require("express"); // third party package import
import express from 'express'; // latest export method
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
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

//Task 1 - list movie data @http://localhost:4000/movies
// app.get("/movies", function (request, response) { //get method
//     response.send(movies);
// });

//Task 2 - get movies based on movie id
// app.get("/movies/:id", function (request, response) { //get method
//     const { id } = request.params;
//     console.log(id);
//     //const movie = movies.filter((mv) => mv.id == id); // 1st method filter
//     const movie = movies.find((mv) => mv.id == id); //find methods returns only 1 element
//     movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
// });

// get data from mongo db; Mongodb & node, express connection
app.get("/movies/:id", async function (request, response) { //get method
    const { id } = request.params;
    const movie = await client.db('mongoTest').collection('movies').findOne({ id: id }); //accessing data from mongodb
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
});

//POST movies from postman - create/insert movies
app.post("/movies", async function (request, response) { //post method
    const data = request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result = await client.db("mongoTest").collection("movies").insertMany(data);
    response.send(result);
});

// find all movies from mongodb
// app.get("/movies", async function (request, response) { //get method
//     //db.movies.find({})
//     const movies = await client.db("mongoTest").collection("movies").find({}).toArray(); //toarray returns all data instead of cursor-paginated data
//     response.send(movies);
// });

//Delete method
app.delete("/movies/:id", async function (request, response) { //delete method
    const { id } = request.params;
    const result = await client.db('mongoTest')
        .collection('movies')
        .deleteOne({ id: id }); //deleting data from mongodb
    console.log(result);
    result.deletedCount > 0 ? response.send({ message: "movie deleted" }) :
        response.send({ message: "movie not found" });
});

//PUT/UPDATE method
app.put("/movies/:id", async function (request, response) { //put method
    //db.movies.updateOne({id:'99}, {$set:{rating:9}})
    const { id } = request.params;
    const data = request.body;
    const result = await client.db('mongoTest')
        .collection('movies')
        .updateOne({ id: id }, { $set: data }); //updating data from mongodb
    console.log(result);
    response.send(result);
});

//query params
app.get("/movies", async function (request, response) { //get method
    if (request.query.rating) {
        request.query.rating = +request.query.rating;
    }
    const movies = await client.db("mongoTest")
        .collection("movies")
        .find(request.query)
        .toArray(); //toarray returns all data instead of cursor-paginated data
    response.send(movies);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
