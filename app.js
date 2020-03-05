const express = require("express");
const apiRouter = require("./routes/api");

const {
  mainRouteError,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/index");

const app = express();

app.use(express.json());

app.use("/api", apiRouter).all("/*", mainRouteError);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
