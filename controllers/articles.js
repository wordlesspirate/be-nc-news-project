const {
  fetchArticleById,
  updateArticle,
  fetchAllArticles
} = require("../models/articles");

const { checkUsernameExists, fetchUserByUsername } = require("../models/users");
// exports.getArticleById = (req, res, next) => {
//   const { article_id } = req.params;

//   fetchArticleById(article_id)
//     .then(article => {
//       if (article) {
//         res.status(200).send({ article });
//       } else {
//         return Promise.reject({
//           status: 404,
//           msg: "Sorry, can't find what you are looking for!"
//         });
//       }
//     })
//     .catch(next);
// };

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      if (article) {
        res.status(200).send({ article });
      } else {
        return Promise.reject({
          status: 404,
          msg: "Sorry, can't find what you are looking for!"
        });
      }
    })
    .catch(next);
};

// exports.patchArticle = (req, res, next) => {
//   const { article_id } = req.params;
//   const { inc_votes } = req.body;

//   if (isNaN(inc_votes) || Object.keys(req.body).length !== 1) {
//     next({
//       status: 400,
//       msg: "Sorry, bad request!"
//     });
//   } else {
//     updateArticle(article_id, inc_votes)
//       .then(article => {
//         res.status(200).send({ article });
//       })
//       .catch(next);
//   }
// };

//working on this one
exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // if (isNaN(inc_votes) || Object.keys(req.body).length !== 1) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Sorry, bad request!"
  //   });
  // } else {
  // if (isNaN(inc_votes)) {
  //   return Promise.reject({
  //     status: 400,
  //     msg: "Sorry, bad request!"
  //   });
  // } else {
  updateArticle(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
//}

exports.getAllArticles = (req, res, next) => {
  const { author } = req.query;

  if (author) {
    Promise.all([checkUsernameExists(author), fetchAllArticles(req.query)])
      .then(([user, articles]) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else {
    fetchAllArticles(req.query)
      .then(articles => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
};

// exports.getArticlesByAuthor = (req, res, next) => {
//   const { author } = req.query;
//   Promise.all([checkUsernameExists(author), fetchAllArticles(req.query)])
//     .then(result => {
//       console.log(result, "<---");
//       res.status(200).send({ result });
//     })
//     .catch(next);
// };
