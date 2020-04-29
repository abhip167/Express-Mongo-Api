import express from "express";
import { userRouter } from "./resources/users/user.router";

export const router = express.Router();

router.get("/", (req, res) => res.send("Home Page"));
router.get("/about", (req, res) => res.send("About Us Page"));
router.get("/signin", (req, res) => res.send("Sign In Page"));
router.post("/signup", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const user = { email, password };
  res.send(user);
});

router.use("/users", userRouter);

// GET POST PUT PATCH DELETE
