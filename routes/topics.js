const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");
const { invalidMethodsErrorHandler } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(invalidMethodsErrorHandler);

module.exports = topicsRouter;
