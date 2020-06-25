const User = require("../models/user");
const braintree = require("braintree");
const { response } = require("express");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BARINTREE_MERCHANT_ID,
  publicKey: process.env.BARINTREE_PUBLIC_KEY,
  privateKey: process.env.BARINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  User.findById(req.auth._id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    gateway.clientToken.generate({}, function (
      err,
      response
    ) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  //charge
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
