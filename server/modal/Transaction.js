const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
    min: 0,
  },
  notes: {
    required: true,
    type: String,
    min: 0,
    max: 256,
  },
  transactionCat: {
    required: false,
    type: String,
  },
  transactionDate: {
    required: true,
    type: Date,
    default: new Date(),
  },
  createdAt: {
    required: true,
    type: Date,
    default: new Date(),
  },
  expenseType: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
