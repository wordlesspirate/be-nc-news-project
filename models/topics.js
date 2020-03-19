const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex.select("*").from("topics");
};

//just added
exports.checkTopicExists = topic => {
  return knex("topics")
    .select("*")
    .where("slug", topic)
    .then(([topic]) => {
      if (!topic)
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you're looking for!"
        });
    });
};
