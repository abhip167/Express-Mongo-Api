// ESM syntax is supported.
import express from "express";
import { databaseConnect } from "./database";
import appConfig from "./config";

const app = express();

databaseConnect();

app.get("/", (req, res) => {
  res.send("It Works");
});

app.listen(appConfig.port, () =>
  console.log("Server Running on Port", appConfig.port)
);
