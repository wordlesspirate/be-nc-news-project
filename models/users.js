const knex = require("../db/connection");

exports.fetchUserByUsername = (username) => {
  return knex.select("*").from("users").where("username", username).first();
};
