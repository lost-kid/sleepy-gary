const Discord = require('discord.js');
const { TOKEN, prefix } = require('./assets/config.json');
const yt = require('ytdl-core');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const funUrls = [ "https://www.youtube.com/watch?v=d1MWxSUO4ts&t=2081s", "https://www.youtube.com/watch?v=BhmRvUjJFh4", "https://www.youtube.com/watch?v=HNOEt2eWYLI", "https://www.youtube.com/watch?v=qyScKkRLeNs&t=22s", "https://www.youtube.com/watch?v=SuDnjx6bPa8", "https://www.youtube.com/watch?v=-50NdPawLVY", "https://www.youtube.com/watch?v=QOvZQH5Vl7k" ];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const channel = client.channels.get("660296444904865803");
  const server = msg.guild.id;
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (msg.content === '-stop') {
    channel.leave();
  }
  if (msg.content === "-funtime") {
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
      console.log("Successfully connected.");
      letsHaveFun(msg, connection)
    }).catch(e => {
      console.error(e);
    });
  }
});

function letsHaveFun(msg, connection) {
  const server = msg.guild.id;
  server.dispatcher = connection.playStream(
    yt(funUrls[Math.floor(Math.random() * funUrls.length)], { filter: 'audioonly' }).on('end', () => {
      if (funUrls[0]) {
        letsHaveFun(msg, connection);
      }
    }),
  );

};

client.login(TOKEN);