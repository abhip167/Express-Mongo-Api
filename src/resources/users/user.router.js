import express from "express";
import userController from "./user.controller";

export const userRouter = express.Router();

//   REFACTORED CODE
userRouter
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);

//   SIMPLE CODE
// userRouter.get("/", userController.getUsers);
// userRouter.get("/:id", (req, res) => res.send(`User Id is: ${req.params.id}`));
// userRouter.post("/", userController.createUser);

userRouter
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser);
