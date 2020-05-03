//  Not Found Error
import jwt from "jsonwebtoken";
import config from "./config";

// Check If User Is Admin

export const admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res
            .status(403)
            .send(
                "You're not Admin. This Content is only accessed by the Admin"
            );
    }
    next();
};

// validate our access token
export const authorization = (req, res, next) => {
    // get the token from header
    const token = req.header("x-access-token");
    if (!token) {
        return res.status(401).send("Please Sign In First");
    }

    // Verify Token
    try {
        const userInfo = jwt.verify(token, config.secrets.JWT_SECRET);
        req.user = userInfo;
        next();
    } catch (error) {
        res.status(400).send(
            "Your Token is Invalid or has Expired. Please Sign In Again"
        );
    }
};

export const notFound = (req, res, next) => {
    const error = new Error("404, Page not Found.");
    error.status = 404;
    next(error);
};

export const catchErrors = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (error) {
            next(error);
        }
    };
};

// Default Error Handler
export const logErrors = (error, req, res, next) => {
    res.locals.message = error.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};

    res.status(error.status || 500);
    res.render("errors");
};
