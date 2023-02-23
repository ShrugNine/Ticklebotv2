const { SlashCommandBuilder } = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your current TickleCoin™ balance."),
  async execute(interaction, client) {
    const userId = interaction.user.id;

    const account = await TickleCoinAccount.findOne({
        user_id: userId
    })

    if(!account){
        await interaction.reply('There was an issue locating your account. Please try again later.');
        return;
    }

    await interaction.reply(`You currently have ${parseInt(account.current_balance)} TickleCoin™.`);
  },
};
