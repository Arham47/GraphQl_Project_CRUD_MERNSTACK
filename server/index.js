import express from "express";
import dotenv from "dotenv"
import {graphqlHTTP} from "express-graphql"
import { schema } from "./schema/schema.js"
import colors from "colors"
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
    
    
}))




mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`server is runnine on localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));