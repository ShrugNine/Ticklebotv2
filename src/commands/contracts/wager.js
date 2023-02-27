const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ComponentBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const TickleCoinAccount = require("../../models/ticklecoinSchema.js");
const Wager = require("../../models/contractSchema.js");
const wagerChannelId = "1077034247661043732";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wager")
    .setDescription("Create a Wager contract using TickleCoin™")
    .addStringOption((option) =>
      option
        .setName("terms")
        .setDescription(
          "Define in clear terms which conditions would make you the winner of this wager"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("creator_risk")
        .setDescription("What you will pay if you lose.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("acceptor_risk")
        .setDescription("What the challenger must risk to accept the wager.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const userId = interaction.user.id;

    const account = await TickleCoinAccount.findOne({
      user_id: userId,
    });

    if (!account) {
      await interaction.reply({
        content:
          "There was an issue locating your account. Please try again later.",
        ephemeral: true,
      });
      return;
    }

    const wager_amount = interaction.options.getInteger("creator_risk");
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
    let createdDate = new Date();

    if (account.current_balance < wager_amount) {
      await interaction.reply({
        content: "You do not have the funds to make this wager.",
        ephemeral: true,
      });
      return;
    }

    //Create Wager in the database
    const wager = await Wager.create({
      creator_id: interaction.user.id,
      terms: interaction.options.getString("terms"),
      creator_risk: interaction.options.getInteger("creator_risk"),
      creator_amount_to_accept: interaction.options.getInteger(
        "acceptor_risk"
      ),
      expiration: expirationDate,
      created: createdDate,
    });

    wager.save(async (err, data) => {

      console.log(JSON.stringify(data));

      if (err){
        console.error(err);
        return;
      }

      //Create Wager embed
      const wagerEmbed = new EmbedBuilder()
        .setTitle("Wager")
        .setDescription(`${interaction.options.getString("terms")}`)
        .setColor('60FF78')
        .setAuthor({
          name: `${interaction.user.username}`,
        })
        .addFields({
          name: "Offer",
          value: `$${interaction.options.getInteger("creator_risk")}`,
          inline: true,
        })
        .setFooter({
          text: `Expires: ${data.expiration}`
        })

      const buttonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId(data.id)
        .setLabel(`Disagree for $${data.creator_amount_to_accept}`)
        .setStyle(ButtonStyle.Success)
      );

      client.channels.cache.get(wagerChannelId).send({ embeds: [wagerEmbed], components: [buttonRow] });

      await interaction.reply(
        `This command does not quite work yet. TO DO: Code to commmit wager to DB. Handler to create visual wager emebed in channel.`
      );
    }

    );

  },
};
