const knex = require("../db/connection");

exports.updateComment = (comment_id, inc_votes) => {
  return knex("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

exports.addComment = (article_id, username, body) => {
  return knex
    .insert({
      author: username,
      article_id: article_id,
      body: body
    })
    .into("comments")
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

exports.fetchCommentsByArticleId = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return knex("comments")
    .where("comments.article_id", article_id)
    .orderBy(sort_by, order);
};

exports.removeCommentById = comment_id => {
  return knex("comments")
    .where("comments.comment_id", comment_id)
    .del();
};
