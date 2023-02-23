const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  AttachmentBuilder,
  Attachment,
} = require("discord.js");

const items = [
  {
    name: "Minor Hex of Tongues: Spanish",
    description:
      "The target will have their posts translated and replaced with Spanish for 5 minutes.",
    price: "1,000",
    image: "hex.png",
    rarity: "Common",
  },
  {
    name: "Minor Hex of Silence",
    description: "The target will be timed out for 5 minutes.",
    price: "5,000",
    image: "hex.png",
    rarity: "Uncommon",
  },
  {
    name: "Greater Hex of Tongues: French",
    description: "The target will have their posts translated and replaced with French for 30 minutes.",
    price: "10,000",
    image: "hex.png",
    rarity: "Rare",
  },
  {
    name: "Reflector Shield",
    description: "Redirects a hex back at the caster.",
    price: "10,000",
    image: "reflector.png",
    rarity: "Legendary",
  },
  {
    name: "The Zombie Hand",
    description: "It smells...",
    price: "100,000",
    image: "hand.png",
    rarity: "Mythic",
  },
];
const rarityColors = {
  Common: "a5a5a5",
  Uncommon: "36f307",
  Rare: "0795f3",
  Legendary: "c007f3",
  Mythic: "f34607",
};

const tickleshopChannelId = "1077033609858400347";
//const tickleshopChannelId = "1077114180378841149"; // bot testing channel

module.exports = (client) => {
  client.handleTickleshop = async () => {
    items.forEach((item) => {
      const itemImage = new AttachmentBuilder(`./src/assets/${item.image}`);
      const itemEmbed = new EmbedBuilder()
        .setColor(rarityColors[item.rarity])
        .setTitle(item.name)
        .setDescription(item.description)
        .setThumbnail(`attachment://${item.image}`)
        .setFooter({text: item.rarity});        

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("b-091")
          .setLabel(`$${item.price}`)
          .setStyle(ButtonStyle.Success)
      );
      client.channels.cache
        .get(tickleshopChannelId)
        .send({ embeds: [itemEmbed], files: [itemImage], components: [row] });
    });
  };
};
