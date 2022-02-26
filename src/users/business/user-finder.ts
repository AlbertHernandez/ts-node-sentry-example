import { UserRepository } from "./user-repository";
import { Logger } from "./logger";

export class UserFinder {
  #userRepository;
  #logger;

  constructor(dependencies: {
    userRepository: UserRepository;
    logger: Logger;
  }) {
    this.#userRepository = dependencies.userRepository;
    this.#logger = dependencies.logger;
  }

  run() {
    this.#logger.debug("Running User Finder");
    return this.#userRepository.getAllUsers();
  }
}
