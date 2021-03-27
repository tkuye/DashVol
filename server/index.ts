import express from 'express';
import dotenv from 'dotenv';
import {graphqlHTTP}from 'express-graphql'
import schema from "./schema/schema"


dotenv.config();
const app = express();


const PORT = process.env.PORT; 


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});