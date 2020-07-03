const topicsRouter = require("express").Router();

const { getAllTopics } = require("../controllers/topics");

const { invalidMethodsErrorHandler } = require("../errors/index");

topicsRouter.route("/").get(getAllTopics).all(invalidMethodsErrorHandler);

module.exports = topicsRouter;
