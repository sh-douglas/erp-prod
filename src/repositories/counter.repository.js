const Counter = require("../models/Counter.js");

async function incrementEmployeeCodeCounter() {
  const counter = await Counter.findOneAndUpdate(
    { name: "employeeCode" },
    { $inc: { value: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  return counter.value;
}

module.exports = {
  incrementEmployeeCodeCounter,
};
