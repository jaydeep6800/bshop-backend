exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("email", "Email is required").notEmpty();
  req.check("password", "Password is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 character")
    .matches(/.+\@.+\..+/)
    .withMessage("invalid email")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Email must be between 4 to 32 character");
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
