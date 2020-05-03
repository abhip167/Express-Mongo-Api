const prodConfig = {
    port: process.env.PORT || 8080,
    database:
        "mongodb://abhip167:nairuti167@ds143191.mlab.com:43191/express-app-prod",
    secrets: {
        secrets: {
            JWT_SECRET: process.env.JWT_SECRET,
        },
    },
};

export default prodConfig;
