const { EmbedBuilder } = require("discord.js");
const TicklecoinSchema = require("../models/ticklecoinSchema.js");
const leaderboardChannelId = "1077034169613434901";
const ticklebotId = "824424131406987316";

module.exports = async (client) => {
  console.log(`Leaderboard has begun build at: ${new Date(Date.now())}`);
  const channel = client.channels.cache.get(leaderboardChannelId);
  const filter = {}; // empty filter returns all records
  const users = await TicklecoinSchema.find(filter)
    .sort({ current_balance: -1 })
    .limit(10);

  if (users) {
    //console.log(`Found users: ${JSON.stringify(users)}`);
    //clear the leaderboard
    try {
      await channel.messages.fetch({ limit: 10 }).then((messages) => {
        channel.bulkDelete(messages);
      });

      const embed = new EmbedBuilder()
        .setTitle("The TickleCoin Leaderboard™")
        .setImage(u.displayAvatarURL());

      users.forEach((user) => {
        embed.addFields([
          {
            name: user.display_name,
            value: user.current_balance,
          },
        ]);
      });

      channel.send({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  }
};
