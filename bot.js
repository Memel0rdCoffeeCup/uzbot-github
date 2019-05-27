require('dotenv').config(); 
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const db = require("quick.db");
const client = new Discord.Client();

var levelUpGoal = 5000;

client.on("up", () => {
  console.log("tajikistan nigga fart");
  client.user.setActivity('-uz help for commands | Currently in ' + client.guilds.size + ' servers');
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.TOKEN);
