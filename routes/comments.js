const commentsRouter = require("express").Router();

const {
  patchComment,
  deleteCommentById,
} = require("../controllers/comments.js");

const { invalidMethodsErrorHandler } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteCommentById)
  .all(invalidMethodsErrorHandler);

module.exports = commentsRouter;
