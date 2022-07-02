const { User } = require("../models/user.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");

const createUser = catchAsync(async (req, res, next) => {

    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });
    console.log(newUser);

    res.status(201).json({
      status: "success",
      newUser,
    });
});

const getAllusers = catchAsync(async (req, res, next) => {
  // metodo 1: User.findAll().then(users => {}).catch(err => {});
    const users = await User.findAll();
    //process the request (return the list the users)
    res.status(200).json({
      status: "success",
      users,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "the user not found",
    });
  }

  await user.update({ name, email });

  res.status(204).json({
    status: "success",
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "the user not found",
      });
    }
    //
    //await user.destroy();
    await user.update({ status: "disabled" });

    res.status(204).json({
      status: "success",
    });
});

module.exports = {
  getAllusers,
  createUser,
  updateUser,
  deleteUser,
};
