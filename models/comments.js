const knex = require("../db/connection");
const { BAD_REQUEST } = require("../errors/index").HTTP_ERRORS;
const { fetchArticleById } = require("../models/articles");
const { isPositiveNumber, isNumber, isStringNotEmpty } = require("../validations/validations");
const { withOrderBy } = require("../db/queries");

exports.updateComment = (comment_id, inc_votes = 0) => {
  if (!isPositiveNumber(comment_id) || !isNumber(inc_votes)) {
    return Promise.reject(BAD_REQUEST)
  }

  return knex("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

exports.addComment = (article_id, username, body) => {
  if (!isPositiveNumber(article_id) || isStringNotEmpty(username) || !isStringNotEmpty(body)) {
    return Promise.reject(BAD_REQUEST)
  }

  return knex
    .insert({
      author: username,
      article_id: article_id,
      body: body,
    })
    .into("comments")
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

exports.fetchCommentsByArticleId = (article_id, sort_by = "created_at", order = "desc") => {
  if (!fetchArticleById(article_id))
    return Promise.reject({
      status: 404,
      msg: "Sorry, unable to find the article you are looking for!",
    });

  return knex("comments")
    .where("comments.article_id", article_id)
    .modify(withOrderBy, order, sort_by)
};

exports.removeCommentById = (comment_id) => {
  if (!isPositiveNumber(comment_id)) {
    return Promise.reject(BAD_REQUEST)
  }

  return knex("comments").where("comments.comment_id", comment_id).del().then((delCount) => {
    if (delCount === 0) {
      return Promise.reject({
        status: 404,
        msg: "Sorry, unable to find what you are looking for!",
      });
    }
  })
};

