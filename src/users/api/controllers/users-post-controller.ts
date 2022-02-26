import Koa from "koa";
import { Controller } from "./controller";
import { Logger } from "../../business/logger";

export default class UsersPostController implements Controller {
  #logger;

  constructor(dependencies: { logger: Logger }) {
    this.#logger = dependencies.logger;
  }

  async run(ctx: Koa.Context) {
    this.#logger.debug("Received a request for creating users");

    ctx.status = 200;
  }
}
