import mongoose from "mongoose";
import appConfig from "./config";

export const databaseConnect = () => {
    return mongoose
        .connect(appConfig.database, { useCreateIndex: true })
        .then(() => console.log("MongoDb is Ready"))
        .catch((err) => console.log(`Oops!! Something went wrong ${err}`));
};
