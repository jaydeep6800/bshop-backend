const User = require("../models/user");

exports.sendUserData = (req, res) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      user,
    });
  });
};

exports.update = (req, res) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    User.findOneAndUpdate(
      { _id: user._id },
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error:
              "You are not authorized to perform this action",
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
          user,
        });
      }
    );
  });
};
