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

// exports.updateArticle = (article_id, newVote) => {
//   return knex("articles")
//     .where("articles.article_id", article_id)
//     .increment("votes", newVote.inc_votes)
//     .returning("*")
//     .then(article => {
//       return article[0];
//     });
// };

exports.updateArticle = (article_id, inc_votes) => {
  return knex("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      return article[0];
    });
};

exports.fetchAllArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .count({ comment_count: "comment_id" })
    .from("articles")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where({ topic });
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order);
};

// select
//   EXISTS (select 1 from users where username = 'lurker') as author_exists,
//   articles.*
// from articles
// inner join users on  articles.author = users.username and articles.author = 'lurker';
