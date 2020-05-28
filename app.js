const express = require("express");

const cors = require("cors");

const apiRouter = require("./routes/api");

const {
  mainRouteError,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  logErrors,
} = require("./errors/index");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter).all("/*", mainRouteError);

// app.use(logErrors);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
