import { User } from "../models";
import { UserRepository } from "./user-repository";
import { Logger } from "../logger";

export class InMemoryUserRepository implements UserRepository {
  #inMemoryUsers: User[];
  #logger;

  constructor(dependencies: { logger: Logger }) {
    this.#logger = dependencies.logger;
    this.#inMemoryUsers = [
      new User({
        id: "1",
        name: "juan",
        age: 15,
      }),
      new User({
        id: "2",
        name: "pepe",
        age: 16,
      }),
      new User({
        id: "3",
        name: "pedro",
        age: 13,
      }),
    ];
  }

  getAllUsers(): User[] {
    this.#logger.debug("Getting all the users in the user repository");
    return this.#inMemoryUsers;
  }
}
