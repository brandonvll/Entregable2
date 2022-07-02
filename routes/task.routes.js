const express = require("express");
const {
  getAllTasks,
  createTasks,
  getTasksByStatus,
  updateTasks,
  deleteTasks,
} = require("../controllers/task.controller");
const { createUserValidators } = require("../middlewares/validator.middlewares");

const tasksRouter = express.Router();

tasksRouter.get("/", getAllTasks);

tasksRouter.post("/", createTasks);

tasksRouter.get("/:status", createUserValidators,  getTasksByStatus);

tasksRouter.patch("/:id", updateTasks);

tasksRouter.delete("/:id", deleteTasks); 

module.exports = { tasksRouter };
