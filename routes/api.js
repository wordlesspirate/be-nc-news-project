const apiRouter = require("express").Router();
require;
const endpoints = require("../endpoints.json");

const topicsRouter = require("./topics");
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");

const { invalidMethodsErrorHandler } = require("../errors");

const getEndpoints = (req, res, next) => {
  Promise.resolve()
    .then(() => {
      res.status(200).send({ endpoints });
    })
    .catch(next);
};

apiRouter.route("/").get(getEndpoints).all(invalidMethodsErrorHandler);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
