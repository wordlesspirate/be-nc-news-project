const knex = require("../db/connection");

exports.fetchArticleById = article_id => {
  return knex
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .first();
};

exports.updateArticle = (article_id, newVote) => {
  return knex("articles")
    .where("articles.article_id", article_id)
    .increment("votes", newVote.inc_votes)
    .returning("*")
    .then(article => {
      return article[0];
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

exports.fetchAllArticles = ({ sort_by = "created_at", order = "desc" }) => {
  return knex
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order);
};
