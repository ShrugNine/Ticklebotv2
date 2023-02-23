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
    userAccount = await TicklecoinSchema.findOneAndUpdate(filter, update, {
      upsert: true,
    });
  } catch (err) {
    console.error(err);
  }
};
