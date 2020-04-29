import merge from "lodash.merge";
import devConfig from "./devConfig";
import prodConfig from "./prodConfig";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;

// Config Available to both dev and prod env
const baseConfig = {
  secret: {},
};

//config available only for a specific env
let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = devConfig;
    break;
  case "production":
  case "prod":
    envConfig = prodConfig;
    break;

  default:
    envConfig = devConfig;
}

export default merge(baseConfig, envConfig);
