const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticle,
  getAllArticles,
} = require("../controllers/articles.js");
const {
  postComment,
  getCommentsByArticleId,
} = require("../controllers/comments");
const { invalidMethodsErrorHandler } = require("../errors/index");

articlesRouter.route("/").get(getAllArticles).all(invalidMethodsErrorHandler);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .all(invalidMethodsErrorHandler);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(invalidMethodsErrorHandler);

module.exports = articlesRouter;
