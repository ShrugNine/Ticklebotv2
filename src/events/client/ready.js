const mongoose = require("mongoose");
const leaderboard = require('../../builders/buildLeaderboard.js');
const Cron = require("croner");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(process.env.MONGO_URI, {
      keepAlive: true,
    });
    //client.handleTickleshop();

    leaderboard(client);
    const leaderboardJob = Cron("0 * * * *", async () => { // run each hour, minute 0
      leaderboard(client)
    }); // run each hour, minute 0
    console.log(`Ready! ${client.user.tag} is logged in and online @ ${new Date(Date.now())}`);
  },
};
