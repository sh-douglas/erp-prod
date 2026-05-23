const mongoose = require("mongoose");
const CounterSchema = require("../schemas/counter.schema.js");

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;
