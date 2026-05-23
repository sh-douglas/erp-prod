const CounterRepository = require("../repositories/counter.repository.js");

async function generateEmployeeCode() {
  const nextCode = await CounterRepository.incrementEmployeeCodeCounter();

  return `C${nextCode}`;
}

module.exports = {
  generateEmployeeCode,
};
