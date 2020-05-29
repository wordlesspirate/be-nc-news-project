const { fetchTopics, checkTopicExists } = require("../models/topics");
const { fetchAllArticles } = require("../models/articles");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      // console.log(topics);
      res.status(200).send({ topics });
    })
    .catch(next);
};
