const expressJwt = require("express-jwt"); // authorization check
const User = require("../models/user");

exports.isAuth = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAdmin = (req, res, next) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (user.role === 1) {
      return next();
    }
    return res.status(403).json({
      error: "Oops !! It's Admin resourse! Access denied",
    });
  });
};
