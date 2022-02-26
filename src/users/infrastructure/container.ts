import * as Awilix from "awilix";
import { config } from "./config";
import UsersPostController from "../backend/controllers/users-post-controller";
import { SentryErrorTracker } from "./sentry-error-tracker";
import { PinoLogger } from "./pino-logger";
import { UserCreator } from "../application/user-creator";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  usersPostController: Awilix.asClass(UsersPostController),
  userCreator: Awilix.asClass(UserCreator),
  errorTracker: Awilix.asClass(SentryErrorTracker),
  logger: Awilix.asClass(PinoLogger).inject(() => {
    return {
      level: config.get("logger.level"),
      isEnabled: config.get("logger.isEnabled"),
    };
  }),
});

export { container };
