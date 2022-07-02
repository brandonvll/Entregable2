const express = require("express");

//Routers
const { usersRouter } = require("./routes/user.routes");
const { tasksRouter } = require("./routes/task.routes");

//utils

//init express app
const app = express();

//save types json
app.use(express.json());

//Routes
//http//:localhost:4000/users
//http//:localhost:4000/tasks
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", tasksRouter);

//global error handler
app.use("*", (err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    message: "...",
    error: err,
  });
});

module.exports = { app };
