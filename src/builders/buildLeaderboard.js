const { EmbedBuilder } = require("discord.js");
const TicklecoinSchema = require("../models/ticklecoinSchema.js");
const leaderboardChannelId = "1077034169613434901";
const ticklebotId = "824424131406987316";

module.exports = async (client) => {
  console.log(`Leaderboard has begun build at: ${Date.now()}`);
  const channel = client.channels.cache.get(leaderboardChannelId);
  const filter = {}; // empty filter returns all records
  const users = await TicklecoinSchema.find(filter)
    .sort({ current_balance: -1 })
    .limit(10);


  if (users) {
    //console.log(`Found users: ${JSON.stringify(users)}`);
    //clear the leaderboard
    try {
      await channel.messages.fetch({ limit: 100 }).then((messages) => {
        channel.bulkDelete(messages);
      });

      //post latest
      const leaderboardChannelHeader = new EmbedBuilder()
        .setTitle("TickleCoin™ Standings")
        .setDescription("Refreshes at the top of every hour.");

      channel.send({ embeds: [leaderboardChannelHeader] });

      users.forEach(async (user) => {
        const u = await client.users.fetch(user.user_id);

        const embed = new EmbedBuilder()
          .setAuthor({
            name: user.display_name,
            avatarURL: u.displayAvatarURL(),
          })
          .setTitle(user.current_balance.toString())
          .setImage(u.displayAvatarURL());
        channel.send({ embeds: [embed] });
      });
    } catch (e) {
      console.error(e);
    }
  }
};
