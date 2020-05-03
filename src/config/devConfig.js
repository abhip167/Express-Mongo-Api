const devConfig = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE,
    secrets: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
};

export default devConfig;
