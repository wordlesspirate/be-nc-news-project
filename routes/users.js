const usersRouter = require("express").Router();

const { getAllUsers, getUserByUsername } = require("../controllers/users.js");

const { invalidMethodsErrorHandler } = require("../errors/index");

usersRouter.route("/").get(getAllUsers).all(invalidMethodsErrorHandler);

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(invalidMethodsErrorHandler);

module.exports = usersRouter;
