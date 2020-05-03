import express from "express";
import userController from "./user.controller";
import { body } from "express-validator";
import { catchErrors, admin, authorization } from "../../middlewares";

export const userRouter = express.Router();

//   REFACTORED CODE
userRouter.route("/").get(catchErrors(userController.getUsers));
// .post(userController.createUser);

//   SIMPLE CODE
// userRouter.get("/", userController.getUsers);
// userRouter.get("/:id", (req, res) => res.send(`User Id is: ${req.params.id}`));
// userRouter.post("/", userController.createUser);

userRouter
    .route("/:id")
    .put(
        [
            body("email").trim().escape(),
            body("username").trim().escape(),
            body("bio").trim().escape(),
            body("url").trim().escape(),
        ],
        catchErrors(userController.updateUser)
    )
    .delete([authorization, admin], catchErrors(userController.deleteUser))
    .get(catchErrors(userController.getProfile));
