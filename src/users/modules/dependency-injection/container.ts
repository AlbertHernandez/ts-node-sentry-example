import * as Awilix from "awilix";
import { PinoLogger } from "../../business/logger";
import { config } from "../config";
import UsersGetController from "../../api/controllers/users-get-controller";
import { InMemoryUserRepository } from "../../business/user-repository";
import { UserFinder } from "../../business/user-finder";
import UsersPostController from "../../api/controllers/users-post-controller";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

container.register({
  usersGetController: Awilix.asClass(UsersGetController),
  usersPostController: Awilix.asClass(UsersPostController),
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
