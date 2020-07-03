const knex = require("../db/connection");
const { withPagination } = require("../db/queries");
const { isNumber, isStringNotEmpty } = require("../validations/validations");
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index").HTTP_ERRORS;

exports.fetchTopic = (topic) => {
  if (!isStringNotEmpty(topic)) {
    return Promise.reject(BAD_REQUEST);
  }
  return knex
    .select("*")
    .from("topics")
    .where("slug", topic)
    .first()
    .then((topic) => {
      if (!topic) return Promise.reject(NOT_FOUND)
      return topic
    });
};

exports.fetchAllTopics = (limit = 10, page = 1) => {
  if (!isNumber(limit) || !isNumber(page)) return Promise.reject(BAD_REQUEST);
  return knex.select("*").from("topics").modify(withPagination, limit, page).then((topics) => topics)
};
