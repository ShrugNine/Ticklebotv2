const mongoose = require("mongoose");
const leaderboard = require('../../builders/buildLeaderboard.js');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(process.env.MONGO_URI, {
      keepAlive: true,
    });
    //client.handleTickleshop();

    leaderboard(client);
    console.log(`Ready! ${client.user.tag} is logged in and online.`);
  },
};
