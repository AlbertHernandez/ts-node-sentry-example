import * as Awilix from "awilix";
import { PinoLogger } from "../../business/logger";
import { config } from "../config";
import UsersPostController from "../../api/controllers/users-post-controller";
import { SentryErrorTracker } from "../../business/error-tracker";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  usersPostController: Awilix.asClass(UsersPostController),
  errorTracker: Awilix.asClass(SentryErrorTracker),
  logger: Awilix.asClass(PinoLogger).inject(() => {
    return {
      level: config.get("logger.level"),
      isEnabled: config.get("logger.isEnabled"),
    };
  }),
});

export { container };
