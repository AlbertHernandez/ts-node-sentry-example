import Router from "koa-router";
import { handleRequest } from "./handle-request";

const usersRouter = new Router({
  prefix: "/users",
});

usersRouter.get("/", handleRequest("usersGetController"));
usersRouter.post("/", handleRequest("usersPostController"));

export { usersRouter };
