import express from "express";
import shotController from "./shots.controller";
import { body } from "express-validator";

export const shotRouter = express.Router();

shotRouter
  .route("/")
  .post(
    [
      body("title").trim().escape(),
      body("description").trim().escape(),
      body("author").trim().escape(),
    ],
    shotController.createShot
  ) //CREATE
  .get(shotController.getShots); // GET ALL SHOTS

shotRouter
  .route("/:id")
  .get(shotController.readShot) // READ
  .put(
    [
      body("title").trim().escape(),
      body("description").trim().escape(),
      body("author").trim().escape(),
    ],
    shotController.updateShot
  ) // UPDATE
  .delete(shotController.deleteShot); // DELETE
