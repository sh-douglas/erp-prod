const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    employeeCode: {
      type: String,
      required: true,
      unique: true,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false,
    },
    acceptedTermsAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = UserSchema;
