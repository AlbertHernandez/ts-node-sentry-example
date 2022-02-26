import { Middleware } from "koa";
import * as Sentry from "@sentry/node";
import { AwilixContainer } from "awilix";
import { Logger } from "../../business/logger";

export const errorHandlerMiddleware: Middleware = async (ctx, next) => {
  const scopedContainer: AwilixContainer = ctx.state.container;
  const logger = scopedContainer.resolve<Logger>("logger");

  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
    if (error instanceof Error) {
      logger.error({
        message: error.message,
        context: {
          stack: error.stack,
        },
      });
      Sentry.captureException(error);
    }
  }
};
