// ESM syntax is supported.
import path from "path"; // Node Functionality

import express from "express";
import bodyParser from "body-parser";
import { databaseConnect } from "./database";
import appConfig from "./config";
import { router } from "./router";
import { notFound, logErrors } from "./middlewares";

const app = express();
databaseConnect();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/", router);

app.use(notFound);
app.use(logErrors);

app.listen(appConfig.port, () =>
    console.log("Server Running on Port", appConfig.port)
);
