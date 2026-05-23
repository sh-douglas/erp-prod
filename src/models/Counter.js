const mongoose = require("mongoose");
const CounterSchema = require("../schema/counter.schema.js");

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;
