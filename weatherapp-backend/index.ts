import "dotenv/config";
import mongoose from "mongoose";
import { server } from "./src/app";
import { startStandaloneServer } from "@apollo/server/standalone";
import context from "./src/context";

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/weatherapp";
const port = Number(process.env.PORT) || 4000;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");

    startStandaloneServer(server, {
      listen: { port },
      context,
    })
      .then(({ url }) => {
        console.log(`Server ready at ${url}`);
      })
      .catch((error) => {
        console.error("Error starting the server:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
