//  Not Found Error

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
export const logErrors = (error, req, res) => {
    res.status(error.status || 500);
    res.send(error);
};
