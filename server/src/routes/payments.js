const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/auth");
const RazorpayInstance = require("../utils/razorpay");
const paymentModel = require("../models/payments");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const order = await RazorpayInstance.orders.create({
      amount: 50000, // Amount in paise (500.00 INR)
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: "value3",
        lastName: "value2",
        memberShipType: "premium",
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
    res.json({ ...savedPayment.toJSON() });
  } catch (err) {
    res.status(500).send("Error creating payment:" + err.message);
    console.log(err);
  }
});

module.exports = paymentRouter;
