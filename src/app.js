// ESM syntax is supported.
import path from "path"; // Node Functionality

import express from "express";
import bodyParser from "body-parser";
import { databaseConnect } from "./database";
import appConfig from "./config";
import { router } from "./router";

const app = express();

app.use(express.static(path.join(__dirname, "assets")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

databaseConnect();

app.use("/", router);

app.listen(appConfig.port, () =>
  console.log("Server Running on Port", appConfig.port)
);
