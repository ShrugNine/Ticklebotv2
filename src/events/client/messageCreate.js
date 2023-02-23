const payout = require('../../functions/helpers/helpPayout.js');

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if(!message.author.bot)
    await payout(message); //rewards posts with ticklecoin
  },
};
