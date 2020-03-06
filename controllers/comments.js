const {
  updateComment,
  removeCommentById,
  addComment,
  fetchCommentsByArticleId
} = require("../models/comments");

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(delCount => {
      if (delCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you are looking for!"
        });
      } else {
        res.sendStatus(204);
      }
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
