import "dotenv/config";
import express from "express";
import { db, redisClient } from "./config";
import "./models";
import apiRouter from "./api/routes";
import "./config/redis.config";

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/v1", apiRouter);

async function startServer() {
  try {
    await db.authenticate();

    console.log("Database Authenticated Successfully.");

    await db.sync();

    console.log("Models Synced Successfully.");

    await redisClient.connect();

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log("Server Initialization Error: ", error);
  }
}

startServer();
