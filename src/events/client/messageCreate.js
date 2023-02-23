const payout = require('../../functions/helpers/helpPayout.js');

module.exports = {
  name: "messageCreate",
  async execute(message) {
    console.log("Message received!");
    await payout(message); //rewards posts with ticklecoin
  },
};
