import express from "express";
import shotController from "./shots.controller";
import { sanitizeBody } from "express-validator";

export const shotRouter = express.Router();

shotRouter
  .route("/")
  .post(
    [
      sanitizeBody("title").trim().escape(),
      sanitizeBody("description").trim().escape(),
      sanitizeBody("author").trim().escape(),
    ],
    shotController.createShot
  ) //CREATE
  .get(shotController.getShots); // GET ALL SHOTS

shotRouter
  .route("/:id")
  .get(shotController.readShot) // READ
  .put(
    [
      sanitizeBody("title").trim().escape(),
      sanitizeBody("description").trim().escape(),
      sanitizeBody("author").trim().escape(),
    ],
    shotController.updateShot
  ) // UPDATE
  .delete(shotController.deleteShot); // DELETE
