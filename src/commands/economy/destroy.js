const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bill")
    .setDescription("Remove a given amount of TickleCoin™ from a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("The user to bill.")
        .setRequired(true);
    })
    .addIntegerOption((option) => {
      return option
        .setName("amount")
        .setDescription("The amount to take.")
        .setRequired(true);
    }),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    const payorId = interaction.options.getUser("user").id;

    const payorAccount = await TickleCoinAccount.findOne({
      user_id: payorId,
    });

    if (!payorAccount) {
      await interaction.reply(
        `There was an issue querying the database. Please try again later.`
      );
      return;
    }

    // if (interaction.user.id == payorAccount.user_id) {
    //   await interaction.reply(`You cannot generate funds for yourself.`);
    //   return;
    // }

    payorAccount.current_balance = payorAccount.current_balance - amount;
    await payorAccount.save();

    await interaction.reply(
      `You successfully billed ${amount} TickleCoin™ from ${interaction.options.getUser(
        "user"
      )} `
    );
  },
};
