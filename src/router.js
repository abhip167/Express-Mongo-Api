import express from "express";
import { userRouter } from "./resources/users/user.router";
import { shotRouter } from "./resources/shots/shots.router";
import userController from "./resources/users/user.controller";
import { body } from "express-validator";
import { catchErrors, authorization } from "./middlewares";

export const router = express.Router();

router.get("/", (req, res) =>
    res.render("home", { title: "MEN Stack", message: "Hello there!" })
);
router.get("/about", (req, res) => res.send("About Us Page"));
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", userController.signIn);
router.post(
    "/signup",
    [body("email").trim().escape()],
    catchErrors(userController.createUser)
);

router.get("/me", authorization, userController.getDashboard);

router.use("/shots", shotRouter);
router.use("/users", userRouter);

// GET POST PUT PATCH DELETE
