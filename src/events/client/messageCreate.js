const payout = require('../../functions/helpers/helpPayout.js');

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
      if (!message.author.bot) {
          await payout(message); //rewards posts with ticklecoin
      }

      // If DM to bot
      const msgContent = message.content;

      if (message.channel.type == 1) {
          console.log(msgContent);
          //special code for Tom to DM in RPG forum thread
          const Tom = '571445421822574602';
          const Dustin = '231234663933411328';

          const CuddleBunker = '279706152940470273';
          const RPG = '1166703283864342588'; // thread ID for RPG game

          if (message.author.id == Dustin || Tom) {
              // check if thread still exists
              client.channels.cache.get(RPG).send(msgContent)
          }
      }
  },
};
