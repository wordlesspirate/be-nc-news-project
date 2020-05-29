const { fetchEndpoints } = require("../models/endpoints.js");

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then((endpoints) => {
      // console.log(endpoints);
      res.status(200).send({ endpoints });
    })
    .catch(next);
};
