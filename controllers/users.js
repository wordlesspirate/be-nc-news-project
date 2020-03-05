const { fetchUserByUsername } = require("../models/users");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (user) {
        res.status(200).send({ user });
      } else {
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you are looking for!"
        });
      }
    })
    .catch(next);
};
