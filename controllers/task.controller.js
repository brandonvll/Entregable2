const { Task } = require("../models/task.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const createTasks = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
  });

  res.status(201).json({
    status: "success",
    newTask,
  });
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  const task = await Task.findOne({ where: { status } });

  res.status(200).json({
    status: "success",
    task,
  });
});

const updateTasks = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, userId, finishDate } = req.body;

  const task = await Task.findOne({ where: { id } });

  const taskLimitDate = task.limitDate;

  console.log(taskLimitDate.getTime(), new Date(finishDate));
  if (new Date(finishDate).getTime() > taskLimitDate.getTime()) {
    await task.update({
      finishDate,
      status: "late",
    });
  } else {
    await task.update({
      finishDate,
      status: "complete",
    });
  }
  /*   if (!user) {
    res.status(404).json({
      status: "error",
      message: "the task not found",
    });
  } */

  //await task.update({ title, userId, finishDate });

  res.status(201).json({
    status: "success",
  });
});

const deleteTasks = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id } });

  if (!task) {
    res.status(404).json({
      status: "error",
      message: "the task not found",
    });
  }
  await task.update({ status: "cancelled" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTasksByStatus,
  updateTasks,
  deleteTasks,
};
