const { body, validationResult } = require("express-validator");

const checkResault = (res, req, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const createUserValidators = [
  body("name").notEmpty().withMessage("name cannot be emty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .isAlphanumeric()
    .withMessage("the password must contend leters and numbers"),
  body("title").notEmpty().withMessage("Is necesary the title of the task"),
  body("userId").isNumeric().withMessage("the UserId must be at numeric"),
  checkResault,
];

module.exports = { createUserValidators };
