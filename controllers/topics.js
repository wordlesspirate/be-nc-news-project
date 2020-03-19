const { fetchTopics, checkTopicExists } = require("../models/topics");
const { fetchAllArticles } = require("../models/articles");

// exports.getTopics = (req, res, next) => {
//   fetchTopics()
//     .then(topics => {
//       res.status(200).send({ topics });
//     })
//     .catch(next);
// };

//changes

exports.getTopics = (req, res, next) => {
  const { topic } = req.query;

  if (topic) {
    Promise.all([checkTopicExists(topic), fetchAllArticles(req.query)])
      .then(([topic, articles]) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else {
    fetchTopics()
      .then(topics => {
        res.status(200).send({ topics });
      })
      .catch(next);
  }
};
