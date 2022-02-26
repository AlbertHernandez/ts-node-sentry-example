import { Middleware } from "koa";
import { container } from "../../modules/dependency-injection";

export const requestContainerMiddleware: Middleware = async (ctx, next) => {
  ctx.state.container = container.createScope();

  await next();
};
