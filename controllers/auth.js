const User = require("../models/user");
const jwt = require("jsonwebtoken"); // generate token
const {
  errorHandler,
} = require("../helpers/dbErrorHandler");

/*
 ** User Signup
 */
exports.signup = (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

/*
 **User Signin
 */
exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    }

    // if User is found make sure that email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET
    );

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const {
      _id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
    } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        role,
        createdAt,
        updatedAt,
      },
    });
  });
};

/*
 **User Signout
 */
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
