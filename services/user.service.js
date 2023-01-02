import { client } from "../index.js";
import bcrypt from "bcrypt";

//Hash function for storing password with random string
export async function generateHashedPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
}

export async function createUser(data) {
    return await client.db("mongoTest")
        .collection("users")
        .insertOne(data);
}

export async function getUserByName(username) {
    return await client
        .db("mongoTest")
        .collection("users")
        .findOne({ username: username });
}