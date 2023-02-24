const leaderboard = require("../../builders/buildLeaderboard.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Force the leaderboard to update"),
  async execute(interaction, client) {
    await leaderboard(client);

    await interaction.reply({
      content: `Leaderboard updated!`,
      ephemeral: true,
    });
  },
};
