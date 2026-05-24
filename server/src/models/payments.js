const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["created", "paid", "failed"],
        message: `{$VALUE} not supported`,
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
    },
    notes: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      membershipType: {
        type: String,
        // enum: {
        //   values: ["silver", "gold", "premium"],
        //   message: `{$VALUE} not supported`,
        // },
      },
    },
  },
  { timestamps: true },
);

const PaymentModel = new mongoose.model("PaymentModel", paymentSchema);

module.exports = PaymentModel;
