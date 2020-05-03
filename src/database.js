import mongoose from "mongoose";
import appConfig from "./config";
import { seedUsers, seedShots } from "../seed";

export const databaseConnect = async () => {
    try {
        await mongoose.connect(appConfig.database, { useCreateIndex: true });
        console.log("MongoDb is Ready");

        if (process.env.NODE_ENV === "development" || "dev") {
            seedUsers();
            seedShots();
        }
    } catch (error) {
        console.log(`Oops!! Something went wrong ${error}`);
    }
};
