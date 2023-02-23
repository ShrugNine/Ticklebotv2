const { SlashCommandBuilder } = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wager")
    .setDescription("Create a Wager contract using TickleCoin™")
    .addStringOption((option) =>
      option
        .setName("terms")
        .setDescription(
          "Define in clear terms which conditions would make you the winner of this wager"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("creator_risk")
        .setDescription("What you will pay if you lose.")
        .setRequired(true))
    .addIntegerOption((option) =>
        option
        .setName("acceptor_risk")
        .setDescription(
            "What the challenger must risk to accept the wager."
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const userId = interaction.user.id;

    const account = await TickleCoinAccount.findOne({
      user_id: userId,
    });

    if (!account) {
      await interaction.reply({
        content:
          "There was an issue locating your account. Please try again later.",
        ephemeral: true,
      });
      return;
    }

    const wager_amount = interaction.options.getInteger("creator_risk");

    if (account.current_balance < wager_amount) {
      await interaction.reply({
        content: "You do not have the funds to make this wager.",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply(
      `This command does not quite work yet. TO DO: Code to commmit wager to DB. Handler to create visual wager emebed in channel.`
    );
  },
};
