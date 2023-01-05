import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
    return await client.db('mongoTest')
        .collection('movies')
        .updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db('mongoTest')
        .collection('movies')
        .deleteOne({ _id: ObjectId(id) });
}
export async function createMovies(data) {
    return await client.db("mongoTest")
        .collection("movies")
        .insertMany(data);
}
export async function getAllMoviesById(id) {
    return await client.db('mongoTest')
        .collection('movies')
        .findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(request) {
    return await client.db("mongoTest")
        .collection("movies")
        .find(request.query)
        .toArray();
}
