const Eris = require('eris');
var fs = require("fs");

var bot = new Eris.CommandClient("NDIxMjEzNzcwNTk4MTg3MDA4.DYu7Zg.ggwzmr_F6v7HU3urI-7G9JP8UWc", {restMode: true}, {
  prefix: ["-"],
  defaultHelpCommand: false
});

bot.on("ready", () => {
  console.log(`[READY] | Bot started up with ${bot.shards.size} shards and with ${bot.guilds.size} guilds.`);
});

// terms of service agreedment.
bot.on("messageReactionAdd", (message, emoji, userID) => {
  // accept channel.
  if (message.channel.id === '426671535009562635') {
    if (emoji.name === '✅') {
      // accepted role id
      bot.addGuildMemberRole(message.channel.guild.id, userID, '426177457524047902')
    }
  }
});

// help command
bot.registerCommand("help", (msg, args) => {
  bot.createMessage(msg.channel.id, {
    embed: {
      thumbnail: {
        url: 'https://i.imgur.com/u5Uf78I.png'
      },
      fields: [{
        name: ":page_facing_up: Nevit Services",
        value: "**-new:** creates a ticket.\n**-close:** close the current ticket.\n\n**Main Website:** https://nevit.io/\n**Payment Portal:** https://pay.nevit.io/",
        inline: true
      }],
      color: 0xffffff,
    }
  });
}, {
  caseInsensitive: "true",
  guildOnly: "true",
  cooldown: "3000"
});

// create new ticket command.
bot.registerCommand("new", (msg, args) => {
  fs.readFile('nevit.txt', (err, data) => {
    //if error.
    if (err) throw err;

    // ticket category
    bot.createChannel(msg.channel.guild.id, `ticket-${+data + 1}`, 0, 'Auto Ticket', '412344220737732618').then(m => {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: ":page_facing_up: Nevit Services",
          thumbnail: {
            url: 'https://i.imgur.com/u5Uf78I.png'
          },
          description: `**${msg.author.username}**, your ticket has been created. **Ticket:** ${m.mention}`,
          color: 0xffffff,
        }
      });
      bot.editChannelPermission(m.id, msg.channel.guild.id, 0, 1024, 'role');
      // support agent role id.
      bot.editChannelPermission(m.id, '42667518930937446', 1024, 0, 'role');
      bot.editChannelPermission(m.id, msg.author.id, 1024, 0, 'member');
      m.edit({topic: `${msg.author.id}`});
      bot.createMessage(m.id, {
        embed: {
          title: ":ticket: Ticket Information",
          thumbnail: {
            url: 'https://i.imgur.com/u5Uf78I.png'
          },
          description: `**Client:** ${msg.author.username}#${msg.author.discriminator}\nOne of our support agents will help you as soon as possible.`,
          color: 0xffffff,
        }
      });
    });
    // save new number.
    fs.writeFile("nevit.txt", `${+data + 1}`, function(err) {
      if(err) {
          return console.log(err);
      }
    });
  });
}, {
  caseInsensitive: "true",
  guildOnly: "true",
  cooldown: "3000"
});

// close ticket command.
bot.registerCommand("close", (msg, args) => {
  // ticket category
  if (msg.channel.parentID === '412344220737732618') {
    bot.getDMChannel(msg.channel.topic).then(message => {
      bot.createMessage(message.id, {
        embed: {
          title: ":page_facing_up: Nevit Services",
          thumbnail: {
            url: 'https://i.imgur.com/u5Uf78I.png'
          },
          description: `Your ticket was closed. Thank you for contacting Nevit Services.`,
          color: 0xffffff,
        }
      });
    });
    bot.deleteChannel(msg.channel.id);
  } else {
    bot.createMessage(msg.channel.id, {
      embed: {
        title: ":page_facing_up: Nevit Services",
        thumbnail: {
          url: 'https://i.imgur.com/u5Uf78I.png'
        },
        description: `**${msg.author.username}**, you can only close ticket channels.`,
        color: 0xffffff,
      }
    });
  }
}, {
  caseInsensitive: "true",
  guildOnly: "true",
  cooldown: "3000"
});

client.login.process.env.BOT_TOKEN);
