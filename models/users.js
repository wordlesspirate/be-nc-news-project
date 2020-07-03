const knex = require("../db/connection");
const { isStringNotEmpty } = require("../validations/validations");

exports.fetchAllUsers = () => {
  return knex.select("*").from("users");
};

exports.fetchUserByUsername = (username) => {
  if (!isStringNotEmpty(username)) {
    return Promise.reject({
      status: 404,
      msg: "Sorry, unable to find the username you are looking for!",
    });
  }
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .first()
    .then((user) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "Sorry, unable to find the username you are looking for!",
        });
      }
      return user;
    });
};
