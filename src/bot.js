require("dotenv").config();
const { BOT_TOKEN } = process.env;

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
//client.color = "";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  if (!folder.startsWith("help")) {
    const functionFiles = fs
      .readdirSync(`./src/functions/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
      //console.log(`File: ${file}`);
      require(`./functions/${folder}/${file}`)(client); // pass client to file so its accessible within
    }
  }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(BOT_TOKEN);
