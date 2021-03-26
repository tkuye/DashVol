import express from 'express';
import dotenv from 'dotenv';
import graphqlHTTP from 'express-graphql'






dotenv.config();
const app = express();




const PORT = process.env.PORT; 

app.listen(PORT);
app.use("/graphql", graphqlHTTP.graphqlHTTP({
    
})