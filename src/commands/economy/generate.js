const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Generate TickleCoin™ and send to a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("The user to give to.")
        .setRequired(true);
    })
    .addIntegerOption((option) => {
      return option
        .setName("amount")
        .setDescription("The amount to generate.")
        .setRequired(true);
    }),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    const receiverId = interaction.options.getUser("user").id;

    const receiverAccount = await TickleCoinAccount.findOne({
      user_id: receiverId,
    });

    if (!receiverAccount) {
      await interaction.reply(
        `There was an issue querying the database. Please try again later.`
      );
      return;
    }

    if (interaction.user.id == receiverAccount.user_id) {
      await interaction.reply(`You cannot generate funds for yourself.`);
      return;
    }

    receiverAccount.current_balance = receiverAccount.current_balance + amount;
    await receiverAccount.save();

    await interaction.reply(
      `You successfully generated ${amount} TickleCoin™ for ${interaction.options.getUser(
        "user"
      )} `
    );
  },
};
