import express from "express";
import shotController from "./shots.controller";
import { body } from "express-validator";
import { catchErrors, authorization, admin } from "../../middlewares";

export const shotRouter = express.Router();

shotRouter
    .route("/")
    .post(
        [
            authorization,
            body("title").trim().escape(),
            body("description").trim().escape(),
            body("author").trim().escape(),
        ],
        catchErrors(shotController.createShot)
    ) //CREATE()
    .get(authorization, catchErrors(shotController.getShots)); // GET ALL SHOTS

shotRouter
    .route("/:id")
    .get(authorization, catchErrors(shotController.readShot)) // READ
    .put(
        [
            authorization,
            body("title").trim().escape(),
            body("description").trim().escape(),
            body("author").trim().escape(),
        ],
        catchErrors(shotController.updateShot)
    ) // UPDATE
    .delete([authorization, admin], catchErrors(shotController.deleteShot)); // DELETE
