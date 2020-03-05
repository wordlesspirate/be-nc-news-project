const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users.js");
const { invalidMethodsErrorHandler } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(invalidMethodsErrorHandler);

module.exports = usersRouter;
