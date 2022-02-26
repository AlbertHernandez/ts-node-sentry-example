import Koa from "koa";
import { Controller } from "./controller";
import { Logger } from "../../business/logger";
import { User } from "../../business/models";
import { UuidGenerator } from "../../business/uuid-generator";

export default class UsersPostController implements Controller {
  #logger;

  constructor(dependencies: { logger: Logger }) {
    this.#logger = dependencies.logger;
  }

  async run(ctx: Koa.Context) {
    this.#logger.debug("Received a request for creating a user");

    const user = new User({
      age: ctx.request.body.age,
      name: ctx.request.body.name,
      id: UuidGenerator.generateUuid(),
    });

    this.#logger.debug("Finalized request for creating a user");

    ctx.status = 201;
    ctx.body = user;
  }
}
