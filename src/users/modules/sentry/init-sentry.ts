import * as Sentry from "@sentry/node";
import { config } from "../config";

export const initSentry = () => {
  Sentry.init({
    dsn: config.get("sentry.dsn"),
    tracesSampleRate: 1.0,
    serverName: config.get("server.name"),
    environment: config.get("env"),
    enabled: config.get("sentry.enabled"),
  });
};
