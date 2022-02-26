import { ErrorTracker } from "./error-tracker";
import * as Sentry from "@sentry/node";
import { config } from "../../modules/config";

Sentry.init({
  dsn: config.get("sentry.dsn"),
  tracesSampleRate: 1.0,
  serverName: config.get("server.name"),
  environment: config.get("env"),
  enabled: config.get("sentry.enabled"),
});

export class SentryErrorTracker implements ErrorTracker {
  trackError(error: Error) {
    Sentry.captureException(error);
  }
}
