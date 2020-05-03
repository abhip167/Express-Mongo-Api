import express from "express";
import shotController from "./shots.controller";
import { body } from "express-validator";
import { catchErrors } from "../../middlewares";

export const shotRouter = express.Router();

shotRouter
    .route("/")
    .post(
        [
            body("title").trim().escape(),
            body("description").trim().escape(),
            body("author").trim().escape(),
        ],
        catchErrors(shotController.createShot)
    ) //CREATE()
    .get(catchErrors(shotController.getShots)); // GET ALL SHOTS

shotRouter
    .route("/:id")
    .get(catchErrors(shotController.readShot)) // READ
    .put(
        [
            body("title").trim().escape(),
            body("description").trim().escape(),
            body("author").trim().escape(),
        ],
        catchErrors(shotController.updateShot)
    ) // UPDATE
    .delete(catchErrors(shotController.deleteShot)); // DELETE
