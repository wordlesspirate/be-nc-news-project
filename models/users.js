const knex = require("../db/connection");

exports.fetchUserByUsername = username => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .first();
};

exports.checkUsernameExists = username => {
  return knex("users")
    .select("*")
    .where({ username })
    .then(([user]) => {
      if (!user)
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you're looking for!"
        });
    });
};
