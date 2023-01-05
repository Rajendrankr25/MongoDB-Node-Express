import jwt from "jsonwebtoken";

//creating custom middleware
export const auth = (request, response, next) => {
    try {
        const token = request.header("x-auth-token");
        console.log("token", token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        response.status(404).send({ message: err.message });
    }
}