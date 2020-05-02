import express from "express";
import userController from "./user.controller";
import { sanitizeBody } from "express-validator";

export const userRouter = express.Router();

//   REFACTORED CODE
userRouter.route("/").get(userController.getUsers);
// .post(userController.createUser);

//   SIMPLE CODE
// userRouter.get("/", userController.getUsers);
// userRouter.get("/:id", (req, res) => res.send(`User Id is: ${req.params.id}`));
// userRouter.post("/", userController.createUser);

userRouter
  .route("/:id")
  .put(
    [
      sanitizeBody("email").trim().escape(),
      sanitizeBody("username").trim().escape(),
      sanitizeBody("bio").trim().escape(),
      sanitizeBody("url").trim().escape(),
    ],
    userController.updateUser
  )
  .delete(userController.deleteUser)
  .get(userController.getProfile);
