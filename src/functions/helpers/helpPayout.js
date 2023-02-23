const TicklecoinSchema = require("../../models/ticklecoinSchema.js");

module.exports = async (message) => {
  if (!message) {
    return;
  }

  const attachments = message.attachments.size || 0;
  const hasHyperlink = message.content.includes("http");
  let total = 0;

  total = hasHyperlink ? 10 : 0;
  total += attachments > 0 ? attachments * 10 : 0;

  const payout = total || 1;

  const filter = { user_id: message.author.id };
  const update = { $inc: { current_balance: payout } };
  let userAccount;

  try {
    userAccount = await TicklecoinSchema.findOneAndUpdate(filter, update);

    if (!userAccount) {
      console.log(`Creating new user account for ${message.author.dispaly_name}...`);
      const newAccount = await TicklecoinSchema.create({
        user_id: message.user.id,
        dispaly_name: message.author.dispaly_name,
        server_id: message.guild.id,
        current_balance: 1000,
      });
      newAccount.save();
      message.author.send(
        "Welcome to the Cuddle Bunker! In this server, we use a fake-currency called TickleCoin™. This currency means nothing and can be used to place bets or buy items in the TickleShop to affect other members. You have been granted 1000 TickleCoin™ to get started. You earn a coin for every text-post, and +10 coins for every post with an attached meme. Please feel free to reach out to the moderators with any questions."
      );
    }
  } catch (err) {
    console.error(err);
  }
};
