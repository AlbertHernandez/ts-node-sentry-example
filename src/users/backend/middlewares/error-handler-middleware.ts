import { Middleware } from "koa";
import { AwilixContainer } from "awilix";
import { Logger } from "../../domain/logger";
import { ErrorTracker } from "../../domain/error-tracker";

export const errorHandlerMiddleware: Middleware = async (ctx, next) => {
  const scopedContainer: AwilixContainer = ctx.state.container;
  const logger = scopedContainer.resolve<Logger>("logger");

  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Internal Server Error";
    if (error instanceof Error) {
      const errorTracker =
        scopedContainer.resolve<ErrorTracker>("errorTracker");
      logger.error({
        message: error.message,
        context: {
          stack: error.stack,
        },
      });
      errorTracker.trackError(error);
    }
  }
};
