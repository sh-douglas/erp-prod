const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
      default: 10000,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CounterSchema;
