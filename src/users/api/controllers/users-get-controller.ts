import Koa from "koa";
import { Controller } from "./controller";
import { UserFinder } from "../../business/user-finder";
import { Logger } from "../../business/logger";

export default class UsersGetController implements Controller {
  #userFinder;
  #logger;

  constructor(dependencies: { userFinder: UserFinder; logger: Logger }) {
    this.#logger = dependencies.logger;
    this.#userFinder = dependencies.userFinder;
  }

  async run(ctx: Koa.Context) {
    this.#logger.debug("Received a request for getting users");
    const users = this.#userFinder.run();

    this.#logger.debug("Returning list of users in the http request");
    ctx.body = {
      users,
    };
  }
}
