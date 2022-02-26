import Koa from "koa";
import * as Awilix from "awilix";
import { Controller } from "../controllers";
import { UuidGenerator } from "../../business/uuid-generator";
import { container } from "../../modules/dependency-injection";
import { Logger } from "../../business/logger";

export const handleRequest =
  (controllerInstanceName: string) => async (ctx: Koa.Context) => {
    const requestId = UuidGenerator.generateUuid();
    ctx.set("Request-Id", requestId);

    const logger = container.resolve<Logger>("logger");
    const requestLogger = logger.child({
      requestId,
    });

    const requestContainer = container.createScope();

    requestContainer.register({
      logger: Awilix.asValue(requestLogger),
    });

    const controllerInstance = requestContainer.resolve<Controller>(
      controllerInstanceName
    );

    await controllerInstance.run(ctx);
  };
