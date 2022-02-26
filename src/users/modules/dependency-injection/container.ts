import * as Awilix from "awilix";
import { PinoLogger } from "../../business/logger";
import { config } from "../config";
import UsersGetController from "../../api/controllers/users-get-controller";
import { InMemoryUserRepository } from "../../business/user-repository";
import { UserFinder } from "../../business/user-finder";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  usersGetController: Awilix.asClass(UsersGetController),
  userRepository: Awilix.asClass(InMemoryUserRepository),
  userFinder: Awilix.asClass(UserFinder),
  logger: Awilix.asClass(PinoLogger).inject(() => {
    return {
      level: config.get("logger.level"),
      isEnabled: config.get("logger.isEnabled"),
    };
  }),
});

export { container };
