import express from "express";
import { userRouter } from "./resources/users/user.router";
import { shotRouter } from "./resources/shots/shots.router";
import userController from "./resources/users/user.controller";
import { sanitizeBody } from "express-validator";

export const router = express.Router();

router.get("/", (req, res) => res.send("Home Page"));
router.get("/about", (req, res) => res.send("About Us Page"));
router.get("/signin", (req, res) => res.send("Sign In Page"));
router.post(
  "/signup",
  [sanitizeBody("email").trim().escape()],
  userController.createUser
);

router.use("/shots", shotRouter);
router.use("/users", userRouter);

// GET POST PUT PATCH DELETE
