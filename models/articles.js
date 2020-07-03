const knex = require("../db/connection");

const { NOT_FOUND, BAD_REQUEST } = require("../errors/index").HTTP_ERRORS;
const { isNumber, isPositiveNumber, isStringNotEmpty, isValidOrder } = require("../validations/validations");
const { withOrderBy, withPagination } = require("../db/queries")
const { fetchUserByUsername } = require("./users")
const { fetchTopic } = require("./topics");

exports.fetchArticleById = (article_id) => {
  if (!isPositiveNumber(article_id)) {
    return Promise.reject(BAD_REQUEST);
  }
  return knex
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .first()
    .then((article) => {
      if (!article) {
        return Promise.reject(NOT_FOUND);
      } else {
        return article;
      }
    });
};

exports.updateArticle = (article_id, inc_votes = 0) => {
  if (!isPositiveNumber(article_id) || !isNumber(inc_votes)) {
    return Promise.reject(BAD_REQUEST);
  }

  return knex("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(([article]) => article)
};

exports.addComment = (article_id, username, body) => {
  if (!isPositiveNumber(article_id) || !isStringNotEmpty(username) || !isStringNotEmpty(body)) {
    return Promise.reject(BAD_REQUEST);
  }

  return knex
    .insert({
      author: username,
      article_id: article_id,
      body: body,
    })
    .into("comments")
    .returning("*")
    .then(([comment]) => comment);
};

exports.fetchCommentsByArticleId = (article_id, sort_by = "created_at", order = "desc") => {
  if (!isPositiveNumber(article_id)) {
    return Promise.reject(BAD_REQUEST);
  }

  return knex("comments")
    .select("*")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then((result) => {
      if (!result.length)
        return Promise.reject(NOT_FOUND);
      return result;
    });
};

exports.fetchAllArticles = (author, topic, sort_by = "created_at", order = "desc", page = 1, limit = 10) => {
  if (!isValidOrder(order)) {
    return Promise.reject(BAD_REQUEST);
  }
  return knex("articles")
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
    .modify(withAuthor, author)
    .modify(withTopic, topic)
    .modify(withPagination, limit, page)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .then((articles) => {
      if (articles.length === 0) {
        return validateIfExists(topic, author)
      } else return [articles];
    })
    .then(([articles]) => {
      return articles;
    });
};

const validateIfExists = (topic, author) => {
  const validations = []

  if (topic) validations.push(fetchTopic(topic))
  if (author) validations.push(fetchUserByUsername(author))

  return Promise.all([[], ...validations])
}


const withAuthor = (query, author) => {
  if (author) {
    query.where("articles.author", author)
  }
}

const withTopic = (query, topic) => {
  if (topic) {
    query.where("articles.topic", topic)
  }
}