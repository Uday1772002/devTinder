const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/auth");
const RazorpayInstance = require("../utils/razorpay");
const paymentModel = require("../models/payments");
const User = require("../models/user");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

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

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      req.headers("x-razorpay-signature"),
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );
    console.log("Webhook valid:", webhookValid);
    if (!webhookValid) {
      return res.status(400).send("Invalid webhook signature");
    }
    //update payment status based on the event if the webhook is valid and update the user's membership status accordingly and return response as success to razorpay
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await paymentModel.findOne({
      orderId: paymentDetails.order_id,
    });
    if (!payment) {
      return res.status(404).send("Payment not found");
    }
    // Update payment status based on the event type received from Razorpay
    payment.status = paymentDetails.status;
    await payment.save();

    // Update user's membership status based on the payment status
    const user = await User.findById({ _id: payment.userId });
    user.isPremium == true;
    user.membershipType = payment.notes.membershipType;
    const currentDate = new Date();
    if (payment.notes.membershipType === "silver") {
      user.membershipValidUntil = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1),
      );
    } else if (payment.notes.membershipType === "gold") {
      user.membershipValidUntil = new Date(
        currentDate.setMonth(currentDate.getMonth() + 3),
      );
    } else if (payment.notes.membershipType === "premium") {
      user.membershipValidUntil = new Date(
        currentDate.setFullYear(currentDate.getFullYear() + 1),
      );
    }
    await user.save();


    console.log("Payment and user membership status updated successfully");
    return res.status(200).send("Webhook received successfully");
  } catch (err) {
    res.status(500).send("Error in webhook:" + err.message);
    console.log(err);
  }
});

module.exports = paymentRouter;
