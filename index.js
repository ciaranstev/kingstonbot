const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");

const config = require("./config.json");
const mongo = require('./mongo')

const connectToMongoDB = async () => {
  await mongo().then(mongoose => {
    try {
      console.log('Connected to MongoDB.')
    } catch {

    } finally {
      mongoose.connection.close()
    }
  })
}

connectToMongoDB()

const client = new Client({
  disableEveryone: false,
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.on("ready", async () => {
  console.log(
    `Hello, ${client.user.username} is now online and ready to be used by ${client.users.cache.size} users in ${client.guilds.cache.size} servers. No errors or dumps were reported in the process.`
  );
  

  client.user.setPresence({
    activity: {
      name: `to Mradula.`,
      type: "LISTENING",
    },
  });
});

client.on("message", async (message) => {

  const prefix = `${config.prefix}`;

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length == 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});


client.login(config.token);
