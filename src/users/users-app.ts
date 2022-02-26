import Koa from "koa";
import http from "http";
import { Logger } from "./business/logger";
import { container } from "./modules/dependency-injection";
import { usersRouter } from "./api/routes";
import { config } from "./modules/config";
import {
  errorHandlerMiddleware,
  requestContainerMiddleware,
  requestContextMiddleware,
  requestLoggerMiddleware,
  sentryScopeMiddleware,
} from "./api/middlewares";
import { initSentry } from "./modules/sentry/init-sentry";

export class UsersApp {
  private koa: Koa;
  readonly port: number;
  private logger: Logger;
  httpServer?: http.Server;

  constructor() {
    initSentry();
    this.logger = container.resolve<Logger>("logger");
    this.port = config.get("server.port");
    this.koa = new Koa();

    this.koa.use(requestContainerMiddleware);
    this.koa.use(requestContextMiddleware);
    this.koa.use(sentryScopeMiddleware);
    this.koa.use(requestLoggerMiddleware);
    this.koa.use(errorHandlerMiddleware);
    this.koa.use(usersRouter.middleware());
  }

  async start(): Promise<void> {
    this.httpServer = await this.koa.listen(this.port);
    const env = config.get("env");
    this.logger.info(
      `Users Backend App is running at http://localhost:${this.port} in ${env} mode`
    );
  }
}
