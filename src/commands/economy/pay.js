const { SlashCommandBuilder } = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Send tickle coin from your wallet to another.")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("The user to send to.")
        .setRequired(true);
    })
    .addIntegerOption((option) => {
      return option
        .setName("amount")
        .setDescription("The amount to pay.")
        .setRequired(true);
    }),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');
    const payerId = interaction.user.id;
    const receiverId = interaction.options.getUser('user').id;

    if(payerId == receiverId){
      await interaction.reply("You can't pay yourself, but you **can** play yourself.");
      return;
    }

    const payerAccount = await TickleCoinAccount.findOne({
      user_id: payerId
    });

    const receiverAccount = await TickleCoinAccount.findOne({
      user_id: receiverId
    })

    if(!payerAccount || !receiverAccount){
      await interaction.reply(`There was an issue querying the database. Please try again later.`);
      return;
    }

    if(parseInt(amount) > parseInt(payerAccount.current_balance)){
      await interaction.reply(`Insufficient funds.`);
      return;
    }

    payerAccount.current_balance = payerAccount.current_balance - amount;
    receiverAccount.current_balance = receiverAccount.current_balance + amount;

    await payerAccount.save();
    await receiverAccount.save();

    await interaction.reply(`You successfully paid ${interaction.options.getUser('user')} ${amount} TickleCoin™.`);
  },
};