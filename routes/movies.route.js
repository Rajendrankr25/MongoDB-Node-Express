import express from 'express';
import {
    getAllMoviesById,
    createMovies,
    deleteMovieById,
    updateMovieById,
    getAllMovies
} from '../services/movies.service.js';

const router = express.Router();

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
router.get("/:id", async function (request, response) { //get method
    const { id } = request.params;
    const movie = await getAllMoviesById(id); //accessing data from mongodb
    movie ? response.send(movie) : response.status(404).send({ message: "movie not found" });
});

//POST movies from postman - create/insert movies
router.post("/", async function (request, response) { //post method
    const data = request.body;
    console.log(data);
    //db.movies.insertMany(data)
    const result = await createMovies(data);
    response.send(result);
});

// find all movies from mongodb
// app.get("/movies", async function (request, response) { //get method
//     //db.movies.find({})
//     const movies = await client.db("mongoTest").collection("movies").find({}).toArray(); //toarray returns all data instead of cursor-paginated data
//     response.send(movies);
// });

//Delete method
router.delete("/:id", async function (request, response) { //delete method
    const { id } = request.params;
    const result = await deleteMovieById(id); //deleting data from mongodb
    console.log(result);
    result.deletedCount > 0 ? response.send({ message: "movie deleted" }) :
        response.send({ message: "movie not found" });
});

//PUT/UPDATE method
router.put("/:id", async function (request, response) { //put method
    //db.movies.updateOne({id:'99}, {$set:{rating:9}})
    const { id } = request.params;
    const data = request.body;
    const result = await updateMovieById(id, data); //updating data from mongodb
    console.log(result);
    response.send(result);
});

//query params
router.get("/", async function (request, response) { //get method
    if (request.query.rating) {
        request.query.rating = +request.query.rating;
    }
    const movies = await getAllMovies(request); //toarray returns all data instead of cursor-paginated data
    response.send(movies);
});

export default router;


