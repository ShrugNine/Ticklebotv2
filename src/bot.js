require("dotenv").config();
const { BOT_TOKEN } = process.env;

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const nodeCron = require("node-cron");
const leaderboard = require('./builders/buildLeaderboard.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
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

const leaderboardJob = nodeCron.schedule("0 * * * *", leaderboard, {scheduled: false}) // run each hour, minute 0

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(BOT_TOKEN);
leaderboardJob.start(); //start cron job
