const express = require("express");
const {
  getAllusers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
//middlewares
const {
  createUserValidators,
} = require("../middlewares/validator.middlewares");

//define enpoints async / await

const usersRouter = express.Router();

usersRouter.get("/", getAllusers);

usersRouter.post("/", createUserValidators, createUser);

usersRouter.patch("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

module.exports = { usersRouter };
