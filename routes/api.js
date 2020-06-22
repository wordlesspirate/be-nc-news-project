const apiRouter = require("express").Router();

const { getEndpoints } = require("../controllers/endpoints");

const topicsRouter = require("./topics");
// const usersRouter = require("./users");
// const articlesRouter = require("./articles");
// const commentsRouter = require("./comments");

const { invalidMethodsErrorHandler } = require("../errors");

apiRouter.route("/").get(getEndpoints).all(invalidMethodsErrorHandler);

apiRouter.use("/topics", topicsRouter);
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/articles", articlesRouter);
// apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
