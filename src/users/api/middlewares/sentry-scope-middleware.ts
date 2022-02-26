import * as Sentry from "@sentry/node";
import { Middleware } from "koa";
import { AwilixContainer } from "awilix";

export const sentryScopeMiddleware: Middleware = async (ctx, next) => {
  const scopedContainer: AwilixContainer = ctx.state.container;
  const requestContext = scopedContainer.resolve("requestContext");

  Sentry.configureScope((scope: Sentry.Scope) => {
    scope.addEventProcessor((event) => {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });

    scope.setTag("Type", "Request");

    scope.setContext("Request", requestContext);

    scope.setUser({
      ip_address: ctx.ip,
    });
  });

  await next();
};
