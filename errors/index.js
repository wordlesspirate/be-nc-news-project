exports.handlePathErrors = (req, res, next) =>
  res.status(404).send({ msg: "Sorry, path not found!" });

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.status)
    res.status(err.status).send({
      msg: "Sorry, can't find what you are looking for!",
    });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02", "23503", "42703"];
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Sorry, bad request!" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({
    msg: "Sorry, Internal Server Error!",
  });
};



exports.invalidMethodsErrorHandler = (req, res, next) => {
  res.status(405).send({ msg: "Sorry, method not allowed on this path!" });
};

exports.logErrors = (err, req, res, next) => {
  // console.log("---> from errors file", err);
  next(err);
};

const HTTP_ERRORS = {

  BAD_REQUEST: { status: 400, msg: "Sorry, bad request!" },
  NOT_FOUND: {
    status: 404,
    msg: "Sorry, unable to find what you are looking for!",
  },
};


exports.HTTP_ERRORS = HTTP_ERRORS;
