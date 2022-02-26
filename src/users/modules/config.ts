import dotenv from "dotenv";
import convict from "convict";

dotenv.config();

const config = convict({
  server: {
    port: {
      doc: "Port of the server",
      format: "Number",
      default: 3000,
      env: "PORT",
    },
  },
  env: {
    doc: "The application environment.",
    format: ["production", "beta", "development"],
    default: "development",
    env: "NODE_ENV",
  },
  logger: {
    level: {
      doc: "Level of the logger",
      format: ["debug", "info", "warn", "error", "fatal"],
      default: "fatal",
      env: "LOGGER_LEVEL",
    },
    isEnabled: {
      doc: "Indicates if logger is enabled",
      format: "Boolean",
      default: true,
      env: "LOGGER_ENABLE",
    },
  },
});

config.validate();

export { config };
