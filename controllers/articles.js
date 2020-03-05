const {
  fetchArticleById,
  updateArticle,
  addComment,
  fetchCommentsByArticleId,
  fetchAllArticles
} = require("../models/articles");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then(article => {
      if (article) {
        res.status(200).send({ article });
      } else {
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you are looking for!"
        });
      }
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (isNaN(inc_votes) || Object.keys(req.body).length !== 1) {
    next({
      status: 400,
      msg: "Sorry, bad request!"
    });
    return;
  }

  updateArticle(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  if (!body || !username || Object.keys(req.body).length !== 2) {
    next({
      status: 400,
      msg: "Sorry, bad request!"
    });
    return;
  }
  addComment(article_id, username, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
