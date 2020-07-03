const { fetchAllTopics } = require("../models/topics");

exports.getAllTopics = (req, res, next) => {
  const { limit, page } = req.query;
  fetchAllTopics(limit, page)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
}
