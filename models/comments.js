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

exports.removeCommentById = comment_id => {
  return knex("comments")
    .where("comments.comment_id", comment_id)
    .del();
};