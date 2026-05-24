const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/auth");
const RazorpayInstance = require("../utils/razorpay");
const paymentModel = require("../models/payments");
const { membershipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, email } = req.user;
    const order = await RazorpayInstance.orders.create({
      amount: membershipAmount[membershipType].price * 100, // amount in paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        membershipType: membershipType,
      },
    });
    //save the order details
    const paymentDetails = new paymentModel({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      notes: order.notes,
    });
    const savedPayment = await paymentDetails.save();
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).send("Error creating payment:" + err.message);
    console.log(err);
  }
});

module.exports = paymentRouter;
