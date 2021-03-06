const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const express = require('express');
const app = express();
 client.commands = new Discord.Collection();

const config = require("./config.json");
let cdseconds = 5;

function changing_status() {
    let status = ['Do > help for commands', `Servers: ${client.guilds.cache.size} Users: ${client.users.cache.size}`]
    let random = status[Math.floor(Math.random() * status.length)]
    client.user.setActivity(random)
}

client.on("ready", () => {
    console.log(`${client.user.username} is online`, `Servers: ${client.guilds.cache.size} Users: ${client.users.cache.size}`);
    setInterval(changing_status, 5000);
    client.user.setUsername("help bot");
});



client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
    }
  });




client.login(process.env.TOKEN);



app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT);
